// 不足节点： 通过节点Node的每种可能得「根-叶」路径上的值总和 全部 < limit, 则该节点是不足节点
// 分析:
// 1. 假设node为根的子树中所有的叶子节点均为不足节点，那node肯定也是不足节点
// ---> 从node出发，到达叶子节点的所有路径，全 < limit
// 2. node为根的子树中，存在叶节点不是不足节点，则node也不是不足节点
// ---> 因为此时一定存在一条路径，根到叶子的路径>limit
// checkSufficientLeaf(node) 来检测 node -> 叶子节点， 路径和 > limit
// const leftNodeHas = checkSufficientLeaf(node.left);
// const rightNodeHas = checkSufficientLeaf(node.left);
// 当前node节点是否有：
// if (!leftNodeHas) {node.left = null};
// return curNode = leftNodeHas || rightNodeHas; // 子树中有一个存在即可是has

// if(node.left) if(node.right)里的if都不能return值。要在后序之后return
// 开始dfs
export function sufficientSubset2(root: TreeNode | null, limit: number): TreeNode | null {
  // checkSufficientLeaf
  const dfs = function (node: TreeNode | null, prevPathSum: number): boolean {
    if (!node) return false; // if (node.left)

    if (!node.left && !node.right) {
      // 等于很重要
      return node.val + prevPathSum >= limit;
    }

    const LNodeHasSufficient = dfs(node.left, prevPathSum + node.val);
    const RNodeHasSufficient = dfs(node.right, prevPathSum + node.val);

    if (!LNodeHasSufficient) {
      node.left = null;
    }

    if (!RNodeHasSufficient) {
      node.right = null;
    }

    return LNodeHasSufficient || RNodeHasSufficient;
  };

  // 这里是子树
  const subHasSufficient = dfs(root, 0);

  return subHasSufficient ? root : null;
}

// 返回 node 结点是否被删除
export function sufficientSubset(root: TreeNode | null, limit: number) {
  if (root == null) {
    return null;
  }
  // 到根结点了
  if (root.left === null && root.right === null) {
    if (root.val < limit) {
      // 不足节点
      return null;
    }

    return root;
  }

  root.left = sufficientSubset(root.left, limit - root.val);
  root.right = sufficientSubset(root.right, limit - root.val);

  // 首先两个子结点（如果存在的话）要清楚自己是不是需要被删除，明显使用 “后序遍历”。
  // 左右子树都为空，意味着这个子树上没有被保留的路径，那么这个结点也没有保留的必要了
  if (root.left == null && root.right == null) {
    return null;
  }

  return root;
}
