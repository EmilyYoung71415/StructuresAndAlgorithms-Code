export function sumNumbers(root: TreeNode | null): number {
  let sum = 0;

  const dfs = (node: TreeNode | null, prevSum: number) => {
    if (!node.left && !node.right) {
      sum += prevSum;
      return;
    }

    const nextVal = prevSum * 10;
    node.left && dfs(node.left, nextVal + (node.left.val || 0));
    node.right && dfs(node.right, nextVal + (node.right.val || 0));
  };

  dfs(root, root.val);

  return sum;
}
