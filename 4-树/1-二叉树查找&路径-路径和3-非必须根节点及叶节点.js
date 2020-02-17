/***
 * leetcode 437 求和路径3
 * 程序员面试经典第6版 面试题4.12 求和路径
 * 
 * 每个结点都存放着一个整数值，找出路径和等于给定数值的路径总数。
 * 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 */
//       10
//      /  \
//     5   -3
//    / \    \
//   3   2   11
//  / \   \
// 3  -2   1
// sum = 8
// 三条路径
// 1.  5 -> 3
// 2.  5 -> 2 -> 1
// 3.  -3 -> 11
/***
 * 思路：
 *      当前树=target 路径和的总数 = 左子树=target-root.val 路径和总数 + 右子树=target-root.val 路径和总数
 *      target > root.val 则继续递归 其余情况无需再分
 *      每个节点两种情况： 选 or 不选
 */
// ❌错误解法：示例解出来 比正确的多一种
function pathSum1(root, sum) {
    if (!root) return 0;
    if (root.val == sum) return 1;
    // root.val > sum 的情况 考虑：选root or 不选 root
    return pathSum(root.left,sum) + pathSum(root.right,sum) + pathSum(root.left, sum - root.val) + pathSum(root.right, sum - root.val);
}


// 正确的题解
function pathSum(root,sum) {
    if (!root) return 0;
    // 选root + 不选root：左子树 and 右子树
    return pathSumOnlyStart(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
    // 选root
    function pathSumOnlyStart(root,sum) {
        if (!root) return 0;
        const self = root.val == sum ? 1 : 0;
        // 只有root的情况 + 选了root之后：左子树 + 右子树
        return self + pathSumOnlyStart(root.left, sum - root.val) + pathSumOnlyStart(root.right, sum - root.val)
    }
}