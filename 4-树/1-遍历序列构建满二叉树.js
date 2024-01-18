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
// console.log(arrToTree('1,2,#,#,3,4,#,#,5,#,#'.split(',')));

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 前序转树
function arrToTree(arr) {
    let nodeval = arr.shift();
    if (nodeval === '#' || !nodeval) return null;

    let root =  new TreeNode(nodeval);
    root.left = arrToTree(arr);
    root.right = arrToTree(arr);
    return root;
}

// 后序转树 后序：左右根 reverse 调用前序

// 中序转树？


// 层序转树 [1,2,3,4,5] 2*i+1 是左子节点 2*i+2是右子节点
/***
 * 从当前节点 顺势链接子节点 =》 不可行
 * 从当前节点 找到父节点 父节点链接当前节点
 */
function arrToTreeLevel(arr) {
    // nodeArr 从1开始计数
    let nodeArr = arr.map(val=>{
        return val === '#' ? null : new TreeNode(val);
    });

    for(let i = 1; i<nodeArr.length; i++) {
        let fIndex = Math.floor((i-1)/2);
        let father = nodeArr[fIndex];
        i % 2 ? father.left = nodeArr[i] : father.right = nodeArr[i];
    }

    return nodeArr[0];
}