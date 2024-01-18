/***
 * leetcode:47
 * 给定一个可包含重复数字的序列，返回所有不重复的全排列。
 * [1,1,2]
 * [
    [1,1,2],
    [1,2,1],
    [2,1,1]
   ]
 */

/****
 * 思路：
 *  在每次循环遍历的时候，判断是否是两个相同的数字
 *  需要对数组进行排序
<<<<<<< HEAD:8-回溯/1-全排列2.js
 * 
<<<<<<< HEAD
 * 复杂度分析：
 */
function permuteUnique(nums){

}
=======
=======
 *
>>>>>>> 3bb86de (style: prettier format):回溯/1-全排列2.js
 *  上次判断 是否重复选值是用的indexOf 但是现在不可以了，因为元素非唯一
 * ==> 申请一个伴随usedArr，记录用了哪些元素. 记录用了的元素的下标
 *    如 usedArr[1] = 1; 表示 [1,1,3] 的 第二个1 在pathArr里用过了
 *          2,1,1
 *          / | \
 *        2   1  1(这个1不必要是重复的)
 *       / \
 *      1   1(这个1也是重复的)
 */
let arr = [1, 1, 2];
console.log(permuteUnique(arr));
function permuteUnique(nums) {
  let result = [],
    usedArr = new Array(nums.length).fill(0);
  nums.sort((a, b) => a - b);
  permuteUniqueCall(result, [], nums, usedArr);
  return result;
  function permuteUniqueCall(result, pathArr, nums, usedArr) {
    if (pathArr.length == nums.length) {
      result.push(pathArr);
    } else {
      for (let i = 0; i < nums.length; i++) {
        // 怎么在这里去重呢
        // if(i>0&&pathArr[i]==pathArr[i-1]) continue;
        //1.当前元素已经用过了 比如第一个1
        //2.当出现了连续两个相同的value时，第二个value只能当第一个value被用过的情况下才能被用
        //  补充成[1,1,x] 如果第一个没有被用会抛至上层 交给第一个用
        if (usedArr[i] || (i > 0 && nums[i] == nums[i - 1] && !usedArr[i - 1])) continue;
        let tempArr = pathArr.slice();
        tempArr.push(nums[i]);
        usedArr[i] = 1;
        permuteUniqueCall(result, tempArr, nums, usedArr);
        usedArr[i] = 0; // 递归结束开始下一个循环 当前i所指元素是未选的
      }
    }
  }
}

/*****
 *  if(usedArr[i] || i>0&&nums[i]==nums[i-1]&&!usedArr[i-1]) continue;
 * 辨析：
 * if(usedArr[i]) 是竖向下去的时候如果当前元素已经选择了 则不再选
 *   比如[1,1,2] 从[1,x,x]=>[1,1,x] 第一个1已经被选了 so 直接跳过
 *
 * if(i>0&&nums[i]==nums[i-1]&&!usedArr[i-1])
 * 当出现了连续两个相同的value时，第二个value只能当第一个value被用过的情况下才能被用
 * 补充成[1,1,x] 如果第一个没有被用会抛至上层 交给第一个用
 * 这个判断句辨析的是 从[1]=>[1,1]第二个1 与 [1]竖向完了之后回溯横向遍历遇到[1]
 *                  这两个同样循环里 nums[i-1] = nums[i]之间的差别
 *                  竖向的可以添加  横向的不能添加需要抛弃
 *          [1] [1] [2]
 *           /   |   \
 *         [1]  [1]
 *         /
 *      [1 1]
 */
<<<<<<< HEAD:8-回溯/1-全排列2.js
>>>>>>> refs/rewritten/restart-阶段2
=======
>>>>>>> 3bb86de (style: prettier format):回溯/1-全排列2.js
