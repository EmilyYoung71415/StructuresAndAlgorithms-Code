/**
 * way1:
 *    中序遍历，
 *        dp[x] = 节点的值val + 后面的值, 递增序列。 此时x从最左边的节点开始
 *        由于此时x的时候不知道后面的值sum，所以无法 未知 = 已知+未知 （行不通的
 *    那能不能把后面的值变为前面的值呢？
 * way2:
 *      x的节点是最右边的节点开始行不行？
 *        dp[x] = 节点的值val + 前面的值 ==> 中序的反向：右根左
 *        同时也不用辅助空间dp了, node.val = node.val + prev;// prev>=1开始
 *      ==> 反序中序遍历
 */

function convertBST(root: TreeNode | null): TreeNode | null {
  let prev: TreeNode | null = null;

  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    node.right && dfs(node.right);

    node.val = node.val;
    if (prev !== null) {
      node.val += prev.val;
    }
    prev = node;

    node.left && dfs(node.left);
  };

  dfs(root);

  return root;
}

// 更好理解一点:
function convertBST2(root: TreeNode | null): TreeNode | null {
  let sum = 0;

  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    node.right && dfs(node.right);

    // node.val = node.val;
    // if (prev !== null) {
    //   node.val += prev.val;
    // }
    // prev = node;
    sum += node.val;
    node.val = sum;

    node.left && dfs(node.left);
  };

  dfs(root);

  return root;
}
