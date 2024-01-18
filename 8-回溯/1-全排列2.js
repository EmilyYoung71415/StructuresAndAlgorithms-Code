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
 * 
 *  上次判断 是否重复选值是用的indexOf 但是现在不可以了，因为元素非唯一
 * ==> 申请一个伴随usedArr，记录用了哪些元素. 记录用了的元素的下标
 *    如 usedArr[1] = 1; 表示 [1,1,3] 的 第二个1 在pathArr里用过了
 *          2,1,1
 *          / | \
 *        2   1  1(这个1不必要是重复的)
 *       / \  
 *      1   1(这个1也是重复的)
 */
let arr = [1,1,2];
console.log(permuteUnique(arr));
function permuteUnique(nums){
  let result = [],usedArr = new Array(nums.length).fill(0);
  nums.sort((a,b)=>a-b);
  permuteUniqueCall(result,[],nums,usedArr);
  return result;
  function permuteUniqueCall(result,pathArr,nums,usedArr){
    if(pathArr.length==nums.length){
      result.push(pathArr)
    }else{
      for(let i=0;i<nums.length;i++){
        // 怎么在这里去重呢
        // if(i>0&&pathArr[i]==pathArr[i-1]) continue;
        //1.当前元素已经用过了 比如第一个1
        //2、排序之后 连着的第二个元素相同，且第一个元素被用过
        if(usedArr[i] || i>0&&nums[i]==nums[i-1]&&!usedArr[i-1]) continue;
        let tempArr = pathArr.slice()
        tempArr.push(nums[i]);
        usedArr[i] = 1;
        permuteUniqueCall(result,tempArr,nums,usedArr);
        usedArr[i] = 0;// 递归结束开始下一个循环 当前i所指元素是未选的
      }
    }
  }
}