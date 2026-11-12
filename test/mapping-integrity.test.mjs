import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareDataset, parseCSV, parseJSON, validateConfig, verifyResult} from '../src/index.mjs';
const b = s => Buffer.from(s,'utf8');
const schema = { schema_version:1, fields:[
  {name:'main',source:'Name',type:'text',required:true},
  {name:'secondary',source:'name',type:'text',required:true}
]};
test('ambiguous mapping suggestions keep explicit data but force dataset REVIEW_REQUIRED',()=>{
  const r=prepareDataset(b('Name,name\nAlice,Bob\n'),'csv',schema);
  assert.equal(r.status,'REVIEW_REQUIRED');
  assert.equal(r.receipt.review_rows,0); // global mapping hold is not falsely counted as a row defect
  assert.equal(r.records[0].status,'OK_FOR_OWNER_REVIEW');
  assert.equal(r.records[0].data.main,'Alice');
  assert.equal(r.records[0].data.secondary,'Bob');
  assert.deepEqual(r.review_queue.filter(x=>x.code==='AMBIGUOUS_MAPPING').map(x=>x.field),['main','secondary']);
  assert.ok(r.mapping_suggestions.every(x=>x.status==='REVIEW_REQUIRED'));
  assert.equal(verifyResult(r).status,'RESULT_BYTES_MATCH');
});
test('mapping conflict also holds JSON documents without auto-rewriting keys',()=>{
  const r=prepareDataset(b('[{"Name":"a","name":"b"}]'),'json',schema);
  assert.equal(r.status,'REVIEW_REQUIRED');
  assert.equal(r.records[0].data.main,'a');
  assert.equal(r.records[0].data.secondary,'b');
});
test('unambiguous mapping continues READY with no false global issue',()=>{
  const r=prepareDataset(b('Name,Cost\nAlice,123\n'),'csv',{
    schema_version:1,fields:[
      {name:'main',source:'Name',type:'text'},
      {name:'cost',source:'Cost',type:'integer'}
    ]
  });
  assert.equal(r.status,'OK_FOR_OWNER_REVIEW');
  assert.deepEqual(r.review_queue,[]);
});
test('header-only CSV is rejected instead of falsely marked READY',()=>{
  assert.throws(()=>prepareDataset(b('Name,name\n'),'csv',schema),e=>e?.code==='EMPTY_SOURCE_ROWS');
});
test('schema field unrecognized keys are rejected, never silently ignored',()=>{
  assert.throws(()=>validateConfig({schema_version:1,fields:[{name:'x',source:'Name',type:'text',convert_with:'external'}]}),e=>e?.code==='INVALID_SCHEMA_FIELD');
});
test('JSON parser rejects wrong JS input type deterministically',()=>{
  assert.throws(()=>parseJSON(null),e=>e?.code==='INVALID_JSON');
});
test('quoted CRLF and bare CR both increment CSV provenance line once',()=>{
  const parsed=parseCSV('Memo\r\n"first\r\nsecond"\r\n"third\rfourth"\r\nend\r\n');
  assert.deepEqual(parsed.records.map(r=>r.line),[2,4,6]);
  assert.equal(parsed.records[0].values.Memo,'first\r\nsecond');
});
test('direct SDK parser entrypoints reject oversized inputs without bypassing byte gate',()=>{
  const huge='X'.repeat(2*1024*1024+1);
  assert.throws(()=>parseCSV(huge),e=>e?.code==='INPUT_LIMIT');
  assert.throws(()=>parseJSON(huge),e=>e?.code==='INPUT_LIMIT');
});
