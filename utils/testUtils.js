import path from 'path';
import fs from 'fs';
import getDirName from './getDirName.js';

/**
 * Retrieves the path to the fixture file based on the provided filename.
 *
 * @param {string} filename - The name of the fixture file.
 * @returns {string} The path to the fixture file.
 */
export const getFixturePath = (filename) => {
  const __dirname = getDirName(import.meta.url);

  return path.join(__dirname, '..', '__fixtures__', filename);
};

/**
 * Reads the content of a fixture file and returns it as a string.
 *
 * @param {string} filename - The name of the fixture file.
 * @returns {string} The content of the fixture file.
 */
export const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
