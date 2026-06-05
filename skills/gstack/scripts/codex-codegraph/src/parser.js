import path from 'node:path';

const JS_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx']);
const PY_EXTENSIONS = new Set(['.py']);
const CALL_EXCLUDES = new Set([
  'if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'class',
  'typeof', 'new', 'super', 'import', 'require', 'console', 'print'
]);

export function languageForFile(filePath) {
  const ext = path.extname(filePath);
  if (JS_EXTENSIONS.has(ext)) return ext.includes('ts') ? 'typescript' : 'javascript';
  if (PY_EXTENSIONS.has(ext)) return 'python';
  return null;
}

export function parseFile(relativePath, content) {
  const language = languageForFile(relativePath);
  if (!language) return { language: null, symbols: [], callNames: [] };

  const lines = content.split(/\r?\n/);
  const symbols = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const jsFunction = line.match(/^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/);
    const jsClass = line.match(/^\s*(?:export\s+)?class\s+([A-Za-z_$][\w$]*)\b/);
    const jsArrow = line.match(/^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/);
    const pyDef = line.match(/^\s*def\s+([A-Za-z_]\w*)\s*\(/);
    const pyClass = line.match(/^\s*class\s+([A-Za-z_]\w*)\b/);

    const match = jsFunction || jsClass || jsArrow || pyDef || pyClass;
    if (!match) continue;

    const kind = (jsClass || pyClass) ? 'class' : 'function';
    symbols.push({
      name: match[1],
      kind,
      qualifiedName: match[1],
      language,
      startLine: index + 1,
      endLine: lines.length,
      source: ''
    });
  }

  for (let index = 0; index < symbols.length; index += 1) {
    const next = symbols[index + 1];
    symbols[index].endLine = next ? next.startLine - 1 : lines.length;
    symbols[index].source = lines.slice(symbols[index].startLine - 1, symbols[index].endLine).join('\n');
  }

  const callNames = [];
  for (const symbol of symbols) {
    const seen = new Set();
    for (let lineIndex = symbol.startLine - 1; lineIndex < symbol.endLine; lineIndex += 1) {
      const line = lines[lineIndex] ?? '';
      for (const match of line.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)) {
        const name = match[1];
        if (name === symbol.name || CALL_EXCLUDES.has(name)) continue;
        if (seen.has(name)) continue;
        seen.add(name);
        callNames.push({ sourceName: symbol.name, targetName: name });
      }
    }
  }

  return { language, symbols, callNames };
}
