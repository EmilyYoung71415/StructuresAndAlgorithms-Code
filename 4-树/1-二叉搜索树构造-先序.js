/***
 * https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/
 * leetcode:1008
 * 先序遍历 preorder 相匹配的二叉搜索树
 */
/*************
 * 思路1：
 *      先序遍历(根左右) 构造二叉树 => 不唯一
 *      构造二叉搜索： 由于多了 左 < 根 < 右 的条件 所以可以约束唯一
 *      => 转换
 *          先序排序后 可得  中序序列
 *          先序 + 中序 => 遍历得到树
 */
function bstFromPreorder(preorder) {
    if(!preorder.length) return null
    let rootVal=preorder.shift()
    let root = new TreeNode(rootVal)
    root.left=bstFromPreorder(preorder.filter(item=>item<rootVal))
    root.right=bstFromPreorder(preorder.filter(item=>item>rootVal))
    return root;
};

/****
 * 思路2:
 *    先序：根左右
 *    1、get根节点 
 *    2、数组里根节点之后第一大的数字，该数字左边是根节点左子树，右边是右子树
 */

function bstFromPreorder(preorder) {
    return bstFromPreorderCall(preorder, 0, preorder.length-1);

    function bstFromPreorderCall(preorder, start, end) {
        if (start > end) return null;

        let index = start+1;
        for(; index <= end; index++) {
            if (preorder[index] > preorder[start]) {
                break;
            }
        }

        let root = new TreeNode(preorder[start]);
        root.left = bstFromPreorderCall(preorder, start+1, index-1);
        root.right = bstFromPreorderCall(preorder, index, end);
        return root;
    }
}