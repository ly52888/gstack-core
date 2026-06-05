import fs from 'node:fs';
import path from 'node:path';
import { initSchema, execSql, querySql, sqlNumber, sqlString } from './sqlite.js';
import { languageForFile, parseFile } from './parser.js';

const SKIP_DIRS = new Set([
  '.git', '.codex-codegraph', 'node_modules', 'vendor', 'dist', 'build',
  '.next', '.venv', 'venv', 'target', 'coverage', '__pycache__'
]);

function walkFiles(root, dir = root, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkFiles(root, path.join(dir, entry.name), output);
      continue;
    }
    if (!entry.isFile()) continue;
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(root, fullPath);
    if (languageForFile(relativePath)) output.push({ fullPath, relativePath });
  }
  return output;
}

export async function initProject(projectPath = process.cwd()) {
  initSchema(projectPath);
  return { dbPath: path.join(projectPath, '.codex-codegraph', 'graph.sqlite') };
}

export async function indexProject(projectPath = process.cwd(), options = {}) {
  initSchema(projectPath);
  if (options.force) {
    execSql(projectPath, 'DELETE FROM edges; DELETE FROM symbols; DELETE FROM files;');
  }

  const files = walkFiles(projectPath);
  const pendingEdges = [];
  let symbolCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file.fullPath, 'utf8');
    const stat = fs.statSync(file.fullPath);
    const parsed = parseFile(file.relativePath, content);
    if (!parsed.language) continue;

    execSql(projectPath, `
INSERT INTO files(path, language, size, mtime_ms, content)
VALUES (${sqlString(file.relativePath)}, ${sqlString(parsed.language)}, ${sqlNumber(stat.size)}, ${sqlNumber(Math.floor(stat.mtimeMs))}, ${sqlString(content)})
ON CONFLICT(path) DO UPDATE SET
  language=excluded.language,
  size=excluded.size,
  mtime_ms=excluded.mtime_ms,
  content=excluded.content;
DELETE FROM edges WHERE source_symbol_id IN (SELECT id FROM symbols WHERE file_id=(SELECT id FROM files WHERE path=${sqlString(file.relativePath)}));
DELETE FROM symbols WHERE file_id=(SELECT id FROM files WHERE path=${sqlString(file.relativePath)});
`);

    const [{ id: fileId }] = querySql(projectPath, `SELECT id FROM files WHERE path=${sqlString(file.relativePath)}`);

    for (const symbol of parsed.symbols) {
      execSql(projectPath, `
INSERT INTO symbols(file_id, name, kind, qualified_name, language, start_line, end_line, source)
VALUES (${sqlNumber(fileId)}, ${sqlString(symbol.name)}, ${sqlString(symbol.kind)}, ${sqlString(symbol.qualifiedName)}, ${sqlString(symbol.language)}, ${sqlNumber(symbol.startLine)}, ${sqlNumber(symbol.endLine)}, ${sqlString(symbol.source)});
`);
      symbolCount += 1;
    }

    for (const edge of parsed.callNames) {
      pendingEdges.push(edge);
    }
  }

  const symbols = querySql(projectPath, 'SELECT id, name FROM symbols ORDER BY id');
  const byName = new Map();
  for (const symbol of symbols) {
    if (!byName.has(symbol.name)) byName.set(symbol.name, []);
    byName.get(symbol.name).push(symbol);
  }

  let edgeCount = 0;
  const uniqueEdges = new Set();
  for (const edge of pendingEdges) {
    const sources = byName.get(edge.sourceName) ?? [];
    const targets = byName.get(edge.targetName) ?? [];
    if (sources.length === 0 || targets.length === 0) continue;
    for (const source of sources) {
      const target = targets[0];
      const key = `${source.id}:${target.id}:calls`;
      if (uniqueEdges.has(key)) continue;
      uniqueEdges.add(key);
      execSql(projectPath, `
INSERT INTO edges(source_symbol_id, target_symbol_id, kind, source_name, target_name)
VALUES (${sqlNumber(source.id)}, ${sqlNumber(target.id)}, 'calls', ${sqlString(source.name)}, ${sqlString(target.name)});
`);
      edgeCount += 1;
    }
  }

  execSql(projectPath, `
INSERT INTO metadata(key, value) VALUES ('indexed_at', ${sqlString(new Date().toISOString())})
ON CONFLICT(key) DO UPDATE SET value=excluded.value;
`);

  return { files: files.length, symbols: symbolCount, edges: edgeCount };
}
