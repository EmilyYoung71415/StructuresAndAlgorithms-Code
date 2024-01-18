/***
 * leetcode:39
 * 
<<<<<<< HEAD
 * 
 */
=======
 * 给定一个无重复元素的数组 candidates(所有数为正整数) 和一个目标数 target ，
 * 找出 candidates 中所有可以使数字和为 target 的组合。
 * candidates 中的数字可以无限制重复被选取
 * 
 * candidates = [2,3,6,7], target = 7
 * [
    [7],
    [2,2,3]
   ]
 *****
 *难点： 还是在于去重上。数组元素是不重复的，但是值的选择都可以重复的
 *    [7,6,3,2]
 *       3     2
 *      /\    / \     
 *     2  3  3   2
 *    /     /     \  
 *   2     2       3
 * [3,2,2] [2,3,2] [2,2,3] 怎么去重
 * 存储：2:2,3:1 为一个集合标记用过与否？
 * 
 * ===>  3分支下去可以选择2，但是2分支下去不能再选择3了
 *          (因为2之后含3的方案已经包含在3的所有方案里了)
 *      翻译一下 就是 之前遍历过的元素不用再遍历了
 *      伴随变量：每次从哪里开始遍历，每一层的所有情况从哪里开始计数 
 */
let candidates = [2, 3, 6, 7],
  target = 7;
console.log(combinationSum(candidates, target));
function combinationSum(nums, target) {
  let result = [];
  nums.sort((a, b) => b - a);
  combinationSumCall([], target, 0);
  return result;

  function combinationSumCall(pathArr, remain, start) {
    if (remain < 0) return;
    else if (remain == 0) {
      result.push(pathArr);
    } else {
      for (let i = start; i < nums.length; i++) {
        let tempArr = pathArr.slice();
        tempArr.push(nums[i]);
        // i：当前元素可以重复
        combinationSumCall(tempArr, remain - nums[i], i);
      }
    }
<<<<<<< HEAD:8-回溯/1-组合总和.js
}
>>>>>>> refs/rewritten/restart-阶段2
=======
  }
}
>>>>>>> 3bb86de (style: prettier format):回溯/1-组合总和.js
