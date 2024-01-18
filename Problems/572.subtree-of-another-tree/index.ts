export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (subRoot === null) return true;
  if (root === null) return false;

  if (root.val === subRoot.val && isSameTree(root, subRoot)) return true;

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);

  function isSameTree(root: TreeNode | null, subRoot: TreeNode | null) {
    if (root === null && subRoot === null) return true;

    if (root && subRoot && root.val === subRoot.val) {
      return isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right);
    }

    return false;
  }
}
