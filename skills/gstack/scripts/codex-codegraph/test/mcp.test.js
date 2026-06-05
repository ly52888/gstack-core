import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { indexProject } from '../src/indexer.js';
import { createMcpServer } from '../src/mcp.js';

test('MCP server exposes code graph tools', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ccg-mcp-'));
  fs.writeFileSync(
    path.join(root, 'main.ts'),
    [
      'export function start() {',
      '  return loadConfig();',
      '}',
      '',
      'function loadConfig() {',
      "  return 'ok';",
      '}',
      ''
    ].join('\n')
  );
  await indexProject(root, { force: true });

  const server = createMcpServer({ projectPath: root });
  const list = await server.handle({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  });
  assert.ok(list.result.tools.some((tool) => tool.name === 'codegraph_search'));
  assert.match(list.result.tools.map((tool) => tool.name).join('\n'), /codegraph_node/);

  const init = await server.handle({
    jsonrpc: '2.0',
    id: 10,
    method: 'initialize',
    params: {}
  });
  assert.match(init.result.instructions, /Use codegraph_explore/);

  const search = await server.handle({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'codegraph_callees',
      arguments: { symbol: 'start' }
    }
  });
  assert.match(search.result.content[0].text, /loadConfig/);

  const files = await server.handle({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'codegraph_files',
      arguments: {}
    }
  });
  assert.match(files.result.content[0].text, /main.ts/);
});
