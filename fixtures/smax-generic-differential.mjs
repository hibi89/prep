// Synthetic-only snapshots from read-only SMAX original core evaluated in an
// isolated V8 runtime with hash generation stubbed; NOT native Node parity.
// Each field freezes observable normalization and per-row review semantics.
export const UPSTREAM_PIN = '3830cb276f560d58e8181ba384d9cbe64815737c';
export const COMPARISON_CASES = Object.freeze([
  {id:'iso',type:'date',cell:'2026-11-12',smax:'2026-11-12',smaxReview:false,prep:'2026-11-12',prepReview:false},
  {id:'compact',type:'date',cell:'20261112',smax:'2026-11-12',smaxReview:false,prep:null,prepReview:true},
  {id:'slash',type:'date',cell:'2026/11/12',smax:'2026-11-12',smaxReview:false,prep:'2026-11-12',prepReview:false},
  {id:'groupdecimal',type:'decimal',cell:'1,234.50',smax:'1234.50',smaxReview:false,prep:null,prepReview:true},
  {id:'fraction',type:'decimal',cell:'12.5000',smax:'12.5000',smaxReview:false,prep:'12.5',prepReview:false},
  {id:'yes',type:'boolean',cell:'yes',smax:null,smaxReview:true,prep:true,prepReview:false},
  {id:'true',type:'boolean',cell:'true',smax:true,smaxReview:false,prep:true,prepReview:false},
  {id:'int64over',type:'integer',cell:'9223372036854775808',smax:'9223372036854775808',smaxReview:false,prep:null,prepReview:true},
  {id:'formula',type:'text',cell:'=1+1',smax:'=1+1',smaxReview:true,prep:'=1+1',prepReview:true},
  {id:'negative',type:'text',cell:'-123.45',smax:'-123.45',smaxReview:false,prep:'-123.45',prepReview:false},
  {id:'invaliddate',type:'date',cell:'2026-02-30',smax:null,smaxReview:true,prep:null,prepReview:true}
]);
export function syntheticSource(f) { return `Raw\n${f.cell.includes(',') ? JSON.stringify(f.cell) : f.cell}\n`; }
export function prepSchema(f) { return {schema_version:1,fields:[{name:'value',source:'Raw',type:f.type,required:true}]}; }
export function smaxOptions(f) { return {columns:[{key:'value',source:'Raw',type:f.type,required:true}]}; }
