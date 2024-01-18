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
// sort会改变原数组 记得拷贝一次
function bstFromPreorder(preorder) {
    let inorder = preorder.slice().sort((a, b) => a-b);
    return buildTree(preorder, inorder);
    function buildTree(preorder,inorder){
        if(!preorder.length||!inorder.length){
            return null;//空节点
        }
        let root = preorder[0];
        let node  =  new TreeNode(root);
        let posi = inorder.indexOf(root);
        node.left = buildTree(preorder.slice(1,posi+1),inorder.slice(0,posi))
        node.right = buildTree(preorder.slice(posi+1),inorder.slice(posi+1));
        return node;
    }
}

// 思路2：根据左 < 根 < 右特点，以根节点为比较，小于根节点的组成左子树
function bstFromPreorder(preorder) {
    if(!preorder.length) return null;
    let rootVal = preorder.shift();
    let root = new TreeNode(rootVal);
    root.left = bstFromPreorder(preorder.filter(item => item < rootVal));
    root.right = bstFromPreorder(preorder.filter(item => item > rootVal));
    return root;
};

/****
 * 思路3:
 *    先序：根左右
 *    1、get根节点 
 *    2、数组里根节点之后第一大的数字，该数字左边是根节点左子树，右边是右子树
 *      (与根节点最近的结点： 左子树最大的，右子树最小的)
 *      结合左<根<右的特点，在前序里最左边的元素在前序的第一个，所以右子树最小的元素在前序里分割了 左右两个子树
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


/****
 * 思路4： 正面硬刚
 *         先序遍历=>二叉搜索树 （与二叉搜索树的构造类似
 */
function bstFromPreorder(preorder) {
    let root = new TreeNode(preorder[0]);

    for(let i=1;i<preorder.length;i++) {
        let node = new TreeNode(preorder[i]);
        root = insert(root, node);
    }
    
    return root;

    function insert(root, node) {
        if (!root) {
            root = node;
            return root;
        }
        if (node.val < root.val) {
            root.left = insert(root.left, node);
        }
        else {
            root.right = insert(root.right, node);
        }
        return root;
    }
}