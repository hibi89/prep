import test from 'node:test';
import assert from 'node:assert/strict';
import { LIMITS, parseCSV, parseJSON, prepareDataset, renderHTML } from '../src/index.mjs';
const err=c=>e=>e?.code===c;
const oneField={schema_version:1,fields:[{name:'id',source:'Id',type:'text',required:true}]};
test('20,000 distinct source rows preserved at exact row limit',()=>{
  const csv='Id\n'+Array.from({length:LIMITS.rows},(_,i)=>'record'+i).join('\n')+'\n';
  const r=prepareDataset(Buffer.from(csv),'csv',oneField);
  assert.equal(r.receipt.input_rows,LIMITS.rows);
  assert.equal(r.receipt.output_rows,LIMITS.rows);
  assert.equal(r.receipt.review_rows,0);
  assert.equal(r.status,'OK_FOR_OWNER_REVIEW');
  assert.equal(r.records.at(-1).data.id,'record19999');
  const html=renderHTML(r,oneField);
  assert.ok(!html.includes('record19999'));
  assert.ok(html.includes('record199'));
});
test('20,001 rows rejected rather than truncated',()=>{
  const csv='Id\n'+'x\n'.repeat(LIMITS.rows+1);
  assert.throws(()=>prepareDataset(Buffer.from(csv),'csv',oneField),err('ROW_LIMIT'));
});
test('all 64 explicitly mapped columns supported without implicit remapping',()=>{
  const cols=Array.from({length:LIMITS.columns},(_,i)=>'C'+i);
  const config={schema_version:1,fields:cols.map((source,i)=>({name:'f'+i,source,type:'text'}))};
  const r=prepareDataset(Buffer.from(cols.join(',')+'\n'+cols.join(',')+'\n'),'csv',config);
  assert.equal(r.status,'OK_FOR_OWNER_REVIEW');
  assert.equal(Object.keys(r.records[0].data).length,LIMITS.columns);
});
test('65 raw columns rejected before mapping or normalization',()=>{
  const cols=Array.from({length:LIMITS.columns+1},(_,i)=>'C'+i);
  assert.throws(()=>parseCSV(cols.join(',')+'\n'+cols.join(',')+'\n'),err('COLUMN_LIMIT'));
});
test('exact 2MiB UTF-8 CSV direct parser accepted, over-limit denied',()=>{
  const s='V\n'+'a'.repeat(LIMITS.inputBytes-3)+'\n';
  assert.equal(Buffer.byteLength(s),LIMITS.inputBytes);
  assert.equal(parseCSV(s).records.length,1);
  assert.throws(()=>parseCSV(s+'x'),err('INPUT_LIMIT'));
  assert.throws(()=>parseJSON('['+' '.repeat(LIMITS.inputBytes)+']'),err('INPUT_LIMIT'));
});
