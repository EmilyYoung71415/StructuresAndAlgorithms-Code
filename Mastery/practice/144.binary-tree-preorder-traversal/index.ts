/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

export function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];

  const res: number[] = [];

  const dfs = (root: TreeNode | null) => {
    if (!root) return;

    res.push(root.val);
    root.left && dfs(root.left);
    root.right && dfs(root.right);
  };

  dfs(root);

  return res;
}
