import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCSV, prepareDataset, renderCSV, validateConfig } from '../src/index.mjs';

const schema={schema_version:1,fields:[{name:'name',source:'Name',type:'text',required:true}]};
const run=s=>prepareDataset(Buffer.from(s),'csv',schema);
test('reject Unicode invisible format characters in CSV headers',()=>{
  assert.throws(()=>parseCSV('Name\u034F,Other\nx,y\n'),e=>e?.code==='INVALID_HEADER');
});
test('reject Unicode default ignorable chars in config source names',()=>{
  assert.throws(()=>validateConfig({schema_version:1,fields:[{name:'bad\u2066',source:'Name',type:'text'}]}),e=>e?.code==='INVALID_SCHEMA_FIELD');
});
test('flag formula with bidirectional Unicode control before marker',()=>{
  const r=run('Name\n"\u2066=2+2"\n');
  assert.equal(r.status,'REVIEW_REQUIRED');
  assert.ok(r.review_queue.some(x=>x.code==='FORMULA_RISK'));
  assert.ok(r.review_queue.some(x=>x.code==='CONTROL_CHARACTER'));
  assert.match(renderCSV(r,schema),/"'\u2066=2\+2"/);
});
test('flag formula risk in unmapped columns with raw record evidence',()=>{
  const r=run('Name,Extra\nalice,\u2066=HYPERLINK\n');
  assert.equal(r.status,'REVIEW_REQUIRED');
  assert.ok(r.review_queue.some(x=>x.code==='UNMAPPED_FORMULA_RISK' && x.field==='Extra'));
  assert.equal(r.records.length,1);
});
test('ordinary negative decimal text stays intact without apostrophe',()=>{
  const r=run('Name\n-123.45\n');
  assert.equal(r.status,'OK_FOR_OWNER_REVIEW');
  assert.match(renderCSV(r,schema),/"-123\.45"/);
  assert.doesNotMatch(renderCSV(r,schema),/"'-123\.45"/);
});
test('leading @ hidden behind Unicode markers is formula-protected in CSV',()=>{
  const r=run('Name\n"\u200d@SUM(1)"\n');
  assert.ok(r.review_queue.some(x=>x.code==='FORMULA_RISK'));
  assert.match(renderCSV(r,schema),/"'\u200d@SUM\(1\)"/);
});
