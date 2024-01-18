/***
 * 二叉树的遍历和链表的遍历，相似
 * 二叉树的结构与链表结构，相似
 * 由此推得，多叉树的遍历？
 */

/* 基本的二叉树结点 */
function treeNode(data) {
  this.data = data;
  this.left = this.right = null;
}

function traverse(root) {
  if (root == null) return;
  // 访问root.data
  traverse(root.left);
  traverse(root.right);
}

// 多叉树遍历
function traverse(root) {
  for (let child of root.children) {
    traverse(child);
  }
}
