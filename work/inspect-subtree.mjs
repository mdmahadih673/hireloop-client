import fs from 'node:fs';
import { parseFig, nodeId } from './fig-inspector/node_modules/openfig-core/dist/index.js';
const doc = parseFig(new Uint8Array(fs.readFileSync('public/hireloop.fig')));
function walk(n, depth=0) {
 console.log(' '.repeat(depth*2)+n.type+' '+JSON.stringify(n.name||'')+(n.textData?.characters?' => '+JSON.stringify(n.textData.characters):'')+(n.size?' ['+Math.round(n.size.x)+'x'+Math.round(n.size.y)+']':''));
 for(const c of (doc.childrenMap.get(nodeId(n))||[])) walk(c,depth+1);
}
for(const n of doc.nodes) if(n.name==='Manage Job Posts') walk(n);
