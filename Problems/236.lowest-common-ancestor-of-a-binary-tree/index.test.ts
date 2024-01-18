import { TreeNode, TreeUtil } from '@utils';
import { lowestCommonAncestor } from './path';
import { lowestCommonAncestor as lowestCommonAncestor_devide } from './devide';
import { lowestCommonAncestor as lowestCommonAncestor_count } from './count';

test('lowestCommonAncestor should work', () => {
  const root = TreeUtil.buildByLevel([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4, null, null]);
  const p = TreeUtil.findNode(root, 5);
  const q = TreeUtil.findNode(root, 1);
  const output = lowestCommonAncestor(root, p, q);
  expect(output).toBe(root);
});

test('lowestCommonAncestor_devide should work', () => {
  const root = TreeUtil.buildByLevel([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4, null, null]);
  const p = TreeUtil.findNode(root, 5);
  const q = TreeUtil.findNode(root, 1);
  const output = lowestCommonAncestor_devide(root, p, q);
  expect(output).toBe(root);
});

test('lowestCommonAncestor_count should work', () => {
  const root = TreeUtil.buildByLevel([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4, null, null]);
  const p = TreeUtil.findNode(root, 5);
  const q = TreeUtil.findNode(root, 1);
  const output = lowestCommonAncestor_count(root, p, q);
  expect(output).toBe(root);
});
