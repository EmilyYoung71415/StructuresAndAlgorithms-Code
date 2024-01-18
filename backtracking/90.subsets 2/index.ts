export function subsetsWithDup(nums: number[]): number[][] {
  const n = nums.length;
  const res: number[][] = [];
  const path: number[] = [];
  nums.sort();

  const dfs = (i: number) => {
    res.push(path.slice());
    for (let j = i; j < n; j++) {
      if (nums[j] === nums[j - 1] && j - 1 >= i) continue;

      path.push(nums[j]);
      dfs(j + 1);
      path.pop();
    }
  };

  dfs(0);
  return res;
}
