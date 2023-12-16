/***
 * https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/
 * 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。
 * 在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
 *
 */

// 输入: [0,1,3]
// 输出: 2

/****
 * 思路：
 *      wraongway1：二分查找某个数
 *      该数在两头： start===0， end==n
 *      该数符合的特点是： cur= prev+2, target = prev+1;
 *      但是怎么控制二分的岔路？==> 还是退化成普通遍历
 *
 *      way2：
 *          数组划分为
 *              左子数组： nums[i] = i;
 *              右子数组:  nums[i] != i;
 *            if nums[mid] = mid ，则 “右子数组的首位元素” 一定在闭区间 [mid + 1, r] 中
 *            else 左子数组的末位元素” 一定在闭区间 [l, m - 1]中
 */
console.log(missingNumber([0, 1, 2, 3, 4, 5, 6, 7, 9]));
function missingNumber(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === mid) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return l;
}
