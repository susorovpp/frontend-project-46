import fs from 'fs';
import { getFixturePath } from '../utils/index.js';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  test('should return a string representation of the differences between two configuration files with absolute paths', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const diff = genDiff(file1, file2);
    const expectedDiff = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

    expect(diff).toEqual(expectedDiff);
  });

  test('should return a string representation of the differences between two configuration files with relative paths', () => {
    const diff = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
    const expectedDiff = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

    expect(diff).toEqual(expectedDiff);
  });
});
