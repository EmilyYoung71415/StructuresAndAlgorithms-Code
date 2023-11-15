// Last few GCs 内存超限了
// 使用回溯优化 dfs(node, path);

// 有没有办法，不单独保存 path1 path2基于path1 path2 二次遍历呢？
export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root) return null;
  // if (!p || !q)

  let path1: TreeNode[] | null = null;
  let path2: TreeNode[] | null = null;
  const path: TreeNode[] = [];

  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    if (path1 && path2) return;

    // forward()
    path.push(node);

    node.left && dfs(node.left);
    node.right && dfs(node.right);

    if (node.val === p.val) {
      path1 = path.slice();
    }
    if (node.val === q.val) {
      path2 = path.slice();
    }
    // backward()
    path.pop();
  };

  dfs(root);

  if (!path1 || !path2) return root;
  // 遍历path1 path2
  const minIndex = Math.min(path1.length, path2.length) - 1;
  let i = minIndex;
  let j = minIndex;

  while (i && j) {
    const node1 = path1[i];
    const node2 = path2[j];
    if (node1.val === node2.val) {
      return node1;
    }
    i--;
    j--;
  }

  return root;
}

export function lowestCommonAncestor1(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null,
): TreeNode | null {
  if (!root) return null;
  // if (!p || !q)

  let path1: TreeNode[] | null = null;
  let path2: TreeNode[] | null = null;

  const dfs = (node: TreeNode | null, curPath: TreeNode[]) => {
    if (!node) return;
    if (path1 && path2) return;

    node.left && dfs(node.left, curPath.concat(node.left));
    node.right && dfs(node.right, curPath.concat(node.right));

    if (node.val === p.val) {
      path1 = curPath;
    }
    if (node.val === q.val) {
      path2 = curPath;
    }
  };

  dfs(root, [root]);

  if (!path1 || !path2) return root;
  // 遍历path1 path2
  const minIndex = Math.min(path1.length, path2.length) - 1;
  let i = minIndex;
  let j = minIndex;

  while (i && j) {
    const node1 = path1[i];
    const node2 = path2[j];
    if (node1.val === node2.val) {
      return node1;
    }
    i--;
    j--;
  }

  return root;
}
