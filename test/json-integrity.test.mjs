import test from 'node:test';
import assert from 'node:assert/strict';
import { parseJSON, prepareDataset, validateConfig, renderCSV, PrepError } from '../src/index.mjs';
const invalid = code => e => e instanceof PrepError && e.code === code;
const schema = {schema_version:1,fields:[{name:'name',source:'Memo',type:'text'}]};

test('reject exact duplicate JSON keys in one record before silent data loss',()=>{
  assert.throws(()=>parseJSON('[{"Memo":"first","Memo":"second"}]'),invalid('DUPLICATE_JSON_KEY'));
});
test('reject duplicate JSON key with escaped Unicode equivalent',()=>{
  assert.throws(()=>parseJSON('[{"Memo":"first","\\u004demo":"second"}]'),invalid('DUPLICATE_JSON_KEY'));
});
test('duplicate keys in separate JSON records remain valid',()=>{
  const x=parseJSON('[{"Memo":"first"},{"Memo":"second"}]');
  assert.equal(x.records.length,2);
  assert.equal(x.records[0].values.Memo,'first');
  assert.equal(x.records[1].values.Memo,'second');
});
test('commas and escaped quotes in JSON value do not count as keys',()=>{
  const x=parseJSON('[{"Memo":"first,\\\"Memo\\\":second"}]');
  assert.equal(x.records.length,1);
});
test('unsupported nested object is rejected as invalid cell type',()=>{
  assert.throws(()=>parseJSON('[{"Memo":{"Memo":"secret"}}]'),invalid('INVALID_CELL_TYPE'));
});
test('no output is produced for repeated JSON property key',()=>{
  const src=Buffer.from('[{"Memo":"trusted","Memo":"untrusted"}]');
  assert.throws(()=>prepareDataset(src,'json',schema),invalid('DUPLICATE_JSON_KEY'));
});
for(const name of ['__status','__reasons','__source_record','__STATUS','＿＿status']) {
  test('reject output-metadata namespace collision '+name,()=>{
    assert.throws(()=>validateConfig({schema_version:1,fields:[{name,source:'Memo',type:'text'}]}),invalid('INVALID_SCHEMA_FIELD'));
  });
}
test('normal mapped fields keep exact existing CSV header contract',()=>{
  const result=prepareDataset(Buffer.from('Memo\nhello\n'),'csv',schema);
  assert.equal(renderCSV(result,schema).split('\r\n')[0],'"name","__source_record","__status","__reasons"');
});
