/***
 * https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/
 * 输入一个二叉树，该函数输出它的镜像。
 */

/***
 * 思路：
 *      树的左子树 = 树的右子树
 *      树的右子树 = 树的左子树
 */

function mirrorTree(root) {
    if (!root) return null;
    
    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    mirrorTree(root.left);
    mirrorTree(root.right);
    return root;
}
