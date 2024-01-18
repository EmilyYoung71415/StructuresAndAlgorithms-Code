/***
 *  leetcode:222 
 *  在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值
 *  并且最下面一层的节点都集中在该层最左边的若干位置
 *  
    1
   / \
  2   3
 / \  /
4  5 6
=> 6
*/

/***
 * 思路：
 * way1： 前序遍历记录结点个数
 * 
 */
function countNodes(root) {
    let count = 0;
    countNodesCall(root);
    return count;
    
    function countNodesCall(root) {
        if (!root) return;
        count++;
        root.left && countNodesCall(root.left);
        root.right && countNodesCall(root.right);
    }
}

// 优化
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}