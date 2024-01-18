/*****
 * leetcode:889
 * 返回与给定的前序和后序遍历匹配的任何二叉树。
 * 每个输入保证至少有一个答案。如果有多个答案，可以返回其中一个。
 * input:
 *  前序遍历 preorder = [3,9,20,15,7]
    后序遍历 postorder = [9,15,7,20,3]
 * output:
 *  3
   / \
  9  20
    /  \
   15   7
 * 
 * 思路：
 * 前序:根左右
 * 后序：左右根
 * 
 * 和前中、中后的搭配不同，前后序的搭配里无法从左右里区分出具体的左、具体的右
 * preorder 第二个元素（如果存在的话）一定是左子树
 */
function constructFromPrePost(preorder, postorder) {
  if (!preorder.length || !postorder.length) {
    return null; //空节点
  }
  let root = preorder[0];
  let node = new TreeNode(root);
  let posi = postorder.indexOf(preorder[1]); // 数组里的元素确定是不重复的
  node.left = constructFromPrePost(preorder.slice(1, posi + 2), postorder.slice(0, posi + 1));
  node.right = constructFromPrePost(preorder.slice(posi + 2), postorder.slice(posi + 1, postorder.length - 1));
  return node;
}
