/****
 * https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
 * 
 * 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
 * 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
 * 请找出数组中任意一个重复的数字。
 */

// 输入：
// [2, 3, 1, 0, 2, 5, 3]
// 输出：2 或 3

/****
 * 思路：
 *      way1、hash 存
 *      way2、排序、前面的与后面的元素相等
 */

// way1
function findRepeatNumber(nums) {
    let hash = {};
    for (let i = 0; i < nums.length;i++) {
        if (hash[nums[i]]) {
            return nums[i];
        }
        hash[nums[i]] = 1;
    }
    return null;
}

// way2
function findRepeatNumber(nums) {
    nums = nums.sort((a,b)=>a-b);
    
    for (let i=1;i<nums.length;i++) {
        if(nums[i] === nums[i-1]) {
            return nums[i];
        }
    }
    return null;
}