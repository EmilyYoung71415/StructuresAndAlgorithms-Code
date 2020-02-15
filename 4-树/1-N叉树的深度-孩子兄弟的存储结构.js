/***
 * 求以孩子兄弟方式法存储的树的深度
 */

/***
 * 思路：
 * 树的高度 =  max (树的fistchild的高度 + 1, 兄弟子树高度）
 */

function TreeNode(val) {
    this.val = val;
    this.fistchild = this.nextsibling = null;
}

function getHeight(root) {
    if (!root) return 0;
    let hchild = getHeight(root.fistchild);
    let hSibling = getHeight(root.nextsibling);
    return Math.max(hchild+1, hSibling);
}