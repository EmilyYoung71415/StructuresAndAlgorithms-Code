/****
 * https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/
 * 判断一棵二叉树是不是对称的
 */

/****
 * 思路：
 *     是： 左子树是 & 右子树 & 当前树.left.val == right.val
 */

// ❌不过case
// 1 2 2 3 4 4 3
// 所以传递下去的左右树需要并行的 而不是分开判断
function isSymmetric(root) {
  if (!root) return true;
  if (!root.left && !root.right) return true;
  if ((!root.left && root.right) || (!root.right && root.left)) return false;
  return root.left.val == root.right.val && isSymmetric(root.left) && isSymmetric(root.right);
}

function isSymmetric(root) {
  if (!root) return true;
  return isSymmetricCall(root.left, root.right);
  function isSymmetricCall(lRoot, rRoot) {
    if (!lRoot && !rRoot) return true;
    if (!lRoot || !rRoot) return false;
    return (
      lRoot.val == rRoot.val && isSymmetricCall(lRoot.left, rRoot.right) && isSymmetricCall(lRoot.right, rRoot.left)
    );
  }
}
