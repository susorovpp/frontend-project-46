import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Retrieves the directory name of the provided file URL.
 *
 * @param {string} metaUrl - The value of import.meta.url.
 * @returns {string} The directory name of the file URL.
 */
const getDirName = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
};

export default getDirName;
