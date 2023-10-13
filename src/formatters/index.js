import getFormatStylish from './stylish.js';

const format = (tree, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return getFormatStylish(tree);
    default:
      throw new Error(`Unknown format: ${outputFormat}`);
  }
};

export default format;
