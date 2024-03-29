import { TreeUtil } from '@utils';
import { levelOrderBottom } from './index';

test('levelOrderBottom Tree should work', () => {
  const root = TreeUtil.buildByPre([3, 9, null, null, 20, 15, 7]);
  const output = levelOrderBottom(root);
  expect(output).toStrictEqual([[15, 7], [9, 20], [3]]);
});

test('levelOrderBottom Tree should work 2', () => {
  const root2 = TreeUtil.buildByLevel([0, 2, 4, 1, null, 3, -1, 5, 1, null, null, 6, null, 8]);
  const output2 = levelOrderBottom(root2);
  expect(output2).toStrictEqual([[5, 1, 6, 8], [1, 3, -1], [2, 4], [0]]);
});
