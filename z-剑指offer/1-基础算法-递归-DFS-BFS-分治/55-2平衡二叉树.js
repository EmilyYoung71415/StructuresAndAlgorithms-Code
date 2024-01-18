/**
 * 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。
 * 如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。
 */
//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// return false

/**
 * 思路：
 *    核心 判断左右子树的高度
 */

 //     只是求了 从根节点开始算整棵树的 平衡状态
function isBalanced(root) {
    if (!root) return true;
    return Math.abs(treeHeight(root.left) - treeHeight(root.right)) <= 1;

    function treeHeight(root) {
        if (!root) return 0;
        return Math.max(treeHeight(root.left), treeHeight(root.right)) + 1;
    }
}

//        1
//       / \
//      2   2
//     /     \
//    3       3  
//   /         \
//  4           4  判断错误的case

// 可以得到递归每层的左右子树高度 同时将 结果返回为boolean吗
function isBalanced(root) {
    if (!root) return true;
    let flag = true;
    treeHeight(root);
    return flag;

    function treeHeight(root) {
        if (!root) return 0;
        let lDepth = treeHeight(root.left);
        let rDepth = treeHeight(root.right);
        if (Math.abs(lDepth - rDepth) > 1) flag = false;
        return Math.max(lDepth, rDepth) + 1;
    }
}

// 代码优化
function isBalanced(root) {
    if (!root) return true;
    if (Math.abs(treeHeight(root.left) - treeHeight(root.right)) > 1) return false;
    return isBalanced(root.left) && isBalanced(root.right);

    function treeHeight(root) {
        // ..
    }
}