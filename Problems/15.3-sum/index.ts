export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const result: number[][] = [];
  const hash = new Set<string>();

  for (let i = 0; i < n; i++) {
    const picked = nums[i];
    // 不能直接跳过
    // 连续4个一样的跳过
    // [0, 0, 0, 0];
    // if (i >= 3 && nums[i] === nums[i - 1] && nums[i - 1] === nums[i - 2]) continue;
    const targetNums = twoSum(nums, i + 1, -picked);
    if (targetNums.length) {
      targetNums.forEach(targetRes => {
        const hashId = JSON.stringify(targetRes);
        if (!hash.has(hashId)) {
          result.push(targetRes);
          hash.add(hashId);
        }
      });
    }
  }

  return result;
  // return [...new Set(result)]; 矩阵去重

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
