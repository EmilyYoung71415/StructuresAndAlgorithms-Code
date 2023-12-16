/**
 *  1325
 *  给你一棵以 root 为根的二叉树和一个整数 target ，请你删除所有值为 target 的 叶子节点 。
 *  一旦删除值为 target 的叶子节点，它的父节点就可能变成叶子节点；如果新叶子节点的值恰好也是 target ，那么这个节点也应该被删除。
 */

/**
 * 思路：
 *      当前叶节点 = target root = null
 *      判断root=null之后，叶节点的父节点是否变为了叶节点 如果是 继续
 * 左右根 递归的时候 遇上一代叶节点 置null删除
 * 回溯的时候 处理 被动变为叶节点的祖先节点
 */

function removeLeafNodes(root, target) {
  if (!root) return null;
  if (!root.left && !root.right && root.val == target) {
    return null;
  }
  // 删除后的节点 更新赋予给 回溯层的根节点 (不要指望靠引用传递)
  root.left = removeLeafNodes(root.left, target);
  root.right = removeLeafNodes(root.right, target);
  // 回溯处理根节点
  if (!root.left && !root.right && root.val == target) {
    root = null;
  }
  return root;
}
