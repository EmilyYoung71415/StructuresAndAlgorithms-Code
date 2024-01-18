/***
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/
 */
// 和二叉树的最近公共祖先对比， 二叉搜索树的性质能给题解带来什么便利
// 1、若两个结点在位于某结点两边，那么某结点即为所求
function lowestCommonAncestor(root, p, q) {
  let res = null;

  while (root) {
    if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else {
      res = root;
      break;
    }
  }
  return res;
}

// 递归版
function lowestCommonAncestor(root, p, q) {
  if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
  if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
  return root;
}
