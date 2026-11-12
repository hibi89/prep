import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareDataset} from '../src/index.mjs';
import {COMPARISON_CASES,prepSchema,syntheticSource} from '../fixtures/smax-generic-differential.mjs';
for(const f of COMPARISON_CASES) {
  test('recorded SMAX/PREP synthetic differential: '+f.id,()=>{
    const r=prepareDataset(Buffer.from(syntheticSource(f),'utf8'),'csv',prepSchema(f));
    assert.deepEqual(r.records[0].data.value,f.prep);
    assert.equal(r.records[0].status==='REVIEW_REQUIRED',f.prepReview);
    // Frozen upstream reference is a V8-executed SMAX code snapshot, NOT native goldens.
    const same=Object.is(f.smax,f.prep)&&f.smaxReview===f.prepReview;
    assert.equal(same,!['compact','groupdecimal','fraction','yes','int64over'].includes(f.id));
  });
}
test('differential fixture records 6 matching and 5 explicitly divergent semantics',()=>{
  const same=COMPARISON_CASES.filter(f=>Object.is(f.smax,f.prep)&&f.smaxReview===f.prepReview);
  assert.equal(COMPARISON_CASES.length,11);
  assert.equal(same.length,6);
});
