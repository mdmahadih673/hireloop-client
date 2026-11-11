import fs from 'node:fs';
import { parseFig, nodeId } from './fig-inspector/node_modules/openfig-core/dist/index.js';
const doc = parseFig(new Uint8Array(fs.readFileSync('public/hireloop.fig')));
console.log('HEADER', doc.header, 'NODES', doc.nodes.length);
for (const node of doc.nodes) {
  const name = node.name || '';
  const children = doc.childrenMap.get(nodeId(node)) || [];
  if (/job|recruit|dashboard|manage/i.test(name)) console.log(node.type, JSON.stringify(name), node.size, 'children=', children.length, nodeId(node));
}

