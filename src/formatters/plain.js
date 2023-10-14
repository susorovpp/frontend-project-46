import isPlainObject from 'lodash/isPlainObject';

const formatNode = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  if (value === null || typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const getFormatPlain = (tree) => {
  const iter = (nodes, prevPath = []) => nodes.map((node) => {
    const path = `${[...prevPath, node.key].join('.')}`;

    switch (node.type) {
      case 'added':
        return `Property '${path}' was added with value: ${formatNode(node.value)}\n`;
      case 'removed':
        return `Property '${path}' was removed\n`;
      case 'unchanged':
        return '';
      case 'changed':
        return `Property '${path}' was updated. From ${formatNode(node.value1)} to ${formatNode(node.value2)}\n`;
      case 'nodes':
        return iter(node.children, [path]).join('');
      default:
        throw new Error(`Unknown type: ${node.type} in node: '${path}'`);
    }
  });

  return iter(tree).join('');
};

export default getFormatPlain;
