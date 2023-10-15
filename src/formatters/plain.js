import _ from 'lodash';

const formatNode = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getFormatPlain = (tree) => {
  const iter = (nodes, prevPath = []) => {
    const lines = nodes.map((node) => {
      const path = `${[...prevPath, node.key].join('.')}`;

      switch (node.type) {
        case 'added':
          return `Property '${path}' was added with value: ${formatNode(node.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${path}' was updated. From ${formatNode(node.value1)} to ${formatNode(node.value2)}`;
        case 'nodes':
          return iter(node.children, [path]);
        default:
          throw new Error(`Unknown type: ${node.type} in node: '${path}'`);
      }
    }).filter((line) => line !== null);

    return lines.join('\n').trim();
  };

  return iter(tree);
};

export default getFormatPlain;
