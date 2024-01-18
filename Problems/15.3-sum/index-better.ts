export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const result: number[][] = [];

  for (let i = 0; i < n; i++) {
    const picked = nums[i];
    if (picked > 0) break; // 最小的都大于0，证明无解
    if (i > 0 && picked === nums[i - 1]) continue; // 去重

    // twoSums
    let [l, r] = [i + 1, n - 1];
    while (l < r) {
      const sum = picked + nums[l] + nums[r];
      if (sum > 0) {
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        // 需要继续缩小，直到相遇
        result.push([picked, nums[l], nums[r]]);
        l++;
        r--;

        // 加速跳过
        while (nums[l] === nums[l - 1] && l < r) {
          l++;
        }
      }
    }
  }

  return result;
}
