/**
 * https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/
 */

function maxDepth(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}