import getParser from '../utils/getParser.js';

describe('getParser', () => {
  test('should return JSON.parse function when format is .json', () => {
    const parse = getParser('.json');
    expect(parse).toBe(JSON.parse);
  });

  test('should throw an error when format is not supported', () => {
    expect(() => getParser('.xml')).toThrow('Unsupported file format: .xml');
  });
});
