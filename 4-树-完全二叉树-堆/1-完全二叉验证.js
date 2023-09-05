/***
 * leetcode: 958
 * 给定一个二叉树，确定它是否是一个完全二叉树。
 */

/***
 * 完全二叉的特点：
 *      每一层的结点，都是尽可能地靠左
 * 思路：
 * 层序遍历，如果遇到当前层结点为#但是后面仍然有节点，且没有遍历完的情况 return false
 * 不需要区分每一层
 */

function isCompleteTree(root) {
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    // 这里判断有误，当右最下结点为空节点时，当前队列后面的也有null结点
    // 所以 纠正：  !node && queue.length => !node && flag（当第一次出现空节点时置为true 此时即为第二次遇到null结点
    // if (!node && queue.length) return false;
    queue.push(node.left);
    queue.push(node.right);
  }

  return true;
}

// way1 层序遍历纠正
function isCompleteTree(root) {
  let queue = [root];
  let isNullNodeShowed = false;
  while (queue.length) {
    let node = queue.shift();
    if (node) {
      if (isNullNodeShowed) return false;
      queue.push(node.left);
      queue.push(node.right);
    } else {
      isNullNodeShowed = true;
    }
  }

  return true;
}
