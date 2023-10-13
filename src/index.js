import path from 'path';

import fs from 'fs';
import parse from './parse.js';
import format from './formatters/index.js';
import buildTree from './buildTree.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const extension = path.extname(fullPath).slice(1);
  const data = fs.readFileSync(fullPath, 'utf-8');

  return parse(data, extension);
};

/**
 * Compares two configuration files and shows a difference.
 */
const genDiff = (filePath1, filePath2, outputFormat = 'stylish') => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const tree = buildTree(data1, data2);
  // console.dir(tree, { depth: null });
  return format(tree, outputFormat);
};

export default genDiff;
