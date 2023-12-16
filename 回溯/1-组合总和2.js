/****
 * leetcode:40
 * 给定一个数组 candidates 和一个目标数 target ，
 * 找出 candidates 中所有可以使数字和为 target 的组合
 * 所有数是正整数
 * 
 * candidates 中的每个数字在每个组合中只能使用一次
 * 
 * 辨析：
 *      与组合总和1正好反过来了。
 * 组合总和1：数组元素全部唯一，但是元素可以重复使用
 * 组合总和2：数组元素不唯一，且元素只能使用一次
 * 
 * exp:
 * candidates = [10,1,2,7,6,1,5], target = 8,
 * 
 * [
    [1, 7],
    [1, 2, 5],
    [2, 6],
    [1, 1, 6]
   ]
 * 
 * 
 */

/******
 *  思路:
 * 1、避免重复，还是 遍历过的不会再遍历，====>伴随变量start
 * 2、元素不能重复使用 ====> 伴随变量used
 * ==> 维护一个used变量，记录哪些元素使用过的
 *   比如 targetArr =  [5,2,1,1] 凑成 [5,1,1]的过程需要标注两个1依次被用过了
 *       同样，1,1挨着但是第一个1已经使用过了并且他们在同一层上，
 *            那么第二个1不需要再验证了
 *
 **/
let candidates = [10, 1, 2, 7, 6, 1, 5],
  target = 8;
console.log(combinationSum2(candidates, target));
function combinationSum21(nums, target) {
  let result = [];
  nums.sort((a, b) => b - a);
  combinationSum2Call([], target, [], 0);
  return result;

  function combinationSum2Call(pathArr, remain, usedArr, start) {
    if (remain < 0) return;
    if (remain == 0) {
      result.push(pathArr);
    } else {
      for (let i = start; i < nums.length; i++) {
        if (usedArr[i] || (i > 0 && !usedArr[i - 1] && nums[i] == nums[i - 1])) continue;
        let tempArr = pathArr.slice();
        tempArr.push(nums[i]);
        usedArr[i] = 1;
        combinationSum2Call(tempArr, remain - nums[i], usedArr, i + 1);
        usedArr[i] = 0;
      }
    }
  }
}

/****
 * 优化
 * 其实记录 used 和 记录的当层遍历的开始start 两个功能有点重叠
 */

function combinationSum2(nums, target) {
  let result = [];
  nums.sort((a, b) => a - b);
  combinationSum2Call([], target, 0);
  return result;

  function combinationSum2Call(pathArr, remain, start) {
    if (remain < 0) return;
    if (remain == 0) {
      result.push(pathArr);
    } else {
      for (let i = start; i < nums.length; i++) {
        // 遇到了相同的元素
        if (i > start && nums[i - 1] == nums[i]) continue;
        let tempArr = pathArr.slice();
        tempArr.push(nums[i]);
        combinationSum2Call(tempArr, remain - nums[i], i + 1);
      }
    }
  }
}
