import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareDataset, renderCSV, renderHTML, verifyResult } from '../src/index.mjs';
const schema={schema_version:1,fields:[{name:'first',source:'Name',type:'text'},{name:'second',source:'name',type:'text'}]};
const run=()=>prepareDataset(Buffer.from('Name,name\nAlice,Bob\n'),'csv',schema);
test('global mapping conflict does not turn into successful-looking exported CSV row',()=>{
 const result=run();
 assert.equal(result.status,'REVIEW_REQUIRED');
 assert.equal(result.receipt.review_rows,0);
 assert.equal(result.records[0].status,'OK_FOR_OWNER_REVIEW');
 const rows=renderCSV(result,schema);
 assert.match(rows, /"REVIEW_REQUIRED","AMBIGUOUS_MAPPING"/);
 assert.doesNotMatch(rows, /"OK_FOR_OWNER_REVIEW",""/);
 assert.equal(verifyResult(result).status,'RESULT_BYTES_MATCH');
});
test('global mapping conflict is conspicuous in static HTML preview',()=>{
 const html=renderHTML(run(),schema);
 assert.match(html,/DATASET REVIEW REQUIRED/);
 assert.match(html,/Mapping candidates are ambiguous/);
 assert.match(html,/Review rows/);
 assert.doesNotMatch(html,/<script\b/);
});
test('ordinary ready export is unchanged with no spurious mapping warning',()=>{
 const sc={schema_version:1,fields:[{name:'name',source:'Name',type:'text'}]};
 const r=prepareDataset(Buffer.from('Name\nAlice\n'),'csv',sc);
 assert.equal(r.status,'OK_FOR_OWNER_REVIEW');
 assert.doesNotMatch(renderCSV(r,sc),/AMBIGUOUS_MAPPING/);
 assert.doesNotMatch(renderHTML(r,sc),/DATASET REVIEW REQUIRED/);
});
