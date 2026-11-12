import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { prepareDataset, parseJSON, runLocal, renderHTML, renderCSV } from '../src/index.mjs';
import { SDK_CONTRACT_VERSION } from '@private/prep-engine/sdk';

const schema = { schema_version: 1, fields: [{ name: 'memo', source: 'Memo', type: 'text', required: true }] };
const scratch = () => mkdtemp(join(tmpdir(), 'prep-security-'));
const prep = (text, config = schema) => prepareDataset(Buffer.from(text, 'utf8'), 'csv', config);

test('package self-reference resolves versioned SDK without host code', () => {
  assert.equal(SDK_CONTRACT_VERSION, '1-preview');
});

test('HTML escapes script, attributes, heading and receipt fields without executable markup', () => {
  const config = { schema_version: 1, fields: [{ name: 'evil<svg/onload=alert(1)>', source: 'Memo', type: 'text' }] };
  const r = prep('Memo\n"</title><script>alert(1)</script>"\n', config);
  const html = renderHTML(r, config);
  assert.match(html, /&lt;\/title&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /evil&lt;svg\/onload=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<script\b|<svg\b|<\/title><script/i);
  assert.match(html, /script-src &#39;none&#39;/);
});

test('JSON __proto__ input is stored as an ordinary own property, not a prototype', () => {
  const parsed = parseJSON('[{"__proto__":"INERT","Memo":"ok"}]');
  assert.equal(Object.getPrototypeOf(parsed.records[0].values), null);
  assert.equal(parsed.records[0].values['__proto__'], 'INERT');
  assert.equal({}.INERT, undefined);
  const result = prepareDataset(Buffer.from('[{"__proto__":"INERT","Memo":"ok"}]'), 'json', schema);
  assert.equal(result.status, 'REVIEW_REQUIRED');
  assert.equal(result.review_queue[0].code, 'UNMAPPED_FIELD');
});

test('CSV formula-like user text is marked for review and not emitted as an executable formula', () => {
  const result = prep('Memo\n"=HYPERLINK(\"\"http://local.invalid\"\")"\n');
  assert.equal(result.status, 'REVIEW_REQUIRED');
  assert.equal(result.review_queue[0].code, 'FORMULA_RISK');
  assert.match(renderCSV(result, schema), /"'=HYPERLINK/);
});

test('existing output is not overwritten and staging is cleaned after failure', async () => {
  const dir = await scratch();
  const input = join(dir, 'source.csv'), config = join(dir, 'config.json'), output = join(dir, 'out.json');
  await writeFile(input, 'Memo\nhello\n');
  await writeFile(config, JSON.stringify(schema));
  await writeFile(output, 'PRESERVE');
  await assert.rejects(() => runLocal({ input, config, output }), e => e?.code === 'OUTPUT_EXISTS');
  assert.equal(await readFile(output, 'utf8'), 'PRESERVE');
  assert.equal((await readdir(dir)).filter(name => name.startsWith('.prep-staging-')).length, 0);
  assert.ok((await stat(input)).isFile());
});

test('malformed UTF-8 refuses export before output creation', async () => {
  const dir = await scratch();
  const input = join(dir, 'source.csv'), config = join(dir, 'config.json'), output = join(dir, 'out.html');
  await writeFile(input, Buffer.from([0xc3, 0x28]));
  await writeFile(config, JSON.stringify(schema));
  await assert.rejects(() => runLocal({ input, config, output }), e => e?.code === 'INVALID_UTF8');
  assert.ok(!(await readdir(dir)).includes('out.html'));
  assert.equal((await readdir(dir)).filter(name => name.startsWith('.prep-staging-')).length, 0);
});
