import { TreeUtil } from '@utils';
import { flatten as flattenBinaryTree } from './index';

test('flatten binary tree to linked list should work', () => {
  const root = TreeUtil.buildByLevel([1, 2, 5, 3, 4, null, 6]);
  flattenBinaryTree(root);
  const output = TreeUtil.traversalLevelOrder(root);
  const expected = new Array(63).fill(null);
  expected[(2 << 0) - 2] = 1;
  expected[(2 << 1) - 2] = 2;
  expected[(2 << 2) - 2] = 3;
  expected[(2 << 3) - 2] = 4;
  expected[(2 << 4) - 2] = 5;
  expected[(2 << 5) - 2] = 6;
  console.log(expected);
  expect(output).toStrictEqual(expected);
});
