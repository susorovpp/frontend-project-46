// @ts-check
import _ from 'lodash';
import { readFile } from '../utils/index.js';

/**
 * Compares two configuration files and shows a difference.
 *
 * @param {string} filePath1 - The absolute/relative file path to the first configuration file.
 * @param {string} filePath2 - The absolute/relative file path to the second configuration file.
 * @returns {string} A string representation of the differences between the two configuration files.
 */
const genDiff = (filePath1, filePath2) => {
  const data1 = JSON.parse(readFile(filePath1));
  const data2 = JSON.parse(readFile(filePath2));

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

export default genDiff;
