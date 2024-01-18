import { TreeUtil } from './tree';

test('buildTreeFromPreOrder should work', () => {
  const inOrder = [3, 9, null, null, 20, 15, 7];
  const root = TreeUtil.buildByPre(inOrder);
  const output = TreeUtil.traversalOrder(root, 'pre');
  expect(output).toStrictEqual(inOrder);
});

test('buildTreeFromLevelOrder should work', () => {
  const levelOrder = [0, 2, 4, 1, null, 3, -1, 5, 1, null, 6, null, 8];
  const root = TreeUtil.buildByLevel(levelOrder);
  const output = TreeUtil.traversalLevelOrder(root);
  expect(output).toStrictEqual(levelOrder);
});
