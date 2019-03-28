/****
 * leetcode:144
 * 前序遍历：根左右
 * 使用 递归和迭代两种方法
 * 
 * 迭代思路和中序差不多
 * 还是push左节点 ，只是先打印根节点值
 */
// Input: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// Output: [1,2,3]// 递归
function preorderTraversal1(root){
    let result = [];
    preorderTraversalCall(root);
    return result;
    function preorderTraversalCall(root){
        if(root==null){
            return ;
        }
        result.push(root.val)
        preorderTraversalCall(root.left)
        preorderTraversalCall(root.right)
    }
}

// 迭代的方式 
function preorderTraversal(root){
    let result = [],
        stack = [],
        p = root;
    while(p||stack.length!=0){
        if(p){
            result.push(p.val);
            stack.push(p);
            p = p.left;
        }else{
            let node = stack.pop();
            p = node.right;
        }
    }
    return result;
}