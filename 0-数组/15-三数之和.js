/***
 * https://leetcode-cn.com/problems/3sum/
 * leetcode: 15
 * 给你一个包含 n 个整数的数组 nums，
 * 判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 答案中不可以包含重复的三元组。
 */

// nums = [-1, 0, 1, 2, -1, -4]，
// return [
//     [-1, 0, 1],
//     [-1, -1, 2]
// ]

/**
 * 思路： 排序后使用大小指针从两头不断逼近
 */
function threeSum(nums){
    nums = nums.sort((a,b)=>a-b)// 实际上sort是改变了原数组的
    let result = []
    let len = nums.length;
    for(let i=0; i<len-2; i++){
        if(nums[i] > 0) break;// 如果最小的都大于0
        // 跳过重复数字
        if(i > 0 && nums[i]==nums[i-1]) continue;
        let l = i+1;
        let r = len-1;
        while(l < r){
            let sum = nums[i] + nums[l] + nums[r];
            if(sum < 0) l++;
            else if(sum > 0) r--;
            else{
                result.push([nums[i],nums[l],nums[r]]);
                // 如果紧邻也相等的要跳过不然要重复
                while(l < r && nums[l] == nums[l+1]) l++;
                while(l < r&&nums[r] == nums[r-1]) r--;
                l++;
                r--;
            }
        }   
    }
    return result;
}