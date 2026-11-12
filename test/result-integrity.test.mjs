import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { prepareDataset, verifyReceipt, verifyResult } from '../src/index.mjs';

const source=Buffer.from('Memo\nhello\n=cmd\n');
const schema={schema_version:1,fields:[{name:'memo',source:'Memo',type:'text',required:true}]};
const make=()=>prepareDataset(source,'csv',schema);
const fail=c=>e=>e?.code===c;

test('receipt verifies both source bytes and result record integrity',()=>{
  const r=make();
  assert.match(r.receipt.result_sha256,/^[a-f0-9]{64}$/);
  assert.equal(verifyReceipt(source,r.receipt).status,'SOURCE_BYTES_MATCH');
  assert.equal(verifyResult(r).status,'RESULT_BYTES_MATCH');
});
test('tampering normalized row fails closed while source receipt alone still matches',()=>{
  const r=make();
  r.records[0].data.memo='TAMPERED';
  assert.equal(verifyReceipt(source,r.receipt).status,'SOURCE_BYTES_MATCH');
  assert.throws(()=>verifyResult(r),fail('RESULT_TAMPERED'));
});
test('tampering review reason queue fails result verification',()=>{
  const r=make(); r.review_queue[0].code='OK';
  assert.throws(()=>verifyResult(r),fail('RESULT_TAMPERED'));
});
test('removing source records fails closed',()=>{
  const r=make();delete r.records;
  assert.throws(()=>verifyResult(r),fail('INVALID_RESULT'));
});
test('tampering embedded receipt causes receipt hash mismatch',()=>{
  const r=make();r.receipt.input_rows=999;
  assert.throws(()=>verifyResult(r),fail('RECEIPT_TAMPERED'));
});
test('CLI rejects mutated JSON result envelope even if source remains authentic',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'prep-result-integrity-'));
  const input=join(dir,'src.csv'), config=join(dir,'cfg.json'), output=join(dir,'out.json');
  await writeFile(input,source);await writeFile(config,JSON.stringify(schema));
  let cp=spawnSync(process.execPath,['bin/prep.mjs','run','--input',input,'--config',config,'--output',output],{encoding:'utf8'});
  assert.equal(cp.status,2); // synthetic second row contains a dangerous formula
  const v=JSON.parse(await readFile(output,'utf8'));v.records[0].data.memo='changed';
  await writeFile(output,JSON.stringify(v));
  cp=spawnSync(process.execPath,['bin/prep.mjs','verify','--source',input,'--receipt',output],{encoding:'utf8'});
  assert.equal(cp.status,1);
  assert.equal(JSON.parse(cp.stderr).code,'RESULT_TAMPERED');
});
