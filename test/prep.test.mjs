import test from 'node:test';
import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { mkdtemp, readFile, writeFile, symlink, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseCSV, parseJSON, prepareDataset, verifyReceipt, validateConfig, suggestMappings, renderCSV, runLocal, readLocalFile, saveNewFile, PrepError, LIMITS } from '../src/index.mjs';
const cfg = { schema_version: 1, fields: [
  {name:'day',source:'Day',type:'date',required:true},
  {name:'price',source:'Price',type:'decimal',required:true},
  {name:'flag',source:'Flag',type:'boolean'},
  {name:'memo',source:'Memo',type:'text'} ] };
const bytes = s => Buffer.from(s, 'utf8');
const csv = (row='2026/02/29,002.500,yes,safe') => `Day,Price,Flag,Memo\n${row}\n`;
const error = code => e => e instanceof PrepError && e.code === code;

// Parser format, boundaries and malformed input.
test('csv escaped quotes, embedded commas and multiline data', () => { const p = parseCSV('A,B\n"a,b","hello""world"\n"x\ny",z\n'); assert.equal(p.records[0].values.A, 'a,b'); assert.equal(p.records[0].values.B, 'hello"world'); assert.equal(p.records[1].values.A, 'x\ny'); assert.equal(p.records[1].line,3); });
test('csv BOM supported',()=>assert.deepEqual(parseCSV('\uFEFFA,B\n1,2').columns,['A','B']));
test('csv malformed unclosed quote rejected',()=>assert.throws(()=>parseCSV('A\n"x'),error('MALFORMED_CSV')));
test('csv stray quote rejected',()=>assert.throws(()=>parseCSV('A\nx"y'),error('MALFORMED_CSV')));
test('csv inconsistent width rejected',()=>assert.throws(()=>parseCSV('A,B\n1'),error('ROW_WIDTH_MISMATCH')));
test('csv duplicate headers rejected',()=>assert.throws(()=>parseCSV('A,A\n1,2'),error('DUPLICATE_HEADER')));
test('csv hidden-control headers rejected',()=>assert.throws(()=>parseCSV('A,\u200BB\n1,2'),error('INVALID_HEADER')));
test('csv blank rejected',()=>assert.throws(()=>parseCSV(''),error('EMPTY_SOURCE')));
test('csv column limit rejected',()=>assert.throws(()=>parseCSV(Array.from({length:65},(_,i)=>`c${i}`).join(',')),error('COLUMN_LIMIT')));
test('csv rows limit rejected',()=>assert.throws(()=>parseCSV('A\n'+'v\n'.repeat(LIMITS.rows+1)),error('ROW_LIMIT')));
test('json array objects accepted',()=>{let p=parseJSON('[{"a":"1"},{"b":2}]'); assert.deepEqual(p.columns,['a','b']); assert.equal(p.records[1].values.b,'2');});
test('json malformed rejected',()=>assert.throws(()=>parseJSON('['),error('MALFORMED_JSON')));
test('json object root rejected',()=>assert.throws(()=>parseJSON('{"a":1}'),error('INVALID_JSON_ROOT')));
test('json nested cell rejected',()=>assert.throws(()=>parseJSON('[{"a":{"b":1}}]'),error('INVALID_CELL_TYPE')));
test('json duplicate headers across records de-duplicated',()=>assert.equal(parseJSON('[{"a":1},{"a":2}]').columns.length,1));
test('unsafe JSON decimal number requires quoted exact text',()=>assert.throws(()=>parseJSON('[{"a":1.5}]'),error('UNSAFE_JSON_NUMBER')));
test('json hidden header rejected',()=>assert.throws(()=>parseJSON('[{"a\\u200b":1}]'),error('INVALID_HEADER')));

