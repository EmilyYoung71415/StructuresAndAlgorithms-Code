// 遍历树，如果节点结构一致 且value也一直 return true
// 那是不是随便一种遍历方式都可以?
// 后序:
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true;
  // if ((p && q === null) || (q && p === null)) return false;
  if (q === null || p === null) return false;
  // if (p && q && p.val !== q.val) return false;
  if (q.val !== p.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
