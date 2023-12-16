// way better: hash: Map<num, index>
// const complement = sum = cur; return map.get(complement)
export function twoSum(arr: number[], target: number): number[] | null {
  const map = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(arr[i], i);
  }

  return null;
}

// 暴力法 N^2
function twoSum2(nums: number[], target: number): number[] | null {
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return null;
}
