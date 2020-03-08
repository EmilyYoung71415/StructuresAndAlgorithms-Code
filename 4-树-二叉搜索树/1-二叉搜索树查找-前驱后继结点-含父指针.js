/****
 * 实现查找二叉查找树中某个节点的后继、前驱节点
 * 某一个节点x的后继就是大于x中最小的那个节点，前驱就是小于x中最大的那个节点。
 * 结点有父指针的情况
 */

function getNextSuccessor(root, node) {
    if (!root || !node) return null;
    if (node.right) return getMin(node.right);

    // 依靠x.parent 向上找
    let prev = node.parent;
    while (prev && node === prev.right) {
        node = node.parent;
        prev = prev.parent;
    }

    return prev;
    
    // 在二叉搜索树里找最小值，即一直向左找
    function getMin(root) {
        if (!root) return null;
        while (root.left) {
            root = root.left;
        }
        return root;
    }
}


function getPreSuccessor(root, node) {
    if (!root || !node) return null;
    if (node.left) return getMax(node.left);

    // 依靠x.parent 向上找
    let prev = node.parent;
    while (prev && node === prev.left) {
        node = node.parent;
        prev = prev.parent;
    }

    return prev;
    
    function getMax(root) {
        if (!root) return null;
        while (root.right) {
            root = root.right;
        }
        return root;
    }
}