import { openProjectGraph } from './query.js';

function text(content) {
  return { content: [{ type: 'text', text: content }] };
}

function formatExplore(items) {
  if (items.length === 0) return 'No results.';
  return items.map((item) => {
    const callees = item.callees.map((row) => row.name).join(', ') || 'none';
    const callers = item.callers.map((row) => row.name).join(', ') || 'none';
    return [
      `${item.kind} ${item.name} ${item.file_path}:${item.start_line}`,
      `callers: ${callers}`,
      `callees: ${callees}`,
      '```',
      item.source,
      '```'
    ].join('\n');
  }).join('\n\n');
}

function formatNode(item) {
  if (!item) return 'No results.';
  return [
    `${item.kind} ${item.name} ${item.file_path}:${item.start_line}`,
    '```',
    item.source,
    '```'
  ].join('\n');
}

export function createMcpServer({ projectPath = process.cwd() } = {}) {
  const graph = openProjectGraph(projectPath);

  const tools = [
    {
      name: 'codegraph_search',
      description: 'Search indexed code symbols by name.',
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string' }, limit: { type: 'number' } },
        required: ['query']
      }
    },
    {
      name: 'codegraph_explore',
      description: 'Return matching symbols with source, callers, and callees.',
      inputSchema: {
        type: 'object',
        properties: { query: { type: 'string' } },
        required: ['query']
      }
    },
    {
      name: 'codegraph_node',
      description: 'Return one symbol with its full indexed source.',
      inputSchema: {
        type: 'object',
        properties: { symbol: { type: 'string' } },
        required: ['symbol']
      }
    },
    {
      name: 'codegraph_callers',
      description: 'Find symbols that call the given symbol.',
      inputSchema: {
        type: 'object',
        properties: { symbol: { type: 'string' }, limit: { type: 'number' } },
        required: ['symbol']
      }
    },
    {
      name: 'codegraph_callees',
      description: 'Find symbols called by the given symbol.',
      inputSchema: {
        type: 'object',
        properties: { symbol: { type: 'string' }, limit: { type: 'number' } },
        required: ['symbol']
      }
    },
    {
      name: 'codegraph_impact',
      description: 'Find reverse-call impact radius for a symbol.',
      inputSchema: {
        type: 'object',
        properties: { symbol: { type: 'string' }, depth: { type: 'number' } },
        required: ['symbol']
      }
    },
    {
      name: 'codegraph_files',
      description: 'List indexed source files.',
      inputSchema: {
        type: 'object',
        properties: { limit: { type: 'number' } }
      }
    },
    {
      name: 'codegraph_affected',
      description: 'Given changed files, return symbols likely affected through reverse call edges.',
      inputSchema: {
        type: 'object',
        properties: {
          files: { type: 'array', items: { type: 'string' } },
          depth: { type: 'number' }
        },
        required: ['files']
      }
    },
    {
      name: 'codegraph_status',
      description: 'Show local code graph index health.',
      inputSchema: { type: 'object', properties: {} }
    }
  ];

  return {
    async handle(message) {
      if (message.method === 'initialize') {
        return {
          jsonrpc: '2.0',
          id: message.id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'codex-codegraph', version: '0.1.0' },
            instructions: [
              'Use codegraph_explore first for architecture and flow questions when the project has an index.',
              'Use codegraph_search to locate symbols, codegraph_node for full source, callers/callees for call flow, and impact/affected before edits.',
              'If results are empty or stale, run the CLI index command in the project before falling back to broad file scans.'
            ].join('\n')
          }
        };
      }
      if (message.method === 'tools/list') {
        return { jsonrpc: '2.0', id: message.id, result: { tools } };
      }
      if (message.method === 'tools/call') {
        const args = message.params?.arguments ?? {};
        let result;
        switch (message.params?.name) {
          case 'codegraph_search':
            result = text(graph.formatRows(graph.search(args.query, { limit: args.limit ?? 20 })));
            break;
          case 'codegraph_explore':
            result = text(formatExplore(graph.explore(args.query)));
            break;
          case 'codegraph_node':
            result = text(formatNode(graph.node(args.symbol)));
            break;
          case 'codegraph_callers':
            result = text(graph.formatRows(graph.callers(args.symbol, { limit: args.limit ?? 50 })));
            break;
          case 'codegraph_callees':
            result = text(graph.formatRows(graph.callees(args.symbol, { limit: args.limit ?? 50 })));
            break;
          case 'codegraph_impact':
            result = text(graph.formatRows(graph.impact(args.symbol, { depth: args.depth ?? 2 })));
            break;
          case 'codegraph_files':
            result = text(graph.formatFiles(graph.files({ limit: args.limit ?? 200 })));
            break;
          case 'codegraph_affected':
            result = text(graph.formatRows(graph.affected(args.files ?? [], { depth: args.depth ?? 2 })));
            break;
          case 'codegraph_status': {
            const status = graph.status();
            result = text(`files: ${status.files}\nsymbols: ${status.symbols}\nedges: ${status.edges}\nindexed_at: ${status.indexedAt}`);
            break;
          }
          default:
            return { jsonrpc: '2.0', id: message.id, error: { code: -32602, message: 'Unknown tool' } };
        }
        return { jsonrpc: '2.0', id: message.id, result };
      }
      if (message.id === undefined) return null;
      return { jsonrpc: '2.0', id: message.id, error: { code: -32601, message: 'Method not found' } };
    }
  };
}

export function startMcpStdio(options = {}) {
  const server = createMcpServer(options);
  let buffer = Buffer.alloc(0);

  process.stdin.on('data', async (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    while (true) {
      const headerEnd = buffer.indexOf('\r\n\r\n');
      if (headerEnd === -1) return;
      const header = buffer.slice(0, headerEnd).toString('utf8');
      const match = header.match(/Content-Length:\s*(\d+)/i);
      if (!match) {
        buffer = Buffer.alloc(0);
        return;
      }
      const length = Number(match[1]);
      const bodyStart = headerEnd + 4;
      if (buffer.length < bodyStart + length) return;
      const body = buffer.slice(bodyStart, bodyStart + length).toString('utf8');
      buffer = buffer.slice(bodyStart + length);
      const response = await server.handle(JSON.parse(body));
      if (!response) continue;
      const payload = Buffer.from(JSON.stringify(response), 'utf8');
      process.stdout.write(`Content-Length: ${payload.length}\r\n\r\n`);
      process.stdout.write(payload);
    }
  });
}
