/** PREP-ONLY synthetic goldens. No private upstream SMAX source or fixture included.
 * Hashes deliberately freeze the complete normalized envelope and exported outputs.
 * Updating expected hashes requires a reviewed contract change, not casual regeneration.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {prepareDataset, renderCSV, renderHTML, verifyResult} from '../src/index.mjs';
const digest=v=>createHash('sha256').update(v).digest('hex');
const schema={schema_version:1,fields:[
  {name:'day',source:'Day',type:'date',required:true},
  {name:'amount',source:'Amount',type:'decimal',required:true},
  {name:'active',source:'Active',type:'boolean',required:true},
  {name:'memo',source:'Memo',type:'text',required:false}
]};
const fixtures=[
  {id:'clean-csv',format:'csv',schema,source:'Day,Amount,Active,Memo\n2024/02/29,001.2500,YES,e\u0301\n',
    expectedStatus:'OK_FOR_OWNER_REVIEW',expectedRows:1},
  {id:'review-csv',format:'csv',schema,source:'Day,Amount,Active,Memo,Other\n2024/02/30,1.23,yes,=1+1,x\n2024/02/30,1.23,yes,=1+1,x\n',
    expectedStatus:'REVIEW_REQUIRED',expectedRows:2},
  {id:'clean-json',format:'json',schema,source:'[{"Day":"2024-02-29","Amount":"1.2500","Active":true,"Memo":"é"}]',
    expectedStatus:'OK_FOR_OWNER_REVIEW',expectedRows:1},
  {id:'ambiguous-mapping',format:'csv',schema:{schema_version:1,fields:[
    {name:'first',source:'Name',type:'text'}, {name:'second',source:'name',type:'text'}]},
    source:'Name,name\nAlice,Bob\n',expectedStatus:'REVIEW_REQUIRED',expectedRows:1}
];
const EXPECTED={
  // Contract hashes: populated from independently executed candidate and frozen.
  'clean-csv':{result:'b5855e3beada6af1017c5ea4bdade96b8365a01ed6ab96a84ad5de62b33933e4',csv:'26982da41bb46498d3e7aacfb2034c42a470c43408cf9629c0749b691b23c1da',html:'eb6dac4b70f9835c9569d0f754e93a3be161b1c759d99fd1f6c59b522a856188'},
  'review-csv':{result:'51f5e23321a11613b72b7762a72ae8136207707a7ea1424d1792560af9d72659',csv:'1d3d9de4fda087ab542391adfbd69ec36251befb88a717aa7c8d8127c1d49fca',html:'7bc9ede7100c87ee5d3366f9909126f6dc22a5fff74628c390bae8f4a4cb04e4'},
  'clean-json':{result:'6e9a4745128c2b6f5ce95df7870aa4fc602661ba4774e7f3883f8b2053934999',csv:'26982da41bb46498d3e7aacfb2034c42a470c43408cf9629c0749b691b23c1da',html:'295c5ca8dfe145cb69c32d93d46d8448e29b9d9b982b3224d17d530437a970f8'},
  'ambiguous-mapping':{result:'0337934360232c2518a11c89d6a2181f6fffd646c0179736d20a102ac0c0a8b5',csv:'8ba78ea46be548e2dade62861c3c18743dd7c0d22ab9e04f2b7b2edc7c2b6684',html:'823fddc5e89f4427825c1124ccc7f4d3995b809d4cf383f10884bdbf81592abc'}
};
for(const f of fixtures){
  test('independent PREP golden '+f.id+' — normalized envelope, CSV, static HTML',()=>{
    const r=prepareDataset(Buffer.from(f.source,'utf8'),f.format,f.schema);
    assert.equal(r.status,f.expectedStatus);
    assert.equal(r.records.length,f.expectedRows);
    assert.equal(verifyResult(r).status,'RESULT_BYTES_MATCH');
    assert.equal(digest(JSON.stringify(r)),EXPECTED[f.id].result);
    assert.equal(digest(renderCSV(r,f.schema)),EXPECTED[f.id].csv);
    assert.equal(digest(renderHTML(r,f.schema)),EXPECTED[f.id].html);
  });
}
