/******************************************
股票最大收益
抛售一次，（最大收益的区间值只有一个
example:
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
******************************************/

/****
 * time: 30mins 81.33%
 * 思路：
 *  就是一个遍历数组的过程中，拾捡数的过程
 *  当前数是负数时不能轻易抛弃有可能后面还有更大的数(潜力股)
 * 
 *  什么时候抛弃呢？
 *  当前数 curSum + cur < cur 即留着之前的积累还不如不要 重新开始
 *  && cur>curSum
 *  -1 -2 
 *  什么时候及时止损呢？
 *  比如[4,-1,2,1]遇到了后面的[-5,4]
 *  ==-> 反正是记住sum 不考虑队列
 *       所以来个sum比较就好了
 */
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
function maxSubArray1(nums) {
    //let sum = Number.NEGATIVE_INFINITY;
    let maxSum = nums[0];
    let curSum = nums[0];

    for(let i=1;i<nums.length;i++){
        // 抛弃之前的数
        if(curSum<0&&curSum<nums[i]){
            curSum  = nums[i];
        }else{
            // 4 -1 -1 3 怎么在遇见3之前保持最大数为4 且 在遇到3之时能加上 -1 -1 
            // 新加个一个变量记录 curSum 与 实际maxSum 区分开  
            curSum += nums[i];
        }
        maxSum = curSum>maxSum?curSum:maxSum;
    }
    return maxSum;
};

/***
 * 优化
 */

function maxSubArray(nums) {
    //let sum = Number.NEGATIVE_INFINITY;
    let maxSum = nums[0];
    let curSum = nums[0];

    // 【特殊情况】 当数组长度为0时

    for(let i=1;i<nums.length;i++){
        // if(curSum<0&&curSum<nums[i]){
        //     curSum  = nums[i];
        // }else{
        //     curSum += nums[i];
        // }
        curSum = Math.max(nums[i],nums[i]+curSum);// 这种更直接一些
        //maxSum = curSum>maxSum?curSum:maxSum;
        maxSum = Math.max(curSum,maxSum);
    }
    return maxSum;
};