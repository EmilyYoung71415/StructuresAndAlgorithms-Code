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
function postorderTraversal1(root){
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

function postorderTraversal1(root){
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

// 结合DFS更通用的解法 左右根 <= 根右左
function postorderTraversal(root) {
    let result = [];
    let stack = [root];

    while (stack.length) {
        let node = stack.pop();
        if (node) {
            // 反序
            result.unshift(node.val);
            // 右左
            stack.push(node.left);
            stack.push(node.right);
        }
    }
    return result;
}

/*****
 * 后序： 左右根
 * 辅助指针prev的作用：指向最近访问过的节点，
 * 因为栈存储了经过的节点，当返回根节点的时候，要区分是从左子树返回的还是右子树
 */
function postorderTraversal(root){
    let result = [],
        stack = [],
        prev = null,// 最近访问(打印)过的节点
        p = root;
    while(p||stack.length>0){
        if(p){// 一直走到最左边
            stack.push(p);
            p = p.left
        }
        else{//向右
            // 取栈顶节点(不是弹出)
            let topNode = stack[stack.length-1]// 刚才那个p.left = null的最左下节点
            // 右子树存在 且没有被访问过
            /****
             *      6
             *     / \
             *    4   8  
             *     \
             *      5
             * 当刚遇到4的时候 ，先存右节点，如果右边还有就继续存栈
             * 什么时候决定的右节点被访问了？从5为根的子节点往上打印了5之后，5被访问
             * 这是确定4的右节点打印完全了，该轮到4了
             */
            // 如果右节点访问过，那就弹出
            if(topNode.right&&topNode.right!=prev){
                p = topNode.right;//遍历节点走到右边
                stack.push(p)
                p = p.left;// 再走到左边
            }
            else{// 没有右子树 或者右子树已经打印完全了。该轮到打印他(根)啦
                let node = stack.pop()// 弹出节点
                result.push(node.val)
                prev = node;
                p = null;// 节点访问完之后重置p指针
            }
        }
    }
    return result
}