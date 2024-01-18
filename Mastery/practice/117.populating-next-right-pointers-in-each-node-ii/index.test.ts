import { TreeUtil } from '@utils';
import { TreeNextNode, connect } from './index';

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
  // const node4 = new TreeNextNode(4);
  // const node5 = new TreeNextNode(5);
  // const node2 = new TreeNextNode(2, node4, node5);
  // const node3 = new TreeNextNode(3);
  // const root = new TreeNextNode(1, node2, node3);
  const root = TreeUtil.buildByLevel([1, 2, 3, 4, 5, null, 7]);
  const root2 = connect(root);
  const result = traversalNext(root2);
  expect(result).toEqual([1, null, 2, 3, null, 4, 5, 7, null]);
});
