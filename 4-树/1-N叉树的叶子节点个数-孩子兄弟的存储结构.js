/****
 * 求以孩子兄弟方式法存储的树的叶子节点个数
 */

/***
 * 思路：
 * 叶子节点的判别方式： node.fistchild==null
 * 树的总叶子节点的个数 =  孩子子树 + 兄弟子树之和
 */

function TreeNode(val) {
  this.val = val;
  this.fistchild = this.nextsibling = null;
}

function getLeaves(root) {
  if (root === null) return 0;
  if (root.fistchild === null) return 1 + getLeaves(root.nextsibling);
  return getLeaves(root.fistchild) + getLeaves(root.nextsibling);
}
