import isObject from 'lodash/isObject';

const SPACES_COUNT = 4;
const OFFSET_LEFT = 2;

const getIndent = (depth, spaces = SPACES_COUNT) => ' '.repeat((depth * spaces) - OFFSET_LEFT);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return String(value);
  }

  const content = Object.entries(value).map(([key, val]) => `  ${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`).join('\n');

  return `{\n${content}\n${getIndent(depth)}  }`;
};

const formatNode = ({ key, value }, depth, sign) => `${getIndent(depth)}${sign} ${key}: ${stringify(value, depth)}\n`;

const iter = (tree, depth) => tree.map((node) => {
  switch (node.type) {
    case 'added':
      return formatNode(node, depth, '+');
    case 'removed':
      return formatNode(node, depth, '-');
    case 'unchanged':
      return formatNode(node, depth, ' ');
    case 'changed':
      return `${formatNode({ ...node, value: node.value1 }, depth, '-')}${formatNode({ ...node, value: node.value2 }, depth, '+')}`;
    case 'nodes':
      return `${getIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${getIndent(depth)}  }\n`;
    default:
      throw new Error(`Unknown type: ${node.type} in node: ${stringify(node, depth)}`);
  }
});

const getFormatStylish = (tree) => `{\n${iter(tree, 1).join('')}}`;

export default getFormatStylish;
