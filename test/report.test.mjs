import test from 'node:test';
import assert from 'node:assert/strict';
import { renderHTML, REPORT_PREVIEW_LIMIT } from '../src/report.mjs';
const config = {fields:[{name:'memo'}]};
const base = () => ({
  records:[{source_record:1,status:'REVIEW_REQUIRED',data:{memo:'<img src=x onerror="alert(1)"> & hello'},reasons:['FORMULA_RISK']}],
  review_queue:[{record:1,source_line:2,code:'FORMULA_RISK',field:'memo'}],
  receipt:{input_rows:1,output_rows:1,review_rows:1,approval:'NOT_GRANTED',execution:'NOT_PERFORMED',transform_version:'0.1.0',source_sha256:'a'.repeat(64),receipt_sha256:'b'.repeat(64)}
});
test('HTML report is static with strict no-network/no-script CSP',()=>{const h=renderHTML(base(),config);assert.match(h,/Content-Security-Policy/);assert.match(h,/default-src &#39;none&#39;/);assert.doesNotMatch(h,/<script\b/);assert.doesNotMatch(h,/<style\b/);});
test('HTML escapes all data and includes review evidence',()=>{const h=renderHTML(base(),config);assert.match(h,/&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt; &amp; hello/);assert.doesNotMatch(h,/<img\b/);assert.match(h,/FORMULA_RISK/);assert.match(h,/NOT_GRANTED/);});
test('HTML escapes column headings',()=>{const h=renderHTML(base(),{fields:[{name:'<script>bad</script>'}]});assert.match(h,/&lt;script&gt;bad&lt;\/script&gt;/);assert.doesNotMatch(h,/<script>/);});
test('HTML caps record and review previews',()=>{let x=base();x.records=Array.from({length:REPORT_PREVIEW_LIMIT+3},(_,i)=>({...x.records[0],source_record:i+1}));x.review_queue=Array.from({length:REPORT_PREVIEW_LIMIT+3},(_,i)=>({...x.review_queue[0],record:i+1}));const h=renderHTML(x,config);assert.match(h,/200 maximum/);assert.doesNotMatch(h,/<td>203<\/td>/);});
test('HTML result reproducible',()=>assert.equal(renderHTML(base(),config),renderHTML(base(),config)));
test('HTML invalid result fails closed',()=>assert.throws(()=>renderHTML({records:[]},config),/INVALID_REPORT/));
