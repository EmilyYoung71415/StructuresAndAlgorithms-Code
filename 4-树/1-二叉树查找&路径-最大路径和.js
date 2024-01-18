/***
 * leetcode: 124
 * 给定一个非空二叉树，返回其最大路径和。
 * 从树中任意节点出发，达到任意节点
 * 该路径至少包含一个节点，且不一定经过根节点。
 */
// case 1
//    1
//   / \
//  2   3
// return 6

// case 2
//    -10
//    / \
//   9  20
//     /  \
//    15   7
//   return 42

/***
 * 思路：
 *      和求直径有些类似，任意节点的路径联系
 *      直径是求  树中节点[左右子树高度和]的最大值
 *      这里是 求树中节点的sum最大值
 *      同样后序遍历
 */

function maxPathSum(root) {
    let max = Number.MIN_SAFE_INTEGER;
    maxPathSumCall(root);
    return max;

    function maxPathSumCall(node) {
        if (!node) return 0;
        // 加 Math.max：如果选了子树的和 反而小了 还不如不选（子树为负数的情况
        let left = Math.max(maxPathSumCall(node.left), 0);
        let right = Math.max(maxPathSumCall(node.right), 0);
        // 上面解决了 选不选子树的问题
        // 这里解决 选了双子树之后 与原max相比的问题
        max = Math.max(max, left + right + node.val);
        return Math.max(left, right) + node.val;
    }
}