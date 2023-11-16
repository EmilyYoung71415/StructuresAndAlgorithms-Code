import { TreeUtil } from '@utils';
import { levelOrder as levelOrder_bfs } from './index';

test('levelOrder Tree should work', () => {
  const root = TreeUtil.buildByPre([3, 9, null, null, 20, 15, 7]);
  const output = levelOrder_bfs(root);
  expect(output).toStrictEqual([[3], [9, 20], [15, 7]]);
});