test('schema rejects implicit source mapping',()=>assert.throws(()=>validateConfig({schema_version:1,fields:[{name:'x',type:'text'}]}),error('INVALID_SCHEMA_FIELD')));
test('schema rejects duplicate source',()=>assert.throws(()=>validateConfig({schema_version:1,fields:[{name:'x',source:'a',type:'text'},{name:'y',source:'a',type:'text'}]}),error('DUPLICATE_MAPPING')));
test('schema rejects unknown flags',()=>assert.throws(()=>validateConfig({...cfg,network:true}),error('UNSUPPORTED_CONFIG_OPTION')));
test('mapping suggestions are never applied',()=>{let s=suggestMappings(['Day','DAY','Price','Flag','Memo'],cfg); assert.deepEqual(s[0].candidates,['Day','DAY']); assert.equal(s[0].status,'REVIEW_REQUIRED');});
test('mapped source missing fails closed',()=>assert.throws(()=>prepareDataset(bytes('day,Price,Flag,Memo\n2026-02-28,3,yes,hi'), 'csv',cfg),error('MISSING_MAPPED_COLUMN')));

test('normalizes leap date, decimal, boolean, NFC text',()=>{const r=prepareDataset(bytes(csv('2024/02/29,0001.2300,yes,e\u0301')),'csv',cfg);assert.equal(r.status,'OK_FOR_OWNER_REVIEW');assert.deepEqual({...r.records[0].data},{day:'2024-02-29',price:'1.23',flag:true,memo:'é'});});
test('rejects impossible calendar date into review',()=>{const r=prepareDataset(bytes(csv()),'csv',cfg);assert.equal(r.status,'REVIEW_REQUIRED');assert.equal(r.review_queue[0].code,'INVALID_TYPE');assert.equal(r.records.length,1);});
test('missing required is retained, not lost',()=>{const r=prepareDataset(bytes(csv('2024-02-29,,yes,text')),'csv',cfg);assert.equal(r.receipt.input_rows,r.receipt.output_rows);assert.equal(r.review_queue[0].code,'MISSING_REQUIRED');});
test('formula flagged, not executed',()=>{const r=prepareDataset(bytes(csv('2024-02-29,1,no,=SUM(A1)')),'csv',cfg);assert.equal(r.review_queue[0].code,'FORMULA_RISK');});
test('identical records duplicate review',()=>{const r=prepareDataset(bytes(csv('2024-02-29,1,no,safe')+'2024-02-29,1,no,safe\n'),'csv',cfg);assert.equal(r.receipt.review_rows,1);assert.equal(r.review_queue.at(-1).code,'DUPLICATE_RECORD');});
test('unmapped extra column review retains rows',()=>{const r=prepareDataset(bytes('Day,Price,Flag,Memo,Other\n2024-02-29,1,no,safe,x\n'),'csv',cfg);assert.equal(r.review_queue[0].code,'UNMAPPED_FIELD');assert.equal(r.records.length,1);});
test('distinct unmapped raw cells never create a false duplicate',()=>{const raw='Day,Price,Flag,Memo,Other\n2024-02-29,1,no,safe,x\n2024-02-29,1,no,safe,y\n';const r=prepareDataset(bytes(raw),'csv',cfg);assert.equal(r.records.length,2);assert.equal(r.review_queue.filter(x=>x.code==='DUPLICATE_RECORD').length,0);assert.equal(r.receipt.review_rows,2);});
test('duplicate raw row still triggers even when unmapped cells exist',()=>{const raw='Day,Price,Flag,Memo,Other\n2024-02-29,1,no,safe,x\n2024-02-29,1,no,safe,x\n';const r=prepareDataset(bytes(raw),'csv',cfg);assert.equal(r.review_queue.filter(x=>x.code==='DUPLICATE_RECORD').length,1);});
test('integer 64-bit exact without float roundoff',()=>{const c={schema_version:1,fields:[{name:'n',source:'N',type:'integer'}]};const r=prepareDataset(bytes('N\n9223372036854775807'),'csv',c);assert.equal(r.records[0].data.n,'9223372036854775807');});
test('integer overflow reviewed',()=>{const c={schema_version:1,fields:[{name:'n',source:'N',type:'integer'}]};const r=prepareDataset(bytes('N\n9223372036854775808'),'csv',c);assert.equal(r.records[0].status,'REVIEW_REQUIRED');});
test('excess decimal precision reviewed',()=>{const r=prepareDataset(bytes(csv('2024-02-29,1.1234567890,no,ok')),'csv',cfg);assert.equal(r.review_queue[0].code,'INVALID_TYPE');});
test('UTF-8 invalid bytes rejected',()=>assert.throws(()=>prepareDataset(Buffer.from([0xc3,0x28]),'csv',cfg),error('INVALID_UTF8')));
test('over 2 MiB refused',()=>assert.throws(()=>prepareDataset(Buffer.alloc(LIMITS.inputBytes+1),'csv',cfg),error('INPUT_LIMIT')));
test('unsupported format refused',()=>assert.throws(()=>prepareDataset(bytes(csv()),'xml',cfg),error('UNSUPPORTED_FORMAT')));
test('receipt verifies source bytes',()=>{const b=bytes(csv('2024-02-29,1,no,safe'));const r=prepareDataset(b,'csv',cfg);assert.equal(verifyReceipt(b,r.receipt).status,'SOURCE_BYTES_MATCH');});
test('receipt tamper detected',()=>{const b=bytes(csv('2024-02-29,1,no,safe'));const r=prepareDataset(b,'csv',cfg);r.receipt.input_rows=99;assert.throws(()=>verifyReceipt(b,r.receipt),error('RECEIPT_TAMPERED'));});
test('hidden control in data raises review',()=>{const r=prepareDataset(bytes(csv('2024-02-29,1,no,abc\u200B')),'csv',cfg);assert.equal(r.review_queue[0].code,'CONTROL_CHARACTER');});
test('source tamper detected',()=>{const b=bytes(csv('2024-02-29,1,no,safe'));const r=prepareDataset(b,'csv',cfg);assert.throws(()=>verifyReceipt(bytes(csv('2024-02-28,1,no,safe')),r.receipt),error('SOURCE_BYTES_MISMATCH'));});
test('deterministic result for same bytes and config',()=>{const b=bytes(csv('2024-02-29,1,no,safe'));assert.deepEqual(prepareDataset(b,'csv',cfg),prepareDataset(b,'csv',cfg));});
test('CSV export escapes formulas and retains review columns',()=>{const r=prepareDataset(bytes(csv('2024-02-29,1,no,=2+2')),'csv',cfg);const out=renderCSV(r,cfg);assert.ok(out.includes("'=") && out.includes('__source_record') && out.includes('FORMULA_RISK'));});

