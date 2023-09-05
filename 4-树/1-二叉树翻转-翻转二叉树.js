/*****
 * leetcode:226
之前：
     4
   /   \
  2     7
 / \   / \
1   3 6   9
之后：
     4
   /   \
  7     2
 / \   / \
9   6 3   1
*/

/***
 * 思路：
 * 竖向： 每一个子树的左右节点都被交换了, 交换左右子树 相当于两数交换
 * way1: 递归深入的时候 交换左右结点
 */
function invertTree(root) {
  if (root == null) return null;
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);
  return root;
}

// way1-2: 回溯的时候交换
function invertTree(root) {
  if (root == null) return null;
  let right = invertTree(root.right);
  let left = invertTree(root.left);
  // 回溯时让：左子树等于 右子树
  root.left = right;
  root.right = left;
  return root;
}

/**
 * way2:
 * 横向看的解决方案：层序遍历
 * 队列弹出node的时候，交换当前node的左右子节点
 */
function invertTree(root) {
  if (root == null) return null;
  let queue = [root];
  while (queue.length) {
    // 不需要区分当前层与上层关系
    let len = queue.length;
    while (len--) {
      let node = queue.shift();
      swapSonTree(node);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;

  function swapSonTree(root) {
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
  }
}
