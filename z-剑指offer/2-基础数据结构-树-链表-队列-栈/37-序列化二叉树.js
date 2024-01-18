/***
 * https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof/
 * 请实现两个函数，分别用来序列化和反序列化二叉树。
 */

//     1
//    / \
//   2   3
//      / \
//     4   5
// 序列化为 "[1,2,3,null,null,4,5]"

/****
 * 按照满二叉的方式存储成字符串 "1,2,3,#,#,4,5"
 * 前序遍历得序列值，根据序列值再构建树
 * 相当于：1、树的遍历 2、遍历序列完全二叉版构建树
 */
function serialize(root) {
    if (!root) return '#,';// 无节点的自带分割,
    let res = root.val + ',';
    res += serialize(root.left);
    res += serialize(root.right);
    return res;
};

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 满二叉数组构建满二叉树
// const str = '1,2,#,#,3,4,#,#,5,#,#';
function deserialize(str) {
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