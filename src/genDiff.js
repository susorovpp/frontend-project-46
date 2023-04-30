// @ts-check
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
};

/**
 * Compares two configuration files and shows a difference
 * @param filepath1
 * @param filepath2
 * @param format
 * @returns {string}
 */
export default (filepath1, filepath2, format) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

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
