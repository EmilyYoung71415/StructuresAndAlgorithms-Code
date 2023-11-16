export function flatten(root: TreeNode | null): void {
  // 返回形成好链表的头尾指针
  const dfs = (node: TreeNode | null): [TreeNode | null, TreeNode | null] => {
    if (!node) return [null, null];

    //1、left和right都不存在
    if (!node.left && !node.right) return [node, node];
    const [head1, tail1] = dfs(node.left);
    const [head2, tail2] = dfs(node.right);

    //2、left不存在
    if (!node.left) {
      node.right = head2;
      return [node, tail2];
    }

    //3、right不存在
    node.left = null;
    if (!node.right) {
      node.right = head1;
      return [node, tail1];
    }

    // left right均在
    // node → head1,tail1  → head2,tail2
    node.right = head1;
    tail1.right = head2;
    return [node, tail2];
  };

  dfs(root);
  // return dfs(node)[0];
}
