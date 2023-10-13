import yaml from 'js-yaml';

/**
 * Returns a parsing function based on the specified format.
 */
const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};

export default parse;
