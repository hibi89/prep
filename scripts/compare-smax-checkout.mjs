#!/usr/bin/env node
// Development-only, read-only, offline differential runner. No private source
// is committed to PREP; an owner-provided separate local SMAX checkout is used.
import {execFileSync} from 'node:child_process';
import {lstat,realpath} from 'node:fs/promises';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {prepareDataset} from '../src/index.mjs';
import {COMPARISON_CASES,UPSTREAM_PIN,prepSchema,smaxOptions,syntheticSource} from '../fixtures/smax-generic-differential.mjs';
const fatal=(code,detail)=>{console.error(JSON.stringify({status:'NOT_VERIFIED',code,detail}));process.exitCode=2;};
const args=process.argv.slice(2);
if(args.length!==2||args[0]!=='--checkout'||!args[1])fatal('USAGE','node scripts/compare-smax-checkout.mjs --checkout SEPARATE_LOCAL_SMAX_CHECKOUT');
else {
  try {
    const checkout=await realpath(args[1]);
    if(!(await lstat(checkout)).isDirectory())throw new Error('NOT_DIRECTORY');
    const sha=execFileSync('git',['-C',checkout,'rev-parse','HEAD'],{encoding:'utf8',timeout:3000,stdio:['ignore','pipe','ignore']}).trim();
    if(sha!==UPSTREAM_PIN)throw new Error('UNEXPECTED_SOURCE_SHA');
    const source=join(checkout,'preprocessing','generic-csv.mjs');
    if(!(await lstat(source)).isFile())throw new Error('MISSING_OR_UNSAFE_SOURCE');
    const smax=await import(pathToFileURL(source).href+'?sha='+UPSTREAM_PIN);
    if(typeof smax.preprocessGenericCsv!=='function'||typeof smax.validateGenericCsvPackage!=='function')throw new Error('INVALID_SOURCE_API');
    const cases=[];
    for(const f of COMPARISON_CASES){
      const input=syntheticSource(f);
      const original=smax.preprocessGenericCsv(input,smaxOptions(f));
      const valid=smax.validateGenericCsvPackage(original);
      if(valid!==true)throw new Error('SMAX_VALIDATOR_REJECTED');
      const prep=prepareDataset(Buffer.from(input,'utf8'),'csv',prepSchema(f));
      const smValue=original.rows[0]?.values?.value;
      const smReview=original.rows[0]?.status==='NEEDS_REVIEW';
      const prValue=prep.records[0]?.data?.value;
      const prReview=prep.records[0]?.status==='REVIEW_REQUIRED';
      const snapshot=Object.is(smValue,f.smax)&&smReview===f.smaxReview;
      const prepSnapshot=Object.is(prValue,f.prep)&&prReview===f.prepReview;
      cases.push({id:f.id,smValue,prValue,smReview,prReview,match:Object.is(smValue,prValue)&&smReview===prReview,referenceStable:snapshot&&prepSnapshot});
    }
    const matches=cases.filter(x=>x.match).length;
    const allStable=cases.every(x=>x.referenceStable);
    console.log(JSON.stringify({status:allStable?'NATIVE_COMPARISON_MATCHES_FROZEN_REFERENCE':'CONTRACT_DIFFERENCE_OR_STALE_REFERENCE',upstream_sha:sha,executed_original_node:true,total:cases.length,matching:matches,different:cases.length-matches,reference_stable:allStable,cases},null,2));
    if(!allStable)process.exitCode=1;
  } catch(e) {fatal('NATIVE_COMPARISON_BLOCKED',e?.message==='UNEXPECTED_SOURCE_SHA'?'Source commit does not match pinned SHA':(e?.code||e?.message||'UNKNOWN'));}
}
