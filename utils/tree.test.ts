import { TreeUtil } from './tree';

test('buildTreeFromPreOrder should work', () => {
  const inOrder = [3, 9, null, null, 20, 15, 7];
  const root = TreeUtil.buildByPre(inOrder);
  const output = TreeUtil.traversalPreOrder(root);
  expect(output).toStrictEqual(inOrder);
});
