/***
 * leetcode: 222
 * 给出一个完全二叉树，求出该树的节点个数。
 */

/***
 * 思路：
 *     way1、正常的树的遍历然后计数 O(n)
 *     way2、
 *         1、满二叉则直接返回2^H-1
 *         2、当前root非满二叉，则递归地求 count(node.left) + count(node.right) + 1;
 *            此时node.left\node.right 最多只有一个不断递归，另一个要么是满二叉要么是null
 *            每一层只有一个节点会进行递归求解，即至多需要判断 h 次是否为满二叉树，而每次判断完全二叉树是否为满二叉树的时间复杂度为 O(h)。
 *            O(h^2) 
 *          判断完全二叉是否为满二叉： h(node.left) === h(node.right)
 *     way3、完全二叉树的遍历 根据特点会有什么改进之处吗？
 *          1、除了最后一层外 所有结点的个数：2^d-1 (设树有d层)
 *          ==> 求h 
 *              => 找到左子树最下层，确定h
 *          ==> 求最后一层结点的个数
 *              总的结点个数   2^D-1 - 右子树缺失的结点个数
 */
// way1
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// way2
function countNodes(root) {
    if (!root) return 0;
    const {depth, isfull} = checkFullTree(root);
    if (isfull) return 2**depth-1;
    return 1 + countNodes(root.left) + countNodes(root.right);

    function checkFullTree(root) {
        let p1 = root;
        let p2 = root;
        let rHeight = 0;

        while(p2) {
            p1 = p1.left;
            p2 = p2.right;
            rHeight += 1;
        }

        return {
            depth: rHeight,
            isfull: p1 ? false : true
        };
    }
}

// way3
// 参考：https://leetcode-cn.com/problems/count-complete-tree-nodes/solution/er-fen-cha-zhao-by-xu-yuan-shu/
// 完全二叉树只会最后一层的右边缺少节点，所以我们要找到右树最靠左边的一个位置，这个位置的深度小于完全二叉树的深度。
// 二分查找，最后一层的中间位置就是从根的右节点一直往左走的位置。

function countNodes(root) {
    let depth = getdepth(root);
    let sum = 2**depth-1;
    // 遍历前depth层
    for(let i=1; i< depth; i++) {
        //如果右边是满的： 左高度 = 右高度
        if(getdepth(root.right) + i == depth) {
            root = root.right;
        }
        else {
            root = root.left;
            // 减去这颗树作为满叉时应该有的节点个数
            sum -= 2**(depth - i - 1);
        }
    }
    return sum;

    function getdepth(root) {
        let depth = 0;
        while (root) {
            depth++;
            root = root.left;
        }
        return depth;
    }
}