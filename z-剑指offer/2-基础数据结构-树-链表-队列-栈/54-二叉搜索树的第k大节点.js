/****
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
 */

/***
 * 二叉搜索的 中序遍历是升序输出
 *
 */
function kthLargest(root, k) {
  let result = [];
  kthLargestCall(root);
  return result[result.length - k];

  function kthLargestCall(root) {
    if (!root) return;
    root.left && kthLargestCall(root.left);
    result.push(root.val);
    root.right && kthLargestCall(root.right);
  }
}
