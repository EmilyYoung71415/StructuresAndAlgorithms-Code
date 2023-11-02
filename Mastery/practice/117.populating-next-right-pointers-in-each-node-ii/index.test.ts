import { TreeUtil } from '@utils';
import { TreeNextNode, connect } from './index';
import { connect as connect_dfs, connect_perfect_tree } from './dfs';

function traversalNext(root: TreeNextNode | null): (number | null)[] {
  const result: (number | null)[] = [];
  let levelHead = root;

  while (levelHead) {
    let tempHead = levelHead;
    let node = levelHead;
    // 层序遍历 沿着.next
    while (node) {
      result.push(node.val);
      node = node.next;
    }

    result.push(null);
    // 当前层遍历完，下一层的头结点等于上层头结点的 左 or 右
    levelHead = tempHead.left || tempHead.right;
  }

  return result;
}

test('connect next should work', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, 4, 5, null, 7]);
  const root2 = connect(root);
  const result = traversalNext(root2);
  expect(result).toEqual([1, null, 2, 3, null, 4, 5, 7, null]);
});

test('connect next dfs should work in perfect binary tree', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, 4, 5, 6, 7]);
  const root2 = connect_dfs(root);
  const result = traversalNext(root2);
  expect(result).toEqual([1, null, 2, 3, null, 4, 5, 6, 7, null]);
});

test('connect next dfs should work in binary tree', () => {
  const root = TreeUtil.buildByLevel([1, 2, 3, 4, 5, null, 7]);
  const root2 = connect_perfect_tree(root);
  const result = traversalNext(root2);
  expect(result).toEqual([1, null, 2, 3, null, 4, 5, 7, null]);
});
