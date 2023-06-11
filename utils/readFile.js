import path from 'path';
import fs from 'fs';

/**
 * Reads the content of a JSON file and returns it as an object.
 *
 * @param {string} filepath - The relative file path to the JSON file.
 * @returns {Object} The parsed content of the JSON file.
 */
const readFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

export default readFile;
