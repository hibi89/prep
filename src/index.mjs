import { createHash } from 'node:crypto';
import { open, lstat, link, unlink, mkdtemp, rmdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

export const VERSION = '0.1.0';
export const LIMITS = Object.freeze({ inputBytes: 2 * 1024 * 1024, configBytes: 256 * 1024, rows: 20000, columns: 64 });
export class PrepError extends Error {
  constructor(code) { super(code); this.name = 'PrepError'; this.code = code; }
}
const fail = code => { throw new PrepError(code); };
const digest = value => createHash('sha256').update(value).digest('hex');
const allowedTypes = new Set(['text','integer','decimal','boolean','date']);
const safeValue = value => typeof value === 'string' ? value : value === null || value === undefined ? '' : typeof value === 'boolean' || typeof value === 'number' && Number.isSafeInteger(value) ? String(value) : typeof value === 'number' ? fail('UNSAFE_JSON_NUMBER') : fail('INVALID_CELL_TYPE');
const utf8 = bytes => { try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes).replace(/^\uFEFF/, ''); } catch { return fail('INVALID_UTF8'); } };
const checkPlain = x => x !== null && typeof x === 'object' && !Array.isArray(x) && Object.getPrototypeOf(x) === Object.prototype;
const noControl = x => typeof x === 'string' && !/[\u0000-\u001F\u007F\u200B-\u200D\u2060\uFEFF]/u.test(x);

export function parseCSV(value) {
  if (typeof value !== 'string') fail('INVALID_CSV');
  const text = value.replace(/^\uFEFF/, '');
  const rows = []; let row = [], cell = '', quoted = false, closed = false, line = 1, startLine = 1;
  const add = () => { if (row.length >= LIMITS.columns) fail('COLUMN_LIMIT'); row.push(cell); cell = ''; closed = false; };
  const commit = () => { add(); if (rows.length > LIMITS.rows) fail('ROW_LIMIT'); rows.push({ row, line: startLine }); row = []; startLine = line; };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else { quoted = false; closed = true; } }
      else { cell += c; if (c === '\n') line++; }
      continue;
    }
    if (closed && c !== ',' && c !== '\n' && c !== '\r') fail('MALFORMED_CSV');
    if (c === '"') { if (cell || closed) fail('MALFORMED_CSV'); quoted = true; }
    else if (c === ',') add();
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      line++; commit(); startLine = line;
    } else cell += c;
  }
  if (quoted) fail('MALFORMED_CSV');
  if (cell || row.length || closed) commit();
  if (!rows.length) fail('EMPTY_SOURCE');
  const columns = rows.shift().row;
  if (!columns.length || columns.some(x => !x.trim() || !noControl(x))) fail('INVALID_HEADER');
  if (new Set(columns).size !== columns.length) fail('DUPLICATE_HEADER');
  const data = rows.map(({row,line}) => {
    if (row.length !== columns.length) fail('ROW_WIDTH_MISMATCH');
    return { line, values: Object.fromEntries(columns.map((col, i) => [col, row[i]])) };
  });
  return { format: 'csv', columns, records: data };
}

export function parseJSON(value) {
  let body;
  try { body = JSON.parse(value.replace(/^\uFEFF/, '')); } catch { fail('MALFORMED_JSON'); }
  if (!Array.isArray(body) || body.length === 0) fail('INVALID_JSON_ROOT');
  if (body.length > LIMITS.rows) fail('ROW_LIMIT');
  const columns = [];
  const records = body.map((entry, i) => {
    if (!checkPlain(entry)) fail('INVALID_JSON_RECORD');
    const values = Object.create(null);
    for (const [key, v] of Object.entries(entry)) {
      if (!key.trim() || !noControl(key)) fail('INVALID_HEADER');
      if (!columns.includes(key)) { columns.push(key); if (columns.length > LIMITS.columns) fail('COLUMN_LIMIT'); }
      values[key] = safeValue(v);
    }
    return { line: i + 1, values };
  });
  return { format: 'json', columns, records };
}

export function validateConfig(config) {
  if (!checkPlain(config) || config.schema_version !== 1 || !Array.isArray(config.fields) || config.fields.length < 1 || config.fields.length > LIMITS.columns) fail('INVALID_SCHEMA');
  const fields = config.fields.map(f => {
    if (!checkPlain(f) || typeof f.name !== 'string' || !f.name.trim() || !noControl(f.name) || !allowedTypes.has(f.type) || typeof f.source !== 'string' || !f.source.trim() || !noControl(f.source) || (f.required !== undefined && typeof f.required !== 'boolean')) fail('INVALID_SCHEMA_FIELD');
    return { name: f.name, source: f.source, type: f.type, required: f.required === true };
  });
  if (new Set(fields.map(x => x.name)).size !== fields.length || new Set(fields.map(x => x.source)).size !== fields.length) fail('DUPLICATE_MAPPING');
  if (Object.keys(config).some(k => !['schema_version', 'fields'].includes(k))) fail('UNSUPPORTED_CONFIG_OPTION');
  return { schema_version: 1, fields };
}

