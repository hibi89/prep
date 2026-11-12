// Versioned import surface; pre-release and not declared API-stable.
export { VERSION, LIMITS, PrepError, parseCSV, parseJSON, validateConfig,
  suggestMappings, prepareDataset, verifyReceipt, renderCSV, renderHTML,
  readLocalFile, runLocal } from './index.mjs';
export const SDK_CONTRACT_VERSION = '1-preview';
