// 递归模拟
export function binaryTreeTraversalStackMock(
  root: TreeNode | null,
): [number[], number[], number[]] {
  const prePath: number[] = [];
  const midPath: number[] = [];
  const postPath: number[] = [];
  const stack: [TreeNode | null, number][] = [[root, 0]];

  while (stack.length) {
    // expand记录向后扩展了几次，可以推理出在一个dfs内部代码执行到了第几行
    const [node, expand] = stack[stack.length - 1];
    // 代码执行到 if (!node)
    if (!node) {
      stack.pop();
    } else if (expand === 0) {
      // 代码执行到 dfs(node.left);
      prePath.push(node.val);
      stack[stack.length - 1][1]++; // 代码执行到第一个扩展位置
      stack.push([node.left, 0]);
    } else if (expand === 1) {
      //代码执行到 dfs(node.right);
      midPath.push(node.val);
      stack[stack.length - 1][1]++;
      stack.push([node.right, 0]);
    } else if (expand === 2) {
      // 扩展已经完毕
      postPath.push(node.val);
      stack.pop();
    }
  }

  return [prePath, midPath, postPath];
}
