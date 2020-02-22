/**
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 */

// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
//     3
//    / \
//   9  20
//     /  \
//    15   7

/***
 * 思路：
 *      前序： 根左右
 *      中序： 左根右
 * 递归划分
 *      root.val = preorder[0];
 *      左的长度: leftLen = inorder.indexOf(root.val);
 *      左子树的前序：preorder前leftLen+1个 去掉第一个 =>  preorder.slice(1,leftLen+1); slice是[)
 *      右子树的前序: preorder.slice(leftLen+1)
 *      左子树的中序： inorder.slice(0,leftLen+1)
 *      右子树的中序: inorder.slice(leftLen)
 * 
 *      root.left = 由左子树的 前序、中序构建出的树
 *      root.right = 由右子树的 前序、中序构建出的树
 * 
 *      递归base： 前序、中序长度总是一样的，当其中一个为0时即可return
 *      递归每层返回最新构建出的树
 */
// let preorder = [3,9,20,15,7]
// let inorder = [9,3,15,20,7]
// let leftLen = inorder.indexOf(preorder[0]);
// console.log(preorder.slice(1,leftLen+1)) // 左前 [9]
// console.log(inorder.slice(0,leftLen))// 左中 [9]
// console.log(preorder.slice(leftLen+1))// 右前 [20,15,7]
// console.log(inorder.slice(leftLen+1))// 右中 [15,20,7]


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function buildTree(preorder, inorder) {
    if (!preorder.length || !inorder.length) {
        return null;
    }

    let rootval = preorder[0];
    let root = new TreeNode(rootval);
    let leftLen = inorder.indexOf(rootval);
    root.left = buildTree(preorder.slice(1,leftLen+1), inorder.slice(0,leftLen));
    root.right = buildTree(preorder.slice(leftLen+1), inorder.slice(leftLen+1));
    return root;
}