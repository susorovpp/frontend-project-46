import getFormatStylish from './stylish.js';
import getFormatPlain from './plain.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return getFormatStylish(tree);
    case 'plain':
      return getFormatPlain(tree);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
