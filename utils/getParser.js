import { load as ymlParser } from 'js-yaml';

/**
 * Returns a parsing function based on the specified format.
 *
 * @param {string} format - The file extension indicating the data format
 * ('', '.json', '.yml', or '.yaml').
 * @returns {(input: string) => any} The parser function for the specified format.
 */
const getParser = (format) => {
  let parse;

  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = ymlParser;
  } else {
    throw new Error(`Unsupported file format: ${format}`);
  }

  return parse;
};

export default getParser;
