/**
 * leetcode:404
 * 计算给定二叉树的所有左叶子之和。
 *  3
   / \
  9  20
    /  \
   15   7
9+15=24
 */

function sumOfLeftLeaves1(root) {
  let count = 0;
  sumOfLeftLeavesCall(root);
  return count;

  function sumOfLeftLeavesCall(node) {
    if (!node) return;
    if (node.left && !node.left.left && !node.left.right) {
      count += node.left.val;
    }
    node.left && sumOfLeftLeavesCall(node.left);
    node.right && sumOfLeftLeavesCall(node.right);
  }
}

// 优化
function sumOfLeftLeaves(node, isLeft) {
  if (!node) return 0;
  // if (node.left && !node.left.left && !node.left.right) {
  // 这样当遇到左边第一个叶子节点之后就回溯了==> 转而使用flag代替
  if (isLeft && !node.left && !node.right) {
    return node.val;
  }
  return sumOfLeftLeaves(node.left, true) + sumOfLeftLeaves(node.right, false);
}
