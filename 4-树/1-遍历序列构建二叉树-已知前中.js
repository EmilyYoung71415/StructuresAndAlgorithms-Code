/*****
 * leetcode:105
 * 根据一棵树的前序遍历与中序遍历构造二叉树。假设树中没有重复的元素。
 * input:
 *  前序遍历 preorder = [3,9,20,15,7]
    中序遍历 inorder = [9,3,15,20,7]
 * output:
 *  3
   / \
  9  20
    /  \
   15   7
 * 
 * 思路：
 * 前序:根左右 // 前序_arr[0] === 当前树的根 
 * 中序:左根右 // 而中序根据前序确定的根划分左右树
 * 所以递归
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
function buildTree(preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null; //空节点
  }
  let root = preorder[0];
  let node = new TreeNode(root);
  // 在中序(左根右)找到根的索引，此时也等于左子节点的个数，以该个数为度量再在前序(根左右)里划分得到左的前序
  let posi = inorder.indexOf(root); // 数组里的元素确定是不重复的
  // posi 即使下标也是长度计量
  node.left = buildTree(preorder.slice(1, posi + 1), inorder.slice(0, posi));
  node.right = buildTree(preorder.slice(posi + 1), inorder.slice(posi + 1));
  return node;
}
