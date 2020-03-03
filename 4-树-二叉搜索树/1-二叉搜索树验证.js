/****
 * leetcode:98
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树
 * 
 * 思路：
 * 1、递归
 *      当前树是否是二叉搜索树 由他的左子树 和  右子树 决定
 *      但是不能 && 哦 这里的逻辑是只有当左子树是 且右子树是 的时候是true 即 &关系
 * 2、中序遍历二叉搜索树，看输出的节点是否是有序的   
 */
const {BinarySearchTree} =  require('../index');
const arr = [1,1];
let tree = new BinarySearchTree()
arr.forEach(item=>tree.insert(item));
console.log(tree.root)
console.log(isValidBST(tree.root));



 // 递归 ❗ 错的 = =
/****
 * 不能满足：
 *    1
 *   / 
 *  1
 * 本来应该将 此看做一个树，但是由于右子树没有。所以 return node.left了
 * 看成两棵树了
 * 且root情况没考虑周全，当root无子节点的时候 return undefined
 */

function isValidBST1(root){
    if(!root) return true;
    if(root.left&&root.right){
        if(root.left.val>=root.val||root.val>=root.right.val){
            return false;
        }
        // & 表示只有两个都为真的时候才返回真 电灯串联
        return isValidBST(root.left)&isValidBST(root.right);
    }

    if(root.left){
        return isValidBST(root.left);
    }

    if(root.right){
        return isValidBST(root.right);
    }
}

/******
 * 修改：
 * 不一定非要左右子树都存在才能将左右子树和根比较
 * ❗ 错的
 * 但是不满足:
 *      10
 *      /\
 *     5  15
 *    /\  /\
 *       6  20
 * 
 * 当 子树 15、6、20传入的时候 可以满足 左<根<右 
 * 但是！6作为根节点右边的子树，却 6<10
 * 所以这个逻辑是不对的===> 判断子树的左根节点 < 根 <  子树的右根节点
 * 改进：
 *      根 < 右临近子树 的 最小节点
 *      根 > 左临近子树 的 最大节点
 */
function isValidBST1(root){
    if(!root) return true;
    if(root.left||root.right){
        // 不一定非要左右子树都存在才能将左右子树和根比较
        if((root.left&&root.left.val>=root.val)||(root.right&&root.val>=root.right.val)){
            return false;
        }
        return isValidBST(root.left)&isValidBST(root.right);
    }

    return true;
}

/****
 * 设计递归函数 传参： min、max 记录当前的树下界 和 上界
 */
function isValidBST(root){
    return isValidBSTCall(root,null,null);
    function isValidBSTCall(root,min,max){
        if(!root) return true;
        if(min!=null&&root.val<=min) return false;
        if(max!=null&&root.val>=max) return false;
        // 左子树上界:上层树的根(本层树的节点 最大 不能超过 上层树的根)
        // 右子树下界:上层树的根(本层树的节点 最小 不能小于 上层树的根)
        return isValidBSTCall(root.left,min,root.val)&&isValidBSTCall(root.right,root.val,max);
    }
}







// way2:中序遍历
function isValidBST2(root){
    let result = [];
    inorder(root);
    // 然后看result是否是有序的
    for(let i=1;i<result.length;i++){
        if(result[i-1]>=result[i]) return false;
    }
    return true;

    function inorder(root){
        if(!root) return;
        root.left&&inorder(root.left);
        result.push(root.val);
        root.right&&inorder(root.right);
    }
}


// way2：中序遍历 优化
// 不用缓存全部数据，只需要判断上个节点的值是否小于当前节点值即可
function isValidBST2(root){
    let prevNode = null;// 全局变量 缓存上个遍历节点的值
    return inorderhelp(root);
    function inorderhelp(root){
        if(!root) return true;
        if(root.left&&!inorderhelp(root.left)) return false;
        if(prevNode&&prevNode.val>=root.val){
            return false;
        }
        prevNode = root;
        return inorderhelp(root.right);
    }
}
