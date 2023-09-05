/***
 * 剑指offer 《面试题53 - II. 0～n-1中缺失的数字》
 * https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/
 * 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。
 * 在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
 */

// 输入: [0,1,3]
// 输出: 2

// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8

/****
 * 思路：
 *      数组特征： arr[index] = index
 *      way1： 顺序遍历 O(n)
 *      way2:  二分
 * 数组分成两部分：
 *      左子数组：arr[index]  = index
 *      右子数组：arr[index] != index
 * 缺失的数字等于 “右子数组的首位元素” 对应的索引，即二分法找右子数组的首位元素
 * 疑问：
 *      [0,1,3,4,5] 按理会一直往右走吧
 *      ===》 和普通的二分不一样，这里的条件是 arr[mid] = mid
 */
let arr = [0, 1, 3, 4, 5];
console.log(missingNumber(arr));
function missingNumber(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = start + ((end - start) >> 1);
    if (arr[mid] === mid) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  // 返回缺失数字的值
  return start;
}
