/***
 * leetcode: 297
 * 请设计一个算法来实现二叉树的序列化与反序列化
 * 保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构
 * (相当于js里的JSON.stringfy(obj) JSON.parse(str) 
 *   1
    / \
    2   3
        / \
        4   5

    不限定你的序列 / 反序列化算法执行逻辑，
    只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Encodes a tree to a single string.
 * 按照满二叉的方式存储成字符串 "1,2,3,#,#,4,5"
 * 前序遍历得序列值，根据序列值再构建树
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) return '#,';// 无节点的自带分割,
    let res = root.val + ',';
    res += serialize(root.left);
    res += serialize(root.right);
    return res;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
// 满二叉数组构建满二叉树
// const str = '1,2,#,#,3,4,#,#,5,#,#';
var deserialize = function(str) {
    let arr = str.split(',');
    return arrToTree(arr);

    function arrToTree(arr) {
        let nodeval = arr.shift();
        if (nodeval === '#' || !nodeval) return null;
        // 前序构建： 根左右
        let root = new TreeNode(nodeval);
        root.left = arrToTree(arr);
        root.right = arrToTree(arr);
        return root;
    }
};
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */