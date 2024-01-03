// 返回子数组的最小长度，该子数组的和大于等于 target
export function minSubArrayLen(target: number, nums: number[]): number {
  const n = nums.length;
  let [l, sum, minLen] = [0, 0, Infinity];

  for (let r = 0; r < n; r++) {
    sum += nums[r];

    // shrink window
    while (l <= r && sum >= target) {
      const curLen = r - l + 1;
      minLen = Math.min(minLen, curLen);
      sum -= nums[l];
      l++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
