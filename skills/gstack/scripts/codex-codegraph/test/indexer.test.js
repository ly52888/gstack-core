import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { indexProject } from '../src/indexer.js';
import { openProjectGraph } from '../src/query.js';

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ccg-index-'));
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'src', 'auth.ts'),
    [
      "import { saveSession } from './session';",
      '',
      'export function loginUser(name: string) {',
      '  const token = buildToken(name);',
      '  saveSession(token);',
      '  return token;',
      '}',
      '',
      'function buildToken(name: string) {',
      "  return `token:${name}`;",
      '}',
      ''
    ].join('\n')
  );
  fs.writeFileSync(
    path.join(root, 'src', 'session.py'),
    [
      'def saveSession(token):',
      '    write_record(token)',
      '',
      'def write_record(token):',
      '    return token',
      ''
    ].join('\n')
  );
  return root;
}

test('indexes JS/TS and Python symbols into a local graph', async () => {
  const root = makeFixture();

  await indexProject(root, { force: true });
  const graph = openProjectGraph(root);

  const results = graph.search('loginUser');
  assert.equal(results.length, 1);
  assert.equal(results[0].name, 'loginUser');
  assert.equal(results[0].kind, 'function');
  assert.equal(results[0].file_path, 'src/auth.ts');

  const pyResults = graph.search('saveSession');
  assert.equal(pyResults.length, 1);
  assert.equal(pyResults[0].language, 'python');
});

test('resolves simple caller and callee relationships', async () => {
  const root = makeFixture();

  await indexProject(root, { force: true });
  const graph = openProjectGraph(root);

  const callees = graph.callees('loginUser').map((item) => item.name);
  assert.deepEqual(callees.sort(), ['buildToken', 'saveSession']);

  const callers = graph.callers('saveSession').map((item) => item.name);
  assert.deepEqual(callers, ['loginUser']);

  const impact = graph.impact('write_record', { depth: 2 }).map((item) => item.name);
  assert.deepEqual(impact.sort(), ['loginUser', 'saveSession']);
});

test('returns indexed files, full symbol source, and affected symbols for changed files', async () => {
  const root = makeFixture();

  await indexProject(root, { force: true });
  const graph = openProjectGraph(root);

  assert.deepEqual(graph.files().map((file) => file.path).sort(), ['src/auth.ts', 'src/session.py']);

  const node = graph.node('loginUser');
  assert.equal(node.name, 'loginUser');
  assert.match(node.source, /saveSession\(token\)/);

  const affected = graph.affected(['src/session.py'], { depth: 2 }).map((item) => item.name);
  assert.deepEqual(affected.sort(), ['loginUser', 'saveSession']);
});
