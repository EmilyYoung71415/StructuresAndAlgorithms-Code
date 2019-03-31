/*****
 * leetcode:226
之前：
     4
   /   \
  2     7
 / \   / \
1   3 6   9
之后：
     4
   /   \
  7     2
 / \   / \
9   6 3   1

思路：
横向看：每一行 反向输出了
竖向： 每一个子树的左右节点都被交换了
*/

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTree(root){
    if(root==null) return null;
    let temp = root.left;
    root.left = root.right;
    root.right = temp;
    if(root.left){
        root.left = invertTree(root.left);
    }
    if(root.right){
        root.right = invertTree(root.right);
    }
    return root;
}

// 代码精简
function invertTree(root){
    if(root==null) return null;
    swapTree(root);
    invertTree(root.left);
    invertTree(root.right);
    return root;
    function swapTree(root){
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
    }
}


/**
 * 横向看的解决方案：层序遍历
 * 队列弹出node的时候，交换当前node的左右子节点
 */


function invertTree(root){
    if(root==null) return null;
    let queue = [root];
    while(queue.length){
        // 不需要区分当前层与上层关系
        let len = queue.length;
        while(len--){
            let node = queue.shift();
            swapSonTree(node);
            node.left&&queue.push(node.left);
            node.right&&queue.push(node.right);
        }
    }
    return root;
    function swapSonTree(root){
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
    }
}