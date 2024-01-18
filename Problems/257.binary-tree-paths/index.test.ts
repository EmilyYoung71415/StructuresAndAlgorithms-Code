// 输入：root = [1,2,3,null,5]
// 输出：["1->2->5","1->3"]

// 输入：root = [1]
// 输出：["1"]
import { TreeUtil } from '@utils';
import { binaryTreePaths } from './index';

test('binaryTreePaths should work', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, null, 5, null, null]);
  const output = binaryTreePaths(root);
  expect(output).toStrictEqual(['1->2->5', '1->3']);
});

test('binaryTreePaths should work2', () => {
  const root = TreeUtil.buildByLevel([1]);
  const output = binaryTreePaths(root);
  expect(output).toStrictEqual(['1']);
});
