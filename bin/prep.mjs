#!/usr/bin/env node
import { readLocalFile, runLocal, verifyReceipt, verifyResult, parseCSV, parseJSON, verifyExport, PrepError } from '../src/index.mjs';
const args = process.argv.slice(2);
const usage = 'prep inspect --input FILE [--format csv|json] | run --input FILE --config FILE --output FILE(.json|.csv|.html) [--format csv|json] [--receipt-output FILE] | verify --source FILE --receipt FILE [--export FILE]';
const fail = code => { throw new PrepError(code); };
const main = async () => {
  if (args.length === 0 || args[0] === '--help') return { usage };
  const cmd = args.shift();
  if (!['inspect', 'run', 'verify'].includes(cmd)) fail('UNSUPPORTED_COMMAND');
  const params = {};
  while (args.length) {
    const k = args.shift();
    if (!k?.startsWith('--') || !['--input','--config','--output','--format','--source','--receipt','--receipt-output','--export'].includes(k) || k in params || !args.length || args[0].startsWith('--')) fail('INVALID_ARGUMENT');
    params[k] = args.shift();
  }
  if (cmd === 'run') {
    if (Object.keys(params).some(k => !['--input','--config','--output','--format','--receipt-output'].includes(k))) fail('INVALID_ARGUMENT');
    return await runLocal({ input: params['--input'], config: params['--config'], output: params['--output'], format: params['--format'], receiptOutput: params['--receipt-output'] });
  }
  if (cmd === 'inspect') {
    if (!params['--input'] || Object.keys(params).some(k => !['--input','--format'].includes(k))) fail('INVALID_ARGUMENT');
    const bytes = await readLocalFile(params['--input']);
    const format = params['--format'] || (/\.json$/i.test(params['--input']) ? 'json' : /\.csv$/i.test(params['--input']) ? 'csv' : fail('UNSUPPORTED_FORMAT'));
    let text; try { text = new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch { fail('INVALID_UTF8'); }
    const p = format === 'csv' ? parseCSV(text) : format === 'json' ? parseJSON(text) : fail('UNSUPPORTED_FORMAT');
    return { status: 'INSPECTED_NOT_APPROVED', format, columns: p.columns, rows: p.records.length };
  }
  if (!params['--source'] || !params['--receipt'] || Object.keys(params).some(k => !['--source','--receipt','--export'].includes(k))) fail('INVALID_ARGUMENT');
  let json; try { json = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(await readLocalFile(params['--receipt']))); } catch { fail('INVALID_RECEIPT'); }
  if (json.format_version === 'PREP_EXPORT_V1') {
    if (!params['--export']) fail('MISSING_EXPORT');
    const sourceResult = verifyReceipt(await readLocalFile(params['--source']), json.source_receipt);
    const exportResult = verifyExport(await readLocalFile(params['--export']), json);
    return { status: 'SOURCE_AND_EXPORT_MATCH', source_sha256: sourceResult.source_sha256, export_sha256: exportResult.export_sha256 };
  }
  if (params['--export']) fail('INVALID_EXPORT_RECEIPT');
  const sourceResult = verifyReceipt(await readLocalFile(params['--source']), json.receipt ?? json);
  // Older source-only receipts remain verifiable, but v1 result receipts are fail-closed.
  if (json.receipt?.result_sha256) verifyResult(json);
  return sourceResult;
};
try {
  const result = await main();
  console.log(JSON.stringify(result));
  if (result.status === 'REVIEW_REQUIRED') process.exitCode = 2;
} catch (e) {
  const code = e instanceof PrepError ? e.code : 'UNEXPECTED_FAILURE';
  console.error(JSON.stringify({ status: 'INVALID', code }));
  process.exitCode = 1;
}
