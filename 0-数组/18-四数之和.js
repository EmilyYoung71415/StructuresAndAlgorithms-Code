/***
 * https://leetcode-cn.com/problems/4sum/
 * leetcode: 18
 * 给定一个包含 n 个整数的数组nums，判断 nums 中是否存在四个元素a，b，c，d ，
 * 使得 a + b + c + d = 0 ？找出所有满足条件且不重复的四元组。
 * 注意：答案中不可以包含重复的四元组。
 */

// nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// return [
//     [-1,  0, 0, 1],
//     [-2, -1, 1, 2],
//     [-2,  0, 0, 2]
// ]

/**
 * 思路：
 *      像三数之和那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。
 */

function fourSum(nums, target) {
  if (len < 4) return [];
  nums.sort((a, b) => a - b);
  let result = [];
  let len = nums.length;

  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = len - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
        }
        if (sum <= target) {
          while (nums[left] === nums[++left]);
        } else {
          while (nums[right] === nums[--right]);
        }
      }
    }
  }
  return result;
}
