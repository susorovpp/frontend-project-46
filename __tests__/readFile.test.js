import fs from 'fs';
import path from 'path';

import {
  getFixturePath, readFile,
} from '../utils/index.js';

describe('readFile', () => {
  const fixtureFile = 'file1.json';
  const absoluteFilePath = getFixturePath(fixtureFile);
  const relativeFilePath = path.join('__fixtures__', fixtureFile);
  const expectedData = fs.readFileSync(absoluteFilePath, 'utf-8');

  test('should read the content of a JSON file and parse it as an object (absolute path)', () => {
    const data = readFile(absoluteFilePath);
    expect(data).toEqual(expectedData);
  });

  test('should read the content of a JSON file and parse it as an object (relative path)', () => {
    const data = readFile(relativeFilePath);
    expect(data).toEqual(expectedData);
  });
});
