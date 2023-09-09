export function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  if (!root) return false;

  const queue: TreeNode[] = [root];
  let pNodeX: TreeNode | null = null;
  let pNodeY: TreeNode | null = null;

  let targetCount = 0;
  while (queue.length) {
    let levelSize = queue.length;

    while (levelSize--) {
      const node = queue.shift();
      const nodesVal = [node.left?.val, node.right?.val];
      // 每个节点的值是唯一的
      if (nodesVal.includes(x)) {
        pNodeX = node;
      }
      // else if (nodesVal.includes(y)) {
      if (nodesVal.includes(y)) {
        pNodeY = node;
      }

      if ([x, y].includes(node.val)) {
        targetCount++;
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    // 一层循环结束后:
    if (targetCount === 2) {
      return pNodeX !== pNodeY;
    } else if (targetCount === 1) {
      // 深度不一
      return false;
    }
    // targetCount === 0继续循环
  }

  return false;
}