// Native local filesystem + CLI end-to-end checks.
const sandbox = await mkdtemp(join(tmpdir(),'prep-test-'));
const input = join(sandbox,'source.csv'), jsonInput = join(sandbox,'source.json'), config = join(sandbox,'schema.json');
await writeFile(input,csv('2024-02-29,1,no,=oops'));
await writeFile(jsonInput,'[{"Day":"2024-02-29","Price":"1.00","Flag":"no","Memo":"ok"}]');
await writeFile(config,JSON.stringify(cfg));
test('readLocalFile exact source immutability',async()=>{const before=await readFile(input);assert.deepEqual(await readLocalFile(input),before);assert.deepEqual(await readFile(input),before);});
test('readLocalFile no symlinks',async()=>{const path=join(sandbox,'linked.csv');await symlink(input,path);await assert.rejects(()=>readLocalFile(path),error('UNSAFE_SOURCE_TYPE'));});
test('readLocalFile no directories',async()=>await assert.rejects(()=>readLocalFile(sandbox),error('UNSAFE_SOURCE_TYPE')));
test('readLocalFile no missing path',async()=>await assert.rejects(()=>readLocalFile(join(sandbox,'missing')),error('UNAVAILABLE')));
test('readLocalFile size limit',async()=>{const p=join(sandbox,'huge.csv');await writeFile(p,Buffer.alloc(LIMITS.inputBytes+1));await assert.rejects(()=>readLocalFile(p),error('INPUT_LIMIT'));});
test('runLocal CSV to JSON and verify',async()=>{const output=join(sandbox,'result.json');const r=await runLocal({input,config,output});assert.equal(r.status,'REVIEW_REQUIRED');let report=JSON.parse(await readFile(output,'utf8'));assert.equal(report.records.length,1);assert.equal(verifyReceipt(await readFile(input),report.receipt).status,'SOURCE_BYTES_MATCH');});
test('runLocal JSON to CSV',async()=>{const output=join(sandbox,'result.csv');const r=await runLocal({input:jsonInput,config,output});assert.equal(r.status,'OK_FOR_OWNER_REVIEW');assert.ok((await readFile(output,'utf8')).includes('2024-02-29'));});
test('existing destination never overwritten',async()=>{const output=join(sandbox,'exists.json');await writeFile(output,'PRESERVE');await assert.rejects(()=>runLocal({input,config,output}),error('OUTPUT_EXISTS'));assert.equal(await readFile(output,'utf8'),'PRESERVE');});
test('input and output same path blocked',async()=>await assert.rejects(()=>runLocal({input,config,output:input}),error('INVALID_PATH')));
test('config and output same path blocked',async()=>await assert.rejects(()=>runLocal({input,config,output:config}),error('INVALID_PATH')));
test('output extension unsupported blocked',async()=>await assert.rejects(()=>runLocal({input,config,output:join(sandbox,'unknown.txt')}),error('UNSUPPORTED_OUTPUT_FORMAT')));
test('saveNewFile uses new permissions',async()=>{const p=join(sandbox,'private.txt');await saveNewFile(p,'ok');assert.equal(await readFile(p,'utf8'),'ok');if(process.platform!=='win32')assert.equal((await stat(p)).mode & 0o077,0);});
function cli(...args) {return spawnSync(process.execPath,[join(process.cwd(),'bin/prep.mjs'),...args],{encoding:'utf8'});}
test('CLI help exits 0',()=>{let r=cli('--help');assert.equal(r.status,0);assert.match(r.stdout,/inspect/);});
test('CLI inspect emits metadata only',()=>{let r=cli('inspect','--input',input);assert.equal(r.status,0);assert.equal(JSON.parse(r.stdout).rows,1);assert.doesNotMatch(r.stdout,/oops/);});
test('CLI invalid flag fail closed',()=>{let r=cli('run','--approve','true');assert.equal(r.status,1);assert.equal(JSON.parse(r.stderr).code,'INVALID_ARGUMENT');});
test('CLI review returns exit 2',()=>{let output=join(sandbox,'cli.json');let r=cli('run','--input',input,'--config',config,'--output',output);assert.equal(r.status,2);assert.equal(JSON.parse(r.stdout).status,'REVIEW_REQUIRED');});
test('CLI verify reports matching source',()=>{let r=cli('verify','--source',input,'--receipt',join(sandbox,'cli.json'));assert.equal(r.status,0);assert.equal(JSON.parse(r.stdout).status,'SOURCE_BYTES_MATCH');});
test('CLI missing path does not leak path',()=>{let path=join(sandbox,'not-found-secret.csv');let r=cli('inspect','--input',path);assert.equal(r.status,1);assert.doesNotMatch(r.stderr,/not-found-secret/);});
test('JSON run rejects malformed config safely',async()=>{let bad=join(sandbox,'invalid-config.json');await writeFile(bad,'{not json');await assert.rejects(()=>runLocal({input,config:bad,output:join(sandbox,'bad-output.json')}),error('INVALID_CONFIG_JSON'));});
