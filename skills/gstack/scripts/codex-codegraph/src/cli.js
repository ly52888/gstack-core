import { initProject, indexProject } from './indexer.js';
import { openProjectGraph } from './query.js';
import { startMcpStdio } from './mcp.js';

function usage() {
  return [
    'Usage: codex-codegraph <command> [args]',
    '',
    'Commands:',
    '  init [path]',
    '  index [path]',
    '  status [path]',
    '  search <query> [path]',
    '  node <symbol> [path]',
    '  files [path]',
    '  callers <symbol> [path]',
    '  callees <symbol> [path]',
    '  impact <symbol> [path]',
    '  affected <file...>',
    '  explore <query> [path]',
    '  serve --mcp --project <path>'
  ].join('\n');
}

function pathFromArgs(args, fallback = process.cwd()) {
  const projectFlag = args.indexOf('--project');
  if (projectFlag !== -1 && args[projectFlag + 1]) return args[projectFlag + 1];
  return args.find((arg) => !arg.startsWith('--')) ?? fallback;
}

export async function runCli(args = []) {
  const [command, firstArg, secondArg] = args;

  if (!command || command === 'help' || command === '--help') {
    console.log(usage());
    return;
  }

  if (command === 'serve') {
    if (!args.includes('--mcp')) throw new Error('Only serve --mcp is supported.');
    startMcpStdio({ projectPath: pathFromArgs(args, process.cwd()) });
    return;
  }

  if (command === 'init') {
    const projectPath = firstArg ?? process.cwd();
    const result = await initProject(projectPath);
    console.log(`initialized ${result.dbPath}`);
    return;
  }

  if (command === 'index') {
    const projectPath = firstArg ?? process.cwd();
    const result = await indexProject(projectPath, { force: true });
    console.log(`indexed ${result.files} files, ${result.symbols} symbols, ${result.edges} edges`);
    return;
  }

  if (command === 'status') {
    const graph = openProjectGraph(firstArg ?? process.cwd());
    const status = graph.status();
    console.log(`files: ${status.files}`);
    console.log(`symbols: ${status.symbols}`);
    console.log(`edges: ${status.edges}`);
    console.log(`indexed_at: ${status.indexedAt}`);
    return;
  }

  if (command === 'files') {
    const graph = openProjectGraph(firstArg ?? process.cwd());
    console.log(graph.formatFiles(graph.files()));
    return;
  }

  if (command === 'affected') {
    const projectFlag = args.indexOf('--project');
    const projectPath = projectFlag !== -1 && args[projectFlag + 1] ? args[projectFlag + 1] : process.cwd();
    const files = args.slice(1).filter((arg, index) => {
      const absoluteIndex = index + 1;
      return arg !== '--project' && absoluteIndex !== projectFlag + 1;
    });
    if (files.length === 0) throw new Error(usage());
    const graph = openProjectGraph(projectPath);
    console.log(graph.formatRows(graph.affected(files)));
    return;
  }

  if (['search', 'node', 'callers', 'callees', 'impact', 'explore'].includes(command)) {
    if (!firstArg) throw new Error(usage());
    const graph = openProjectGraph(secondArg ?? process.cwd());
    if (command === 'search') console.log(graph.formatRows(graph.search(firstArg)));
    if (command === 'node') {
      const item = graph.node(firstArg);
      if (!item) console.log('No results.');
      else console.log(`${item.kind} ${item.name} ${item.file_path}:${item.start_line}\n${item.source}`);
    }
    if (command === 'callers') console.log(graph.formatRows(graph.callers(firstArg)));
    if (command === 'callees') console.log(graph.formatRows(graph.callees(firstArg)));
    if (command === 'impact') console.log(graph.formatRows(graph.impact(firstArg)));
    if (command === 'explore') {
      for (const item of graph.explore(firstArg)) {
        console.log(`${item.kind} ${item.name} ${item.file_path}:${item.start_line}`);
        console.log(item.source);
        console.log('');
      }
    }
    return;
  }

  throw new Error(usage());
}
