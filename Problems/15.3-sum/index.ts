export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const result: number[][] = [];
  // const hash = new Set<string>();

  for (let i = 0; i < n; i++) {
    const picked = nums[i];
    if (picked > 0) break; // 最小的都大于0，证明无解
    if (i > 0 && picked === nums[i - 1]) continue; // 去重
    const targetNums = twoSum(nums, i + 1, -picked);
    if (targetNums.length) {
      targetNums.forEach(targetRes => {
        result.push(targetRes);
      });
    }
  }

  return result;

  // 从start里开始找，找到相加和等于target的两个数
  // 有可能是多个解
  function twoSum(nums: number[], start: number, target: number): [number, number, number][] {
    let [l, r] = [start, n - 1];
    const result: [number, number, number][] = [];

    while (l < r) {
      const sum = nums[l] + nums[r];
      if (sum === target) {
        result.push([-target, nums[l], nums[r]]);
        l++;
        r--;
      } else if (sum < target) {
        l++;
      } else {
        r--;
      }
    }

    return result;
  }
}
