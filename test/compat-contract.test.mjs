// Frozen PREP-contract tests derived from a READ-ONLY comparison with SMAX source.
// Not a claim of executable SMAX golden parity or a migration of its private code.
import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareDataset } from '../src/index.mjs';

const cfg = (type) => ({schema_version:1,fields:[{name:'value',source:'Raw',type,required:true}]});
const prep = (input,type) => prepareDataset(Buffer.from('Raw\n'+input+'\n'),'csv',cfg(type));
const hasIssue = r => r.status==='REVIEW_REQUIRED' && r.review_queue.some(x=>x.code==='INVALID_TYPE');

test('PREP date contract accepts fixed-width ISO and slash format',()=>{
  assert.equal(prep('2026/11/12','date').records[0].data.value,'2026-11-12');
});
test('PREP date contract refuses compact YYYYMMDD (SMAX has an alternate parser)',()=>{
  assert.ok(hasIssue(prep('20261112','date')));
});
test('PREP decimal contract refuses commas (SMAX allows grouped decimals)',()=>{
  assert.ok(hasIssue(prep('\"1,234.50\"','decimal')));
});
test('PREP exact decimal policy removes redundant fractional zeros (SMAX retains formatting)',()=>{
  assert.equal(prep('12.5000','decimal').records[0].data.value,'12.5');
});
test('PREP boolean vocabulary accepts yes (SMAX generic only accepts true/false/1/0)',()=>{
  assert.equal(prep('yes','boolean').records[0].data.value,true);
});
test('PREP integer contract enforces signed 64-bit bounds (SMAX can retain larger integer strings)',()=>{
  assert.ok(hasIssue(prep('9223372036854775808','integer')));
});
