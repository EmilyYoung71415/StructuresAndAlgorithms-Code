/****
 * 实现查找二叉查找树中某个节点的后继、前驱节点
 * 某一个节点x的后继就是大于x中最小的那个节点，前驱就是小于x中最大的那个节点。
 * 二叉搜索树节点删除的时候 此算法逻辑类似
 */
// BinarySearchTree
// 后继节点：大于x中的最接近x的元素
/****
 * 在查找过程中
 *    核心思想：
 *      情况1：在x的右子树里找最小的元素(最小值一直往左找)，
 *      如果没有右节点：
 *            情况2 x.parent.left = x => x的后继节点=parent
 *            情况3 x.parent.right = x 
 *              => 一直往上找，直到找到一个节点: curnode.parent.left = curnode
 *                 curnode.parent 即为所求
 */
function getNextSuccessor(root, node) {

}

// 前驱节点：小于x中的最接近x的元素
function getPreSuccessor(root, node) {

}