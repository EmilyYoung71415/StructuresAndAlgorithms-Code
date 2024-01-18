export function meetingMaxValue(nums: Array<[number, number]>, values: number[]): number {
  const n = nums.length;
  const dp = new Array(n);
  nums.sort((a, b) => a[1] - b[1]);
  dp[0] = values[0];

  const findNearest = (l: number, r: number, checkFunc: (mid: number) => boolean): number => {
    while (l < r) {
      const mid = Math.ceil((l + r) / 2);
      if (checkFunc(mid)) {
        // nums[mid] <= target
        l = mid;
      } else {
        r = mid - 1;
      }
    }

    return checkFunc(l) ? l : -1;
  };

  const dfs = (x: number) => {
    if (dp[x] !== undefined) return dp[x];

    const j = findNearest(0, x - 1, m => nums[m][1] <= nums[x][0]);

    const pick = values[x] + (j !== -1 ? dfs(j) : 0);
    const pass = dfs(x - 1);
    return (dp[x] = Math.max(pass, pick));
  };

  return dfs(n - 1);
}
