/***
 * leetcode:104
 * 给定一个二叉树，找出其最大深度
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 如下树最大深度 是3
 *  3
   / \
  9  20
    /  \
   15   7
 * 
 *思路：
 * 层序遍历，进入第二层的时候 level++ 直到队列为空
 */

function maxDepth(root){
    if(!root) return 0;
    let queue = [root];
    let level = 1;
    while(queue.length){
        let len = queue.length;
        while(len--){
            let node = queue.shift();
            node.left&&queue.push(node.left)
            node.right&&queue.push(node.right);            
        }
        if(queue.length) level++;
    }
    return level;
}

// 递归解法
function maxDepth(root){
    if(root==null) return 0;
    let lDepth = maxDepth(root.left);// 左子树高度
    let rDepth = maxDepth(root.right);// 右子树高度
    // 树的高度 = 子树高度 + 根节点
    // return lDepth>rDepth?lDepth+1:rDepth+1;
    return Math.max(lDepth,rDepth)+1;
}