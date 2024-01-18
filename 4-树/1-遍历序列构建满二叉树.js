/***
 * 给定数组的遍历顺序，求构建出对应的树
 *    1
     / \
    2   3
       / \
      4   5
    前序：[1,2,#,#,3,4,#,#,5,#,#]
    中序：[#,2,#,1,#,4,#,3,#,5,#]
    后序: [#,#,2,#,#,4,#,#,5,3,1]
*/
console.log(arrToTree('1,2,#,#,3,4,#,#,5,#,#'.split(',')));

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 前序转树
function arrToTree1(arr) {
    let nodeval = arr.shift();
    if (nodeval === '#' || !nodeval) return null;

    let root =  new TreeNode(nodeval);
    root.left = arrToTree(arr);
    root.right = arrToTree(arr);
    return root;
}

// 后序转树 后序：左右根 reverse 调用前序

// 中序转树？
