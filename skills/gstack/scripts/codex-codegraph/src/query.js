import { initSchema, querySql, sqlNumber, sqlString } from './sqlite.js';

function formatLocation(row) {
  return `${row.file_path}:${row.start_line}`;
}

function symbolSelect() {
  return `
SELECT symbols.id, symbols.name, symbols.kind, symbols.qualified_name, symbols.language,
       symbols.start_line, symbols.end_line, symbols.source, files.path AS file_path
FROM symbols
JOIN files ON files.id = symbols.file_id`;
}

export function openProjectGraph(projectPath = process.cwd()) {
  initSchema(projectPath);

  function findSymbol(symbol) {
    const rows = querySql(projectPath, `${symbolSelect()} WHERE symbols.name=${sqlString(symbol)} OR symbols.qualified_name=${sqlString(symbol)} ORDER BY symbols.id LIMIT 1`);
    return rows[0] ?? null;
  }

  return {
    search(query, options = {}) {
      const limit = options.limit ?? 20;
      return querySql(projectPath, `${symbolSelect()} WHERE symbols.name LIKE ${sqlString(`%${query}%`)} OR symbols.qualified_name LIKE ${sqlString(`%${query}%`)} ORDER BY symbols.name LIMIT ${sqlNumber(limit)}`);
    },

    node(symbol) {
      return findSymbol(symbol);
    },

    files(options = {}) {
      const limit = options.limit ?? 200;
      return querySql(projectPath, `
SELECT path, language, size, mtime_ms
FROM files
ORDER BY path
LIMIT ${sqlNumber(limit)}`);
    },

    callers(symbol, options = {}) {
      const target = findSymbol(symbol);
      if (!target) return [];
      const limit = options.limit ?? 50;
      return querySql(projectPath, `
${symbolSelect()}
JOIN edges ON edges.source_symbol_id = symbols.id
WHERE edges.target_symbol_id=${sqlNumber(target.id)}
ORDER BY symbols.name
LIMIT ${sqlNumber(limit)}`);
    },

    callees(symbol, options = {}) {
      const source = findSymbol(symbol);
      if (!source) return [];
      const limit = options.limit ?? 50;
      return querySql(projectPath, `
${symbolSelect()}
JOIN edges ON edges.target_symbol_id = symbols.id
WHERE edges.source_symbol_id=${sqlNumber(source.id)}
ORDER BY symbols.name
LIMIT ${sqlNumber(limit)}`);
    },

    impact(symbol, options = {}) {
      const start = findSymbol(symbol);
      if (!start) return [];
      const depth = options.depth ?? 2;
      const seen = new Map();
      let frontier = [start.id];
      for (let level = 1; level <= depth; level += 1) {
        if (frontier.length === 0) break;
        const callers = querySql(projectPath, `
${symbolSelect()}
JOIN edges ON edges.source_symbol_id = symbols.id
WHERE edges.target_symbol_id IN (${frontier.map(sqlNumber).join(',')})`);
        frontier = [];
        for (const row of callers) {
          if (row.id === start.id || seen.has(row.id)) continue;
          seen.set(row.id, row);
          frontier.push(row.id);
        }
      }
      return [...seen.values()];
    },

    affected(filePaths, options = {}) {
      const depth = options.depth ?? 2;
      const normalized = filePaths.map((filePath) => filePath.replaceAll('\\', '/'));
      if (normalized.length === 0) return [];

      const changedSymbols = querySql(projectPath, `
${symbolSelect()}
WHERE files.path IN (${normalized.map(sqlString).join(',')})`);

      const seen = new Map();
      let frontier = changedSymbols.map((row) => row.id);
      for (let level = 1; level <= depth; level += 1) {
        if (frontier.length === 0) break;
        const callers = querySql(projectPath, `
${symbolSelect()}
JOIN edges ON edges.source_symbol_id = symbols.id
WHERE edges.target_symbol_id IN (${frontier.map(sqlNumber).join(',')})
ORDER BY files.path, symbols.start_line`);
        frontier = [];
        for (const row of callers) {
          if (seen.has(row.id)) continue;
          seen.set(row.id, row);
          frontier.push(row.id);
        }
      }
      return [...seen.values()];
    },

    explore(query) {
      const matches = this.search(query, { limit: 5 });
      return matches.map((row) => ({
        ...row,
        callees: this.callees(row.name, { limit: 10 }),
        callers: this.callers(row.name, { limit: 10 })
      }));
    },

    status() {
      const files = querySql(projectPath, 'SELECT COUNT(*) AS count FROM files')[0]?.count ?? 0;
      const symbols = querySql(projectPath, 'SELECT COUNT(*) AS count FROM symbols')[0]?.count ?? 0;
      const edges = querySql(projectPath, 'SELECT COUNT(*) AS count FROM edges')[0]?.count ?? 0;
      const indexedAt = querySql(projectPath, "SELECT value FROM metadata WHERE key='indexed_at'")[0]?.value ?? 'never';
      return { files, symbols, edges, indexedAt };
    },

    formatRows(rows) {
      if (rows.length === 0) return 'No results.';
      return rows.map((row) => `${row.kind ?? 'symbol'} ${row.name} ${formatLocation(row)}`).join('\n');
    },

    formatFiles(rows) {
      if (rows.length === 0) return 'No indexed files.';
      return rows.map((row) => `${row.path} ${row.language} ${row.size} bytes`).join('\n');
    }
  };
}
