/***
 * https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/
 * 
 * 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
 * B是A的子结构， 即 A中有出现和B相同的结构和节点值。
 */
// A:
//      3
//     / \
//    4   5
//   / \
//  1   2
// B:
//    4 
//   /
//  1
// return true

/****
 *  思路：
 *      树相似： root、left、right 都相似
 */
// 该递归结构 和 1-二叉树查找&路径-路径和3-非必须根节点及叶节点 很类似
function isSubStructure(A, B) {
    if (A == null || B == null) return false;

    return DFS(A,B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);

    function DFS(A,B) {
        if (B == null) return true;
        if (!B && A == null) return false;
        return A.val === B.val && DFS(A.left, B.left) && DFS(A.right,B.right);
    }
} 