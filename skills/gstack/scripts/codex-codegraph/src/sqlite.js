import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const GRAPH_DIR = '.codex-codegraph';

export function graphDir(projectPath) {
  return path.join(projectPath, GRAPH_DIR);
}

export function dbPath(projectPath) {
  return path.join(graphDir(projectPath), 'graph.sqlite');
}

export function ensureGraphDir(projectPath) {
  fs.mkdirSync(graphDir(projectPath), { recursive: true });
}

export function sqlString(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replaceAll("'", "''")}'`;
}

export function sqlNumber(value) {
  return Number.isFinite(value) ? String(value) : 'NULL';
}

export function execSql(projectPath, sql) {
  ensureGraphDir(projectPath);
  const result = spawnSync('sqlite3', [dbPath(projectPath)], {
    input: sql,
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || 'sqlite3 failed').trim());
  }
}

export function querySql(projectPath, sql) {
  ensureGraphDir(projectPath);
  const result = spawnSync('sqlite3', ['-json', dbPath(projectPath), sql], {
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || 'sqlite3 query failed').trim());
  }
  const output = result.stdout.trim();
  return output ? JSON.parse(output) : [];
}

export function initSchema(projectPath) {
  execSql(projectPath, `
PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS files (
  id INTEGER PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL,
  size INTEGER NOT NULL,
  mtime_ms INTEGER NOT NULL,
  content TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS symbols (
  id INTEGER PRIMARY KEY,
  file_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  qualified_name TEXT NOT NULL,
  language TEXT NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  source TEXT NOT NULL,
  FOREIGN KEY(file_id) REFERENCES files(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS edges (
  id INTEGER PRIMARY KEY,
  source_symbol_id INTEGER NOT NULL,
  target_symbol_id INTEGER NOT NULL,
  kind TEXT NOT NULL,
  source_name TEXT NOT NULL,
  target_name TEXT NOT NULL,
  FOREIGN KEY(source_symbol_id) REFERENCES symbols(id) ON DELETE CASCADE,
  FOREIGN KEY(target_symbol_id) REFERENCES symbols(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_symbols_name ON symbols(name);
CREATE INDEX IF NOT EXISTS idx_edges_source ON edges(source_symbol_id);
CREATE INDEX IF NOT EXISTS idx_edges_target ON edges(target_symbol_id);
`);
}
