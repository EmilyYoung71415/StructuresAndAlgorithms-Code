/*****
 * leetcode:235
 * 
 */

function lowestCommonAncestor(root,p,q){
    if(q.val<root.val&&p.val<root.val){//都在左边
        return lowestCommonAncestor(root.left,p,q)
    }
    else if(q.val>root.val&&p.val>root.val){//都在右边
        return lowestCommonAncestor(root.right,p,q)
    }
    return root
}