/***
 * leetcode: 543
 * 给定一棵二叉树，你需要计算它的直径长度。
 * 一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过根结点
 * 两结点之间的路径长度是以它们之间边的数目表示。
 */
//       1
//      / \
//     2   3
//    / \     
//   4   5
// 返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。 


/**
 * 递归函数：
 * 过根节点A的直径 = 左子树的高度 + 右子树的高度
 * 本质上是求树中节点[左右子树高度和]的最大值
 * 后序遍历
 * 树的高度：树的高度 = 子树高度 + 根节点 // Math.max(lDepth,rDepth)+1
 */

// 不一定经过根节点的原因
//       1
//      / 
//     2   
//    / \     
//   4   5
//  /     \
// 8       6
//          \
//           7
// 时间复杂度 O(N) 空间 O(N)
function diameterOfBinaryTree(root) {
    let result = 0;
    diameterOfBinaryTreeCall(root);
    return result;

    function diameterOfBinaryTreeCall(root) {
        if (!root) return 0;
        let lDepth = diameterOfBinaryTreeCall(root.left);
        let rDepth = diameterOfBinaryTreeCall(root.right);
        result = Math.max(result, lDepth + rDepth); // process code
        return Math.max(lDepth, rDepth) + 1;
    }
}
