/*****
 * leetcode:101
 * 给定一个二叉树，检查它是否是镜像对称的。
 */
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3  对称√

//     1
//    / \
//   2   2
//    \   \
//    3    3  对称x
/***
 * 思路：
 *  层序遍历，检查每一层是否是回文对称
 *  还是注意数组里的数组元素是对象时的判等问题，数组元素可能是对象、可能是null
 */

function isSymmetric(root) {
    if(root==null) return true;
    let queue = [root];
    while (queue.length) {
        let curArr = [],
            len  = queue.length;
        while(len--){
            let node = queue.shift();
            // node.left.val||null
            curArr.push(node.left ? node.left.val : null);
            curArr.push(node.right ? node.right.val : null);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        if(!isPalindrome(curArr)){
            return false;
        };
    }
    return true;
    function isPalindrome(arr){
        let i = 0,j = arr.length-1;
        while(i<=j){
            if(arr[i]!=arr[j]) return false
            i++;
            j--;
        }
        return true;
    }
}

// 递归
// 当前树是否对称由当前左右节点是否相等 和 子树决定
function isSymmetric(root){
    if(!root) return true;
    return isSymmetricCall(root.left,root.right)
    function isSymmetricCall(lRoot,rRoot){
        if(!lRoot&&!rRoot) return true;
        if(!lRoot||!rRoot) return false;
        return lRoot.val==rRoot.val&&isSymmetricCall(lRoot.left,rRoot.right)&&isSymmetricCall(lRoot.right,rRoot.left);
    }
}