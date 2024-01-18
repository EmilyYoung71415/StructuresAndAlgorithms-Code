// https://leetcode.cn/problems/binary-tree-paths/
export function binaryTreePaths(root: TreeNode | null): string[] {
  const dp: string[] = [];

  const dfs = (node: TreeNode | null, path: string) => {
    if (!node.left && !node.right) {
      dp.push(path);
      return;
    }

    node.left && dfs(node.left, path + '->' + node.left.val);
    node.right && dfs(node.right, path + '->' + node.right.val);
  };

  dfs(root, String(root.val));
  return dp;
}