function normalize(value, type) {
  const v = value.trim();
  if (type === 'text') return value.normalize('NFC').trim();
  if (type === 'integer') {
    if (!/^[+-]?\d+$/.test(v)) fail('INVALID_TYPE');
    const big = BigInt(v);
    if (big < -9223372036854775808n || big > 9223372036854775807n) fail('INVALID_TYPE');
    return String(big);
  }
  if (type === 'decimal') {
    if (!/^[+-]?\d+(?:\.\d+)?$/.test(v)) fail('INVALID_TYPE');
    let [whole, frac = ''] = v.replace(/^\+/, '').split('.');
    if (whole.startsWith('-')) whole = '-' + (whole.slice(1).replace(/^0+(?=\d)/, '') || '0');
    else whole = whole.replace(/^0+(?=\d)/, '') || '0';
    if (whole.replace('-', '').length > 18 || frac.length > 9) fail('INVALID_TYPE');
    frac = frac.replace(/0+$/, '');
    const ans = whole + (frac ? '.' + frac : '');
    return /^-0(?:\.0*)?$/.test(ans) ? '0' : ans;
  }
  if (type === 'boolean') {
    const x = v.toLowerCase();
    if (['1', 'yes', 'y', 'true', '예'].includes(x)) return true;
    if (['0', 'no', 'n', 'false', '아니오'].includes(x)) return false;
    fail('INVALID_TYPE');
  }
  if (type === 'date') {
    const d = v.replace(/\//g, '-');
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
    if (!m) fail('INVALID_TYPE');
    const year = Number(m[1]), month = Number(m[2]), day = Number(m[3]);
    const max = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31,30,31,30,31,31,30,31,30,31][month - 1];
    if (year < 1 || !max || day < 1 || day > max) fail('INVALID_TYPE');
    return d;
  }
  fail('INVALID_TYPE');
}

export function suggestMappings(columns, config) {
  const schema = validateConfig(config);
  const canonical = v => v.toLowerCase().normalize('NFKC').replace(/[\s_\-]/g,'');
  return schema.fields.map(f => {
    const hits = columns.filter(c => canonical(c) === canonical(f.name) || canonical(c) === canonical(f.source));
    return { field: f.name, candidates: hits, status: hits.length === 1 ? 'SUGGESTED_NOT_APPLIED' : 'REVIEW_REQUIRED' };
  });
}

export function prepareDataset(bytes, format, config) {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength > LIMITS.inputBytes) fail('INPUT_LIMIT');
  const schema = validateConfig(config);
  const parsed = format === 'csv' ? parseCSV(utf8(bytes)) : format === 'json' ? parseJSON(utf8(bytes)) : fail('UNSUPPORTED_FORMAT');
  for (const f of schema.fields) if (!parsed.columns.includes(f.source)) fail('MISSING_MAPPED_COLUMN');
  const review_queue = [], records = [], duplicates = new Set();
  const mapped = new Set(schema.fields.map(f => f.source));
  const extra = parsed.columns.filter(c => !mapped.has(c));
  for (let i = 0; i < parsed.records.length; i++) {
    const source = parsed.records[i], reasons = [];
    const normalized = Object.create(null);
    const addReason = (code, field = null) => { reasons.push(code); review_queue.push({ record: i + 1, source_line: source.line, code, field }); };
    for (const f of schema.fields) {
      const raw = source.values[f.source] ?? '';
      if (typeof raw !== 'string') fail('INVALID_CELL_TYPE');
      if (/^\s*[=+@]/.test(raw) || f.type === 'text' && /^\s*-(?!\d)/.test(raw)) addReason('FORMULA_RISK', f.name);
      if (!noControl(raw.replace(/[\r\n\t]/g, ''))) addReason('CONTROL_CHARACTER', f.name);
      if (!raw.trim()) { normalized[f.name] = null; if (f.required) addReason('MISSING_REQUIRED', f.name); continue; }
      try { normalized[f.name] = normalize(raw, f.type); }
      catch (e) { if (e instanceof PrepError && e.code === 'INVALID_TYPE') { normalized[f.name] = null; addReason('INVALID_TYPE', f.name); } else throw e; }
    }
    for (const col of extra) {
      const raw = source.values[col] ?? '';
      if (typeof raw === 'string' && raw.trim()) addReason('UNMAPPED_FIELD', null);
    }
    // Exact-row identity includes unmapped source columns; normalized values can collide.
    const key = JSON.stringify(parsed.columns.map(col => source.values[col] ?? ''));
    if (duplicates.has(key)) addReason('DUPLICATE_RECORD');
    else duplicates.add(key);
    records.push({ source_record: i + 1, source_line: source.line, status: reasons.length ? 'REVIEW_REQUIRED' : 'OK_FOR_OWNER_REVIEW', reasons: [...new Set(reasons)], data: normalized });
  }
  const receipt = { schema_version: 1, transform_version: VERSION, source_sha256: digest(bytes), config_sha256: digest(JSON.stringify(schema)), source_format: format, input_rows: records.length, output_rows: records.length, review_rows: records.filter(x => x.status === 'REVIEW_REQUIRED').length, approval: 'NOT_GRANTED', execution: 'NOT_PERFORMED' };
  receipt.receipt_sha256 = digest(JSON.stringify(receipt));
  return { status: receipt.review_rows ? 'REVIEW_REQUIRED' : 'OK_FOR_OWNER_REVIEW', receipt, review_queue, mapping_suggestions: suggestMappings(parsed.columns, schema), records };
}

