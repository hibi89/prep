import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { runLocal, verifyReceipt, verifyExport, makeExportReceipt, prepareDataset, PrepError } from '../src/index.mjs';

const schema = {schema_version:1,fields:[{name:'memo',source:'Memo',type:'text',required:true}]};
const start = async () => {
  const dir = await mkdtemp(join(tmpdir(),'prep-export-proof-'));
  const source = join(dir,'source.csv'), config = join(dir,'schema.json');
  await writeFile(source, 'Memo\nhello\n"<script>alert(1)</script>"\n');
  await writeFile(config, JSON.stringify(schema));
  return {dir,source,config};
};
const errorCode = c => e => e instanceof PrepError && e.code === c;
const cli = (...args) => spawnSync(process.execPath, ['bin/prep.mjs',...args], {cwd:process.cwd(),encoding:'utf8'});

test('CSV and sidecar are verified against both source and actual export bytes', async () => {
  const {dir,source,config} = await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'out.csv.receipt.json');
  const status = await runLocal({input:source,config,output,receiptOutput});
  assert.equal(status.status,'OK_FOR_OWNER_REVIEW');
  const proof = JSON.parse(await readFile(receiptOutput,'utf8'));
  assert.equal(proof.format_version,'PREP_EXPORT_V1');
  assert.equal(proof.format,'csv');
  assert.equal(proof.approval,'NOT_GRANTED');
  assert.equal(verifyReceipt(await readFile(source),proof.source_receipt).status,'SOURCE_BYTES_MATCH');
  assert.equal(verifyExport(await readFile(output),proof).status,'EXPORT_BYTES_MATCH');
  const cliResult = cli('verify','--source',source,'--receipt',receiptOutput,'--export',output);
  assert.equal(cliResult.status,0,cliResult.stderr);
  assert.equal(JSON.parse(cliResult.stdout).status,'SOURCE_AND_EXPORT_MATCH');
});

test('HTML sidecar verifies bounded static report, not a signature',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'report.html'), receiptOutput=join(dir,'proof.json');
  await runLocal({input:source,config,output,receiptOutput});
  const p=JSON.parse(await readFile(receiptOutput,'utf8'));
  assert.equal(p.format,'html');
  assert.match(await readFile(output,'utf8'),/&lt;script&gt;/);
  assert.equal(verifyExport(await readFile(output),p).status,'EXPORT_BYTES_MATCH');
});

test('changing the CSV causes an export mismatch',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'sidecar.json');
  await runLocal({input:source,config,output,receiptOutput});
  const p=JSON.parse(await readFile(receiptOutput,'utf8'));
  await assert.rejects(async()=>verifyExport(Buffer.from('tampered'),p),errorCode('EXPORT_BYTES_MISMATCH'));
});

test('changing a receipt field causes fail-closed checksum mismatch',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'sidecar.json');
  await runLocal({input:source,config,output,receiptOutput});
  const p=JSON.parse(await readFile(receiptOutput,'utf8'));
  p.export_sha256='a'.repeat(64);
  assert.throws(()=>verifyExport(awaitableBytes(),p),errorCode('EXPORT_RECEIPT_TAMPERED'));
  function awaitableBytes(){return Buffer.from('contents');}
});

test('changing source causes source receipt mismatch despite intact export',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'sidecar.json');
  await runLocal({input:source,config,output,receiptOutput});
  const p=JSON.parse(await readFile(receiptOutput,'utf8'));
  assert.throws(()=>verifyReceipt(Buffer.from('not original'),p.source_receipt),errorCode('SOURCE_BYTES_MISMATCH'));
});

test('existing receipt file prevents exporting and preserves both files',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'sidecar.json');
  await writeFile(receiptOutput,'PRESERVE');
  await assert.rejects(()=>runLocal({input:source,config,output,receiptOutput}),errorCode('OUTPUT_EXISTS'));
  assert.equal(await readFile(receiptOutput,'utf8'),'PRESERVE');
  assert.ok(!(await readdir(dir)).includes('out.csv'));
  assert.equal((await readdir(dir)).filter(n=>n.startsWith('.prep-staging-')).length,0);
});

test('existing export file prevents receipt creation and source unchanged',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'sidecar.json');
  const original=await readFile(source);
  await writeFile(output,'PRESERVE');
  await assert.rejects(()=>runLocal({input:source,config,output,receiptOutput}),errorCode('OUTPUT_EXISTS'));
  assert.equal(await readFile(output,'utf8'),'PRESERVE');
  assert.ok(!(await readdir(dir)).includes('sidecar.json'));
  assert.deepEqual(await readFile(source),original);
});

test('receipt output cannot collide with input, mapping config or export',async()=>{
  const {dir,source,config}=await start();
  for(const receiptOutput of [source, config, join(dir,'out.csv')]){
    await assert.rejects(()=>runLocal({input:source,config,output:join(dir,'out.csv'),receiptOutput}),errorCode('INVALID_PATH'));
  }
});

test('verify CLI requires export to check sidecar and rejects export with legacy receipt',async()=>{
  const {dir,source,config}=await start();
  const output=join(dir,'out.csv'), receiptOutput=join(dir,'sidecar.json');
  await runLocal({input:source,config,output,receiptOutput});
  const missing=cli('verify','--source',source,'--receipt',receiptOutput);
  assert.equal(missing.status,1);
  assert.equal(JSON.parse(missing.stderr).code,'MISSING_EXPORT');
  const jsonPath=join(dir,'full.json');
  await runLocal({input:source,config,output:jsonPath});
  const bad=cli('verify','--source',source,'--receipt',jsonPath,'--export',output);
  assert.equal(bad.status,1);
  assert.equal(JSON.parse(bad.stderr).code,'INVALID_EXPORT_RECEIPT');
  assert.equal(cli('verify','--source',source,'--receipt',jsonPath).status,0);
});

test('no sidecar is created without explicit receipt output, legacy CSV behavior retained',async()=>{
  const {dir,source,config}=await start();
  await runLocal({input:source,config,output:join(dir,'out.csv')});
  assert.deepEqual((await readdir(dir)).filter(n=>n.startsWith('out.')),['out.csv']);
});

test('unknown sidecar format cannot be used to assert integrity',async()=>{
  const proof=makeExportReceipt(prepareDataset(Buffer.from('Memo\nhey\n'),'csv',schema),'test csv','csv');
  const bad={...proof,format:'xlsx'};
  assert.throws(()=>verifyExport(Buffer.from('test csv'),bad),errorCode('INVALID_EXPORT_RECEIPT'));
});
