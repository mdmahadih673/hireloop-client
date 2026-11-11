import fs from 'node:fs';
import { parseFig, nodeId } from './fig-inspector/node_modules/openfig-core/dist/index.js';
const d=parseFig(new Uint8Array(fs.readFileSync('public/hireloop.fig')));
const root=d.nodes.find(n=>n.name==='Manage Job Posts');
const targets=['Manage Job Posts','Main','Container','Top Breadcrumb & Page Headings','Text','Table','Header','Row','Body','Data','Overlay','Button','Aside'];
function go(n,path=[]){ if(targets.includes(n.name)){ const keys=Object.keys(n); const vals={}; for(const k of ['name','type','size','transform','opacity','cornerRadius','fillPaints','strokePaints','textData','textStyle','layoutMode','itemSpacing','paddingLeft','paddingRight','paddingTop','paddingBottom','clipsContent']) if(n[k]!==undefined) vals[k]=n[k]; console.log(path.concat(n.name).join(' > '),JSON.stringify(vals).slice(0,1600)); } for(const c of d.childrenMap.get(nodeId(n))||[])go(c,path.concat(n.name)); }
go(root);
