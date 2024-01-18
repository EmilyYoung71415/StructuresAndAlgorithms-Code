export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) {
    return true;
  }

  if (p === null || q === null) {
    return false;
  }

  const queueP: TreeNode[] = [p];
  const queueQ: TreeNode[] = [q];

  while (queueP.length > 0 && queueQ.length > 0) {
    const nodeP = queueP.shift()!;
    const nodeQ = queueQ.shift()!;

    if (nodeP.val !== nodeQ.val) return false;

    nodeP.left && queueP.push(nodeP.left);
    nodeQ.left && queueQ.push(nodeQ.left);

    if (queueP.length !== queueQ.length) return false;

    nodeP.right && queueP.push(nodeP.right);
    nodeQ.right && queueQ.push(nodeQ.right);

    if (queueP.length !== queueQ.length) return false;
  }

  return queueP.length === queueQ.length;
}
