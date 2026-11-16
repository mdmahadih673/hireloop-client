import fs from 'node:fs';
import { parseFig, nodeId } from './fig-inspector/node_modules/openfig-core/dist/index.js';
const d=parseFig(new Uint8Array(fs.readFileSync('public/hireloop.fig')));
const root=d.nodes.find(n=>n.name==='Manage Job Posts');
const targets=['Manage Job Posts','Main','Container','Top Breadcrumb & Page Headings','Text','Table','Header','Row','Body','Data','Overlay','Button','Aside'];
function go(n,path=[]){ targets.includes(n.name) && (() => { const keys=['name','type','size','transform','opacity','cornerRadius','fillPaints','strokePaints','textData','textStyle','layoutMode','itemSpacing','paddingLeft','paddingRight','paddingTop','paddingBottom','clipsContent']; const vals=Object.fromEntries(keys.filter((key)=>n[key]!==undefined).map((key)=>[key,n[key]])); console.log(path.concat(n.name).join(' > '),JSON.stringify(vals).slice(0,1600)); })(); for(const c of d.childrenMap.get(nodeId(n))||[])go(c,path.concat(n.name)); }
go(root);