export function verifyReceipt(bytes, receipt) {
  if (!(bytes instanceof Uint8Array) || !checkPlain(receipt)) fail('INVALID_RECEIPT');
  const { receipt_sha256, ...rest } = receipt;
  if (digest(JSON.stringify(rest)) !== receipt_sha256) fail('RECEIPT_TAMPERED');
  if (digest(bytes) !== receipt.source_sha256) fail('SOURCE_BYTES_MISMATCH');
  return { status: 'SOURCE_BYTES_MATCH', source_sha256: receipt.source_sha256 };
}

export async function readLocalFile(path, limit = LIMITS.inputBytes) {
  if (typeof path !== 'string' || !path.trim()) fail('INVALID_PATH');
  let handle;
  try {
    const before = await lstat(path);
    if (!before.isFile() || before.isSymbolicLink()) fail('UNSAFE_SOURCE_TYPE');
    if (before.size > limit) fail('INPUT_LIMIT');
    handle = await open(path, constants.O_RDONLY | (constants.O_NOFOLLOW || 0));
    const checked = await handle.stat();
    if (!checked.isFile() || checked.size > limit || checked.ino !== before.ino || checked.dev !== before.dev) fail('SOURCE_CHANGED');
    const buffer = await handle.readFile();
    const after = await handle.stat();
    if (buffer.byteLength > limit || after.size !== before.size || after.mtimeMs !== before.mtimeMs || after.ctimeMs !== before.ctimeMs || buffer.byteLength !== before.size) fail('SOURCE_CHANGED');
    return buffer;
  } catch (e) { if (e instanceof PrepError) throw e; fail('UNAVAILABLE'); }
  finally { await handle?.close(); }
}

const escapeCSV = (v, textType) => {
  let s = v === null || v === undefined ? '' : String(v);
  if (textType && /^\s*[=+@\-]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
};
export function renderCSV(result, config) {
  const fields = validateConfig(config).fields;
  const names = [...fields.map(f => f.name), '__source_record', '__status', '__reasons'];
  const lines = [names.map(n => escapeCSV(n, true)).join(',')];
  for (const r of result.records) lines.push([...fields.map(f => escapeCSV(r.data[f.name], f.type === 'text')), escapeCSV(r.source_record, false), escapeCSV(r.status, true), escapeCSV(r.reasons.join('|'), true)].join(','));
  return lines.join('\r\n') + '\r\n';
}

export async function saveNewFile(path, content) {
  if (typeof path !== 'string' || !path.trim()) fail('INVALID_PATH');
  let folder, staging, file;
  try {
    folder = await mkdtemp(join(dirname(resolve(path)), '.prep-staging-'));
    staging = join(folder, 'data');
    file = await open(staging, 'wx', 0o600);
    await file.writeFile(content);
    await file.sync();
    await file.close(); file = null;
    await link(staging, path); // Publish atomically; fail if destination exists.
  } catch (e) {
    if (e?.code === 'EEXIST') fail('OUTPUT_EXISTS');
    if (e instanceof PrepError) throw e;
    fail('OUTPUT_UNAVAILABLE');
  } finally {
    await file?.close().catch(() => {});
    if (staging) await unlink(staging).catch(() => {});
    if (folder) await rmdir(folder).catch(() => {});
  }
}

export async function runLocal({ input, config, output, format }) {
  if (!input || !config || !output || resolve(input) === resolve(output) || resolve(config) === resolve(output)) fail('INVALID_PATH');
  const bytes = await readLocalFile(input), configText = utf8(await readLocalFile(config, LIMITS.configBytes));
  let options; try { options = JSON.parse(configText); } catch { fail('INVALID_CONFIG_JSON'); }
  const kind = format || (/\.json$/i.test(input) ? 'json' : /\.csv$/i.test(input) ? 'csv' : fail('UNSUPPORTED_FORMAT'));
  const result = prepareDataset(bytes, kind, options);
  const content = /\.csv$/i.test(output) ? renderCSV(result, options) : /\.json$/i.test(output) ? JSON.stringify(result, null, 2) + '\n' : fail('UNSUPPORTED_OUTPUT_FORMAT');
  await saveNewFile(output, content);
  return { status: result.status, rows: result.receipt.input_rows, review_rows: result.receipt.review_rows, source_sha256: result.receipt.source_sha256 };
}
