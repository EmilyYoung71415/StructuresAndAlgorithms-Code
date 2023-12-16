/*****
 * leetcode:106
 * input:
 *  中序遍历 inorder = [9,3,15,20,7]
    后序遍历 postorder = [9,15,7,20,3]
 * output:
    3
   / \
  9  20
    /  \
   15   7
 * 
 *思路：
 *中序是 左根右
 *后序是: 左右根
 *和已知前中差不多的
 */
let inorder = [9, 3, 15, 20, 7], // 左根右
  postorder = [9, 15, 7, 20, 3]; // 左右根
console.log(buildTree(inorder, postorder));
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function buildTree(inorder, postorder) {
  if (inorder.length < 1 || postorder.length < 1) {
    return null;
  }
  let postLen = postorder.length;
  let root = postorder[postLen - 1];
  let node = new TreeNode(root);
  let pos = inorder.indexOf(root);
  node.left = buildTree(inorder.slice(0, pos), postorder.slice(0, pos));
  node.right = buildTree(inorder.slice(pos + 1), postorder.slice(pos, postLen - 1));
  return node;
}
