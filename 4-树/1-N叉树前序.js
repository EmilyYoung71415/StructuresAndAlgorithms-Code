/****
 * leetcode: 589
 * 二叉树获取子节点的方式是 node.left node.right
 * 多叉树比如前端的dom树，使用node.children
 */

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
// return []
// 递归版
function preorder(root) {
    if (!root) return [];
    
    let result = [root.val];
    preorderCall(root);
    return result;

    function preorderCall(root) {
        root.children.forEach(node =>{
            result.push(node.val);
            preorderCall(node);
        })
    }
}