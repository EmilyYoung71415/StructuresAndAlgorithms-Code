import { check } from 'prettier';

// 返回从根到叶子节点的所有路径中 伪回文 路径的数目。
function pseudoPalindromicPaths(root: TreeNode | null): number {
  let count = 0;

  const check = (num: number) => {
    // 全是偶数 or 只有一个1（表示只有一个奇数
    return num === 0 || (num & (num - 1)) === 0;
  };

  const dfs = (node: TreeNode | null, num: number) => {
    if (!node.left && !node.right) {
      check(num) && count++;
      return;
    }

    node.left && dfs(node.left, num ^ (1 << node.left.val));
    node.right && dfs(node.right, num ^ (1 << node.right.val));
  };

  dfs(root, 0 ^ (1 << root.val)); // 0 异或 num = num;  num1 异或 num1 = 0; num1 异或 num2 = 1; // 相同为0，不同为1 // 1 异或 num1 = num1+1;

  return count;
}
