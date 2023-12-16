/****
 * leetcode:268
 * 给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
 *
 */
// 输入: [3,0,1]
// 输出: 2

// 输入: [9,6,4,2,3,5,7,0,1]
// 输出: 8

/********************************
 * 思路：
 *      申请一个长n+1的数组，arr[item] = 1 复杂度n
 *      遍历一次： arr站位
 *      遍历第二遍：找出异常元素
 */
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
function missingNumber(nums) {
  let arr = new Array(nums.length + 1);

  nums.forEach(item => {
    arr[item] = 1;
  });

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) return i;
  }

  return -1;
}

/****
 * way2 : 逆天的解法
 * 算应该有的总数 - 实际的总数 就是缺失的那个数
 */

function missingNumber(nums) {
  let n = nums.length;
  let sumAll = (n * (n + 1)) >> 1;

  let sumCur = nums.reduce((prev, cur) => prev + cur);

  return sumAll - sumCur;
}
