// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

function subsets(nums: number[]): number[][] {
  const n = nums.length;
  const result: number[][] = [];
  const path: number[] = [];

  // [start, i)
  const dfs = (start: number) => {
    result.push(path.slice());

    for (let i = start; i < n; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };

  dfs(0);

  return result;
}
