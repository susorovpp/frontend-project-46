import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { genDiff, readFile } from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixtureFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const result = readFixtureFile('result.txt');

const file1Object = JSON.parse(readFixtureFile('file1.json'));

test('check readFile function', () => {
  expect(readFile(filePath1)).toEqual(file1Object);
});

test('check genDiff function', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(result);
});
