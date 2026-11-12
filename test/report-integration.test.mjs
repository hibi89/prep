import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runLocal, renderHTML, prepareDataset } from '../src/index.mjs';
const schema={schema_version:1,fields:[{name:'memo',source:'Memo',type:'text',required:true}]};
test('CLI backend writes escaped static HTML with no script execution or overwrite',async()=>{
  const folder=await mkdtemp(join(tmpdir(),'prep-html-'));
  const input=join(folder,'source.csv'), config=join(folder,'schema.json'), output=join(folder,'preview.html');
  await writeFile(input,'Memo\n"<script>alert(1)</script>"\n');
  await writeFile(config,JSON.stringify(schema));
  const result=await runLocal({input,config,output});
  assert.equal(result.status,'OK_FOR_OWNER_REVIEW');
  const html=await readFile(output,'utf8');
  assert.match(html,/&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html,/<script\b/);
  assert.match(html,/NOT_GRANTED/);
  await assert.rejects(()=>runLocal({input,config,output}),e=>e?.code==='OUTPUT_EXISTS');
});
test('report renderer exposed from main engine',()=>{
  const result=prepareDataset(Buffer.from('Memo\nhello\n'), 'csv', schema);
  assert.match(renderHTML(result,schema),/hello/);
});
