// 计数法：
// 遍历整棵树，并为每个节点分配一个计数值：每个节点返回其子树中 p 和 q 的出现次数之和
// 当我们第一次遇到一个其计数值为 2 的节点时，这个节点就是 p 和 q 的最近公共祖先。
// 具体的实现可以通过后序遍历实现

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  let ancestor: TreeNode | null = null;

  function countTargets(node: TreeNode | null): number {
    if (!node) return 0;

    const leftCount = countTargets(node.left);
    const rightCount = countTargets(node.right);

    const count = leftCount + rightCount + (node === p ? 1 : 0) + (node === q ? 1 : 0);

    if (count === 2 && ancestor === null) {
      ancestor = node;
    }

    return count;
  }

  countTargets(root);
  return ancestor;
}
