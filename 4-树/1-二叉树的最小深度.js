/***
 * leetcode:111
 * 给定一个二叉树，找出其最小深度
 * 如下树最小深度 是2
 *  3
   / \
  9  20
    /  \
   15   7
 * 
 *思路：
 * 想到递归了 
 */

/****
 *      1 
 *     /
 *    1  
 * 最小深度是2
 * 
 **/ 

function minDepth(root){
    // 遇到叶子节点 返回
    if(!root) return 0;
    if(!root.left&&!root.right) return 1;
    let lDepth = root.left?minDepth(root.left):Infinity;
    let rDepth = root.right?minDepth(root.right):Infinity;
    return Math.min(lDepth,rDepth)+1;
}

function minDepth(root){
    // 遇到叶子节点 返回
    if(!root) return 0;
    let lDepth = minDepth(root.left);
    let rDepth = minDepth(root.right);
    return (lDepth==0||rDepth==0)?1+lDepth+rDepth:Math.min(lDepth,rDepth)+1;
}