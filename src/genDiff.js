// @ts-check
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { fileURLToPath } from 'url';

/**
 * Reads the content of a JSON file and returns it as an object.
 *
 * @param {string} filepath - The relative file path to the JSON file.
 * @returns {Object} The parsed content of the JSON file.
 */
export const readFile = (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const absolutePath = path.resolve(__dirname, filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
};

/**
 * Compares two configuration files and shows a difference.
 *
 * @param {string} filePath1 - The relative file path to the first configuration file.
 * @param {string} filePath2 - The relative file path to the second configuration file.
 * @returns {string} A string representation of the differences between the two configuration files.
 */
export const genDiff = (filePath1, filePath2) => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return `+ ${key}: ${value2}`;
    }

    if (!_.has(data2, key)) {
      return `- ${key}: ${value1}`;
    }

    if (value1 === value2) {
      return `  ${key}: ${value1}`;
    }

    return `- ${key}: ${value1}\n  + ${key}: ${value2}`;
  });

  return `{\n  ${result.join('\n  ')}\n}`;
};
