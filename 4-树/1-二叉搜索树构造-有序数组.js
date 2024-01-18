/**
 * leetcode:108
 * https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/
 * 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 * 高度平衡二叉树：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 */
/****
 * 思路：
 *     顺向思考：来一个元素，就放入树中，然后为了保持高度平衡，就进行调整 => 复杂 没有信心
 *     反向：二叉搜索树有个特点 中序遍历可以得到有序数组，那么有序数组可以反过来得到树吗？
 *      ==> 中序遍历反解: 寻找到数的中间节点，从中间节点触发,切分出左右子树列表，递归构造新的的左右子树
 */
function sortedArrayToBST(nums) {
    if (!nums.length) return null;

    let mid = nums.length>>1;
    let root = new TreeNode(nums[mid]);

    root.left = sortedArrayToBST(nums.slice(0, mid));
    root.right = sortedArrayToBST(nums.slice(mid + 1));

    return root;
}