// 最短路径问题，明显BFS
// 二叉树是单向图，不需要遍历节点去重
// 每一个节点，维护当前节点的depth
// 因为层序遍历是按层下来的，所以第一个遇到的叶子节点，对应的深度就是最小深度
// 所以，每层节点，伴随维护当前节点的depth变量

export function minDepth(root: TreeNode) {
  const queue: [TreeNode, number][] = [];
  queue.push([root, 1]);

  while (queue.length) {
    const [node, depth] = queue.shift();
    if (!node.left && !node.right) return depth;
    node.left && queue.push([node.left, depth + 1]);
    node.right && queue.push([node.right, depth + 1]);
  }

  return 1;
}
