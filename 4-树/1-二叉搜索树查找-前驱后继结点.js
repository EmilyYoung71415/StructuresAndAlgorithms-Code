/****
 * 实现查找二叉查找树中某个节点的后继、前驱节点
 * 某一个节点x的后继就是大于x中最小的那个节点，前驱就是小于x中最大的那个节点。
 * 二叉搜索树节点删除的时候 此算法逻辑类似
 */
// BinarySearchTree
// 后继节点：大于x中的最接近x的元素
/****
 * 后继在查找过程中
 *    核心思想：
 *      情况1：在x的右子树里找最小的元素(最小值一直往左找)，
 *      如果没有右节点：
 *            情况2 x.parent.left = x => x的后继节点=parent
 *            情况3 x.parent.right = x
 *              => 一直往上找，直到找到一个节点: curnode.parent.left = curnode
 *                 curnode.parent 即为所求
 */
// 由于我们没有parent这个指针，所以我们算法上从下往上，但是实际实现是从上到下
// 过程中记录 parent结点 和targetparent节点（最后一次在查找路径中出现左拐的节点）。
function getNextSuccessor(root, val) {
  if (!root) return null;
  let targetparent = null;
  let parent = null;

  let node = getNode(root, val); // 寻找结点 且在遍历过程 记录下parent 和 nearparent
  if (!node) return node;
  if (node.right) return getMin(node.right); // 有右子树
  if (parent === null || targetparent === null) return null; // 没有后继结点
  if (node === parent.left) return parent; // 寻找结点位于父节点的左结点
  return targetparent; // 寻找结点在父节点的右侧，一直往上追溯到的目标parent

  function getNode(root, val) {
    while (root) {
      if (root.val === val) return root;
      parent = root;

      if (root.val < val) {
        root = root.right;
      } else {
        // 发生了左拐
        targetparent = root;
        root = root.left;
      }
    }
    return null;
  }
  // 在二叉搜索树里找最小值，即一直向左找
  function getMin(root) {
    if (!root) return null;
    while (root.left) {
      root = root.left;
    }
    return root;
  }
}

// 前驱节点：小于x中的最接近x的元素
/****
 * 前驱在查找过程中
 *    核心思想：
 *      情况1：在x的左子树里找最大的元素(最大值一直往右找)，
 *      如果没有右节点：
 *            情况2 x.parent.right = x => x的后继节点=parent
 *            情况3 x.parent.left = x
 *              => 一直往上找，直到找到一个节点: curnode.parent.right = curnode
 *                 curnode.parent 即为所求
 */
// targetparent节点（最后一次在查找路径中出现右拐的节点）
function getPreSuccessor(root, node) {
  if (!root) return null;
  let targetparent = null;
  let parent = null;

  let node = getNode(root, val);
  if (!node) return node;
  if (node.left) return getMax(node.left);
  if (parent === null || targetparent === null) return null;
  if (node === parent.right) return parent;
  return targetparent;

  function getNode(root, val) {
    while (root) {
      if (root.val === val) return root;
      parent = root;

      if (root.val > val) {
        root = root.left;
      } else {
        targetparent = root;
        root = root.right;
      }
    }
    return null;
  }
  // 在二叉搜索树里找最小值，即一直向左找
  function getMax(root) {
    if (!root) return null;
    while (root.right) {
      root = root.right;
    }
    return root;
  }
}
