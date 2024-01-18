export function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  const ans: TreeNode[] = [];
  // 使用哈希表记录每个标识（子树）出现次数，当出现次数为 2（首次判定为重复出现）时，将该节点加入答案
  const map = new Map<string, number>();

  // 递归后判断
  const dfs = (node: TreeNode | null): string => {
    if (!node) return '#'; // 空节点也算数
    let nodeKey = node.val + '_';
    nodeKey += dfs(node.left);
    nodeKey += dfs(node.right);

    // key: 树的标识
    const count = map.get(nodeKey) || 0;
    const newCount = count + 1;
    map.set(nodeKey, newCount);

    if (newCount === 2) {
      // 首次判定为重复出现时
      // 为啥是2呢? 而不是>1 ====> 题目的意思是找到子树之后，push子树的root节点即可（因为重复的子树肯定root节点是一致的
      ans.push(node);
    }

    return nodeKey;
  };

  dfs(root);

  return ans;
}
// 时间复杂度：DFS 过程复杂度为 O(n)，对于每个子树需要构造出与子树同等规模的字符串，复杂度为 O(n)。整体复杂度为 O(n^2)
// 空间复杂度：O(n)
