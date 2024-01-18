/**
 * leetcode:559
 * 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
 */

// dfs
function maxDepth(root) {
    if (!root) return 0;
    let res = 0;
    root.children.forEach(node => {
        res = Math.max(res,maxDepth(node));
    })
    return res + 1;
}