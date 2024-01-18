/*****
 * leetcode:235
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

function lowestCommonAncestor(root, p, q) {
    let res = null;

    while (root) {
        if (root.val > p.val && root.val > q.val) {
            root = root.left;
        }
        else if (root.val < p.val && root.val < q.val) {
            root = root.right;
        }
        else {
            res = root;
            break;
        }
    }
    return res;
}
