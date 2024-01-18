/****
 * leetcode: 590
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
function postorder(root) {
    if (!root) return [];
    let result = [];
    postorderCall(root);
    result.push(root.val);
    return result;

    function postorderCall(root) {
        root.children.forEach(node =>{
            postorderCall(node);
            result.push(node.val);
        })
    }
}