import { TreeUtil, MTreeUtil } from './tree';
import type { MTreeNode } from './tree';

test('buildTreeFromPreOrder should work', () => {
  const inOrder = [3, 9, null, null, 20, 15, 7];
  const root = TreeUtil.buildByPre(inOrder);
  const output = TreeUtil.traversalOrder(root, 'pre');
  expect(output).toStrictEqual(inOrder);
});

describe('buildTreeFromLevelOrder should work', () => {
  test('buildTreeFromLevelOrder 1', () => {
    const levelOrder = [1, 2, 5, 3, 4, null, 6];
    const root = TreeUtil.buildByLevel(levelOrder);
    const output = TreeUtil.traversalLevelOrder(root);
    expect(output).toStrictEqual(levelOrder);
  });

  test('buildTreeFromLevelOrder when tree degenerate to link list', () => {
    const levelOrder = [
      1,
      null,
      2,
      null,
      null,
      null,
      3,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      4,
    ];
    const root = TreeUtil.buildByLevel(levelOrder);
    const output = TreeUtil.traversalLevelOrder(root);
    expect(output).toStrictEqual(levelOrder);
  });
});

test('find target node in MTree should work', () => {
  // const root = TreeUtil.buildByLevel([1]);
  const root: MTreeNode<number> = {
    val: 1,
    children: [
      {
        val: 3,
        children: [
          {
            val: 5,
            children: [],
          },
          {
            val: 6,
            children: [],
          },
        ],
      },
      {
        val: 2,
        children: [],
      },
      {
        val: 4,
        children: [],
      },
    ],
  };
  const target = MTreeUtil.findNode<number>(root, 4);
  expect(target).toStrictEqual({
    val: 4,
    children: [],
  });
});
