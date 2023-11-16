import { TreeNode } from '@utils';

export function flatten(root: TreeNode | null): void {
  let prev = new TreeNode(-1);
  // let head = prev;

  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    const L = node.left;
    const R = node.right;
    prev.right = node;
    prev.left = null;
    prev = node;
    dfs(L);
    dfs(R);
  };

  dfs(root);
  // return head.right;
}
