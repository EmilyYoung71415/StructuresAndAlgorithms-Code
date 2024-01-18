/*****
 * leetcode:106
 * input:
 *  中序遍历 inorder = [9,3,15,20,7]
    后序遍历 postorder = [9,15,7,20,3]
 * output:
    3
   / \
  9  20
    /  \
   15   7
 * 
 *思路：
 *中序是 左根右
 *后序是: 左右根
 *和已知前中差不多的
 */
let inorder = [9,3,15,20,7],// 左根右
    postorder = [9,15,7,20,3];// 左右根
console.log(buildTree(inorder,postorder));
function TreeNode(val){
    this.val = val;
    this.left = this.right = null;
}

/****
 * let inorder = [9,3,15,20,7],// 左根右
    postorder = [9,15,7,20,3];// 左右根
 * 核心思路是 后序的最后一个元素是根，每次在后序确定根之后再在中序分左右树
 * 那么就看 根部紧邻的是右、还是左 ；如果是右 则在中序里 从左根右，找到右
 * 再从数组的最右边向根靠近排查
 */
function buildTree(inorder,postorder){
    let p = postorder.length-1,
        i = inorder.length-1;
    function buildTreeCall(stop){
        if(inorder[i]==stop||p<0){
            return null;
        }
        let root = new TreeNode(postorder[p--]);
        root.right = buildTreeCall(root.val);
        i--;
        root.left = buildTreeCall(stop);
        return root;
    }
    return buildTreeCall()
}

function buildTree2(inorder,postorder){
    if(inorder.length<1||postorder.length<1){
        return null;
    }
    let postLen = postorder.length,
        root = postorder[postLen-1],
        //root =  postorder.pop()
        node = new TreeNode(root),
        pos = inorder.indexOf(root);
    node.left =  buildTree(inorder.slice(0,pos),postorder.slice(0,pos));
    node.right = buildTree(inorder.slice(pos+1),postorder.slice(pos,postLen-1));
    return node;
}