/****
 * leetcode:94
 * 中序：左根右
 * 迭代思路：
 *      先将一直向左边深入，视图找到最左边的节点,(将沿途的左节点都入栈
 *          直到p.left == null 弹栈
 *      此时打印根节点值，p = p.child 换个树继续重复
 */

function inorderTraversal(root) {
    let result = [],
        stack = [],
        p = root;// 遍历指针
    
    while(p||stack.length!==0){
        while (p) {
            stack.push(p);
            p = p.left;
        }

        if (stack.length) {
            // p.left = null 所以弹栈找到最后一个push的节点
            p = stack.pop();
            result.push(p.val)
            p = p.right;
        }
    }
    return result;
}

// 递归方法
function inorderTraversal1(root){
    let result = [];
    inorderTraversalCall(root);
    return result;
    function inorderTraversalCall(root){
        if(root==null){
            return ;
        }
        inorderTraversalCall(root.left);
        result.push(root.val);
        inorderTraversalCall(root.right);
    }
}