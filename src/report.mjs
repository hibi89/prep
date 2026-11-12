/** Static, offline and entirely escaped review report. No active content. */
export const REPORT_PREVIEW_LIMIT = 200;

const escapeHTML = (v) => String(v ?? '').replace(/[&<>"']/g, ch => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[ch]);
const cell = (value) => `<td>${escapeHTML(value)}</td>`;
const heading = (value) => `<th scope="col">${escapeHTML(value)}</th>`;

export function renderHTML(result, config) {
  if (!result || !Array.isArray(result.records) || !Array.isArray(result.review_queue) ||
      !result.receipt || !config || !Array.isArray(config.fields)) throw new TypeError('INVALID_REPORT');
  const cols = config.fields.map(f => f.name);
  const receipt = result.receipt;
  const previews = result.records.slice(0, REPORT_PREVIEW_LIMIT).map(r => {
    const values = cols.map(c => cell(r.data?.[c]));
    return `<tr>${cell(r.source_record)}${cell(r.status)}${values.join('')}${cell((r.reasons ?? []).join(', '))}</tr>`;
  }).join('\n');
  const issues = result.review_queue.slice(0, REPORT_PREVIEW_LIMIT).map(r =>
    `<tr>${cell(r.record)}${cell(r.source_line)}${cell(r.code)}${cell(r.field)}</tr>`
  ).join('\n');
  const counts = [['Input rows', receipt.input_rows], ['Output rows', receipt.output_rows],
    ['Review rows', receipt.review_rows], ['Approval', receipt.approval],
    ['Execution', receipt.execution], ['Transform version', receipt.transform_version],
    ['Source SHA-256', receipt.source_sha256], ['Receipt SHA-256', receipt.receipt_sha256]];
  return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">' +
    '<meta http-equiv="Content-Security-Policy" content="default-src &#39;none&#39;; script-src &#39;none&#39;; style-src &#39;none&#39;; img-src &#39;none&#39;; form-action &#39;none&#39;; base-uri &#39;none&#39;">' +
    '<meta name="referrer" content="no-referrer"><title>PREP review report</title></head><body>' +
    '<h1>PREP review report</h1><p>Local static report. Not an approval, signature or source authenticity certificate.</p>' +
    `<h2>Summary</h2><dl>${counts.map(([k,v])=>`<dt>${escapeHTML(k)}</dt><dd>${escapeHTML(v)}</dd>`).join('')}</dl>` +
    `<h2>Records (first ${REPORT_PREVIEW_LIMIT} maximum)</h2><table><thead><tr>${heading('Source record')}${heading('Status')}${cols.map(heading).join('')}${heading('Reasons')}</tr></thead><tbody>${previews}</tbody></table>` +
    `<h2>Review queue (first ${REPORT_PREVIEW_LIMIT} maximum)</h2><table><thead><tr>${['Record','Line','Reason','Field'].map(heading).join('')}</tr></thead><tbody>${issues}</tbody></table>` +
    `<p>Rows and review items beyond the preview limit are omitted from this HTML preview, not the source result.</p></body></html>\n`;
}
