/***
 * https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/
 * leetcode:1008
 * 先序遍历 preorder 相匹配的二叉搜索树
 */
/*************
 * 思路：
 *      先序遍历(根左右) 构造二叉树 => 不唯一
 *      构造二叉搜索： 由于多了 左 < 根 < 右 的条件 所以可以约束唯一
 *      => 转换
 *          先序排序后 可得  中序序列
 *          先序 + 中序 => 遍历得到树
 */
// 4 / 110
function bstFromPreorder(preorder) {
    let inorder = preorder.sort((a,b) => a-b);
    return buildTree(preorder, inorder);

    function buildTree(preorder,inorder){
        if(!preorder.length||!inorder.length){
            return null;
        }
        let root = preorder[0];
        let node  =  new TreeNode(root);
        let posi = inorder.indexOf(root);
        node.left = buildTree(preorder.slice(1,posi+1),inorder.slice(0,posi))
        node.right = buildTree(preorder.slice(posi+1),inorder.slice(posi+1));
        return node;
    }
}