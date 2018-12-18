/******************************************

二叉树的中序遍历
tag: 栈、树、哈希表
给定一个二叉树 返回它的中序遍历
exp:
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]

进阶:递归写法、迭代写法

 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
******************************************/
/*****
 * 中序是：左根右
 * 前序：根左右
 * 后序：左右根
 * 
 * // 首先要将数组 建立抽象树(找出对应树的抽象关系);no 
 * 输入不是数组 输入一个树的root节点。
 * 
 * 思路：
 *  way1:
 *      输出 一个数组 [] 里面装了中序遍历的值
 *      递归： 顺序 xxCal(node.left)\res.push(node.val)\xxCal(node.right)
 * 
 *  way2:
 *      迭代
 *      利用栈将递归变为迭代
 */

function inorderTraversal(root){
    let result = [];
    function inorderTraversalCal(node){
        if(!node){
            return;
        }
        inorderTraversalCal(node.left);
        result.push(node.val);
        inorderTraversalCal(node.right);
    }
    inorderTraversalCal(root);
    return result;
}


function inorderTraversal2(root){
    let stack = [];
    let result = [];
    while(root!=null||stack.length>0){
        if(root != null){// 进栈过程
            stack.push(root);
            root = root.left;
        }else{
            root = stack.pop();
            result.push(root.val);
            root = root.right;           
        }   
    }
    return result;
}
// 改进 写的更近乎 递归一点

function inorderTraversal3(root){
    let stack = [];
    let result = [];
    let cur = root;// 存一下就会快很多? why
    while(stack.length!=0||cur!=null){
        while(cur!=null){
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        result.push(cur.val);
        cur = cur.right;
    }
    return result;
}