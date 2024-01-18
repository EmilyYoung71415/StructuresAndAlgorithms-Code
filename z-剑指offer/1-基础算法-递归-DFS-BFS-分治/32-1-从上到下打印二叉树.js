/***
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/
 * 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。
 */
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return [3,9,20,15,7]

/**
 * 思路：
 *      层序遍历，无需区分每一层
 */

function levelOrder(root) {
  let result = [];
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    result.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return result;
}

// 代码鲁棒性
function levelOrder(root) {
  let result = [];
  let queue = [root];
  if (!root) return result;
  while (queue.length) {
    let node = queue.shift();
    result.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return result;
}
