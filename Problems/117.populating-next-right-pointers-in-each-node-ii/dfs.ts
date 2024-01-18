// 使用递归
import type { TreeNextNode } from './index';

// 由于dfs是深度向下的，那么要与横向的产生链接，势必 函数参数需要传递节点 dfs(node, nextNode)
// 只适用于 完全二叉树
export function connect(root: TreeNextNode | null): TreeNextNode | null {
  const dfs = (node: TreeNextNode | null, nextNode: TreeNextNode | null) => {
    if (!node) return;
    node.next = nextNode;

    dfs(node.left, node.right);

    // node.next.left这个太灵魂了
    //     1
    //   2   3
    //  / \
    // 4   5
    //6 7 8
    // 4.right = 7
    // 7.next = 8
    // 8 = 5.left = 4.next.left
    dfs(node.right, node.next === null ? null : node.next.left);
  };

  dfs(root, null);
  return root;
}
// 此时:
// input: [1,2,3,4,5,null,7]
// expected: [1,#,2,3,#,4,5,7,#]
// output: [1,#,2,3,#,4,5,#]
// 所以需针对非完全二叉树改良
export function connect_perfect_tree(root: TreeNextNode | null): TreeNextNode | null {
  const dfs = (node: TreeNextNode | null, nextNode: TreeNextNode | null) => {
    if (!node) return;
    node.next = nextNode;

    dfs(node.left, node.right);

    // 改良地: node.next.left || node.next.right
    dfs(node.right, node.next === null ? null : node.next.left || node.next.right);
  };

  dfs(root, null);
  return root;
}
