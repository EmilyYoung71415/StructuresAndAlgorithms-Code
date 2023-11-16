export function findMode(root: TreeNode | null): number[] {
  let ans: number[] = [];
  let baseNum: number | null = null;
  let curCount: number = 0;
  let maxCount: number = 0;

  const updater = (num: number) => {
    if (baseNum === num) {
      curCount++;
    } else {
      // 新数字开始了
      curCount = 1;
      baseNum = num;
    }

    if (curCount === maxCount) {
      ans.push(baseNum);
    } else if (curCount > maxCount) {
      maxCount = curCount;
      ans = [baseNum];
    }
  };

  const dfs = (node: TreeNode) => {
    if (!node) return;
    dfs(node.left);
    updater(node.val);
    dfs(node.right);
  };

  dfs(root);

  // dfs中序遍历树
  return ans;
}
