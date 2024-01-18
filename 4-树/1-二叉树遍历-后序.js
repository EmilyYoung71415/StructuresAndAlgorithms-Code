/****
 * leetcode:145
 * 
 * 迭代思路：
 * 将根节点push入栈,一直找沿途的左节点
 * 和之前不一样的地方在于
 * 回溯找到根之后，要在右子树节点打印完之后再打印当前根
 * 难道又将node push进去 ?
 */


// 递归写法
function postorderTraversal(root){
    let result = [];
    postorderTraversalCall(root);
    return result;
    function postorderTraversalCall(root){
        if(root==null){
            return ;
        }
        postorderTraversalCall(root.left);
        postorderTraversalCall(root.right);
        result.push(root.val);
    }
}


/****
 * 
 * 前序遍历：根左右
 * 后序是：左右根
 * 那么我们将前序遍历的实现代码修改成 根右左 
 * 
 * 即是后序遍历的反序版 
 * 小技巧：
 *      反转不用结尾单独reverse。
 *      在push的时候改为 unshift就可以了
 */

function postorderTraversal(root){
    let result = [],
        stack = [],
        p = root;
    while(p||stack.length!=0){
        if(p){
            // result.push(p.val);
            result.unshift(p.val)
            stack.push(p);
            // p = p.left;// 根右左
            p = p.right;
        }else{
            let node = stack.pop();
            // p = node.right;
            p = node.left;
        }
    }
    return result;
}
