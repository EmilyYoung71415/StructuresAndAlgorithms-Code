/**
 * leetcode:100
 */
function isSameTree(p, q) {
    if (p==null && q) return false;
    if (p && q==null) return false;
    if (!p && !q) return true;
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// 优化
function isSameTree (q, p) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}