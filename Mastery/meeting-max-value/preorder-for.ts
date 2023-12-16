// i参加:  dp[i]1 = value[i] + dp[j] // dp[j]指在参加会议i的情况下，往前选最近的可不重叠的会议j
// i不参加: dp[i]2 = dp[i-1];
// dp[i] = Max(dp[i]1, dp[i]2);
// 如何找到最近的会议j? 二分查找往前找（也可以挨个从后往前遍历 const j = findNearest(0, i - 1, checkFunc);
export function meetingMaxValue(nums: Array<[number, number]>, values: number[]): number {
  const len = nums.length;

  // 1. 先将会议按照endTime 递增排序
  nums.sort((meetingA, meetingB) => meetingA[1] - meetingB[1]);

  // 2. dp[i]表示的含义: 前i个会议，不重叠参加，所能得到的最大会议价值
  const dp = new Array(len).fill(0);

  // 3. base case
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

  for (let i = 1; i < len; i++) {
    // target = nums[i][0];
    // 在0 ~ i-1之间，找到最近的贴近 i会议startTime的
    const j = findNearest(0, i - 1, (mid: number) => nums[mid][1] <= nums[i][0]);
    const pick = values[i] + (j !== -1 ? dp[j] : 0);
    const pass = dp[i - 1];
    dp[i] = Math.max(pass, pick);
  }

  return dp[len - 1];
}
