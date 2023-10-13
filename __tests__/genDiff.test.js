import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResult = readFile('result.txt');

const testFormats = ['json', 'yml'];

describe('genDiff', () => {
  test.each(testFormats)('%s', (format) => {
    const filePath1 = getFixturePath(`file1.${format}`);
    const filePath2 = getFixturePath(`file2.${format}`);

    expect(genDiff(filePath1, filePath2)).toEqual(expectedResult);
  });
});
