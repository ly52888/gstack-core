import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const bin = new URL('../bin/codex-codegraph.js', import.meta.url).pathname;

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ccg-cli-'));
  fs.writeFileSync(
    path.join(root, 'app.js'),
    [
      'function handler(req) {',
      '  return service(req);',
      '}',
      '',
      'function service(req) {',
      '  return req.id;',
      '}',
      ''
    ].join('\n')
  );
  return root;
}

function run(args, cwd) {
  return execFileSync('node', [bin, ...args], {
    cwd,
    encoding: 'utf8'
  });
}

test('CLI indexes a project and prints search/call graph results', () => {
  const root = makeFixture();

  assert.match(run(['init'], root), /initialized/i);
  assert.match(run(['index'], root), /indexed 1 files/i);
  assert.match(run(['status'], root), /symbols:\s+2/i);
  assert.match(run(['search', 'handler'], root), /function handler app.js:1/);
  assert.match(run(['node', 'handler'], root), /function handler\(req\)/);
  assert.match(run(['files'], root), /app.js\s+javascript/);
  assert.match(run(['callees', 'handler'], root), /service app.js:5/);
  assert.match(run(['callers', 'service'], root), /handler app.js:1/);
  assert.match(run(['affected', 'app.js', 'missing.js'], root), /handler app.js:1/);
});
