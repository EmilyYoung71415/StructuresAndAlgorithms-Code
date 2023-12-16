/***
 * leetcode 34 与 剑指offer的 《面试题53 - I. 在排序数组中查找数字1》 一致
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
 * 题目:
 *      统计一个数字在有序数组里出现的次数
 *
 * or 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 *
 */

// input：nums = [5,7,7,8,8,10], target = 8
// output: 2

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: [3,4]
/***
 * 思路：
 *      本质都是找到相同元素的左右边界
 *      该题即拆分为在普通二分的基础上拆分为： 寻找左侧边界的二分查找 & 寻找右侧边界的二分查找
 *
 * 普通二分里
 *       nums = [1,2,2,2,3]，target = 2 返回的索引是 2 即优先最中间的那个索引值
 * 左边界：
 *      [start, end)
 *      while(start < end) => 终止时start==end 此时区间为 [start, end) 空数组
 *          nums[mid] < target：start = mid+1
 *          nums[mid] > target: end = mid (而不是 mid - 1)
 *                              因为左闭右开的两个区间  [start, mid) 或 [mid + 1, end)
 *          nums[mid] = target: end = mid
 *                              找到 target 时不立即返回，而是缩小「搜索区间」的end: end = mid
 *                              在区间 [start, mid) 中继续搜索，即不断向左收缩
 * 右边界：
 *      [start, end)
 *      while(start < end) => 终止时start==end 此时区间为 [start, end) 空数组
 *      start = mid+1
 *      end = mid
 *      nums[mid] = target: end = mid
 *                          当 nums[mid] == target 时不要立即返回
 *                          收紧左侧边界以锁定右侧边界
 *                          最后无论返回 left 还是 right，必须减一
 *                              ===> while 循环结束时，nums[left] 一定不等于 target 了，而 nums[left - 1] 可能是 target。
 */

function searchRange(nums, target) {
  return [boundLeft(nums, target), boundRight(nums, target)];
  // 计算个数
  // if (boundRight(nums, target) ===-1 || boundLeft(nums, target) === -1) return 0;
  // return boundRight(nums, target) - boundLeft(nums, target) + 1;
  function boundLeft(nums, target) {
    if (nums.length === 0) return -1;
    let start = 0;
    let end = nums.length;

    while (start < end) {
      let mid = (start + end) >> 1;
      if (nums[mid] < target) {
        start = mid + 1;
      } else if (nums[mid] > target) {
        end = mid;
      } else if (nums[mid] === target) {
        end = mid;
      }
    }

    return nums[start] === target ? start : -1;
  }

  function boundRight(nums, target) {
    if (nums.length === 0) return -1;
    let start = 0;
    let end = nums.length;

    while (start < end) {
      let mid = (start + end) >> 1;
      if (nums[mid] < target) {
        start = mid + 1;
      } else if (nums[mid] > target) {
        end = mid;
      } else if (nums[mid] === target) {
        start = mid + 1;
      }
    }
    return nums[start - 1] === target ? start - 1 : -1;
  }
}
