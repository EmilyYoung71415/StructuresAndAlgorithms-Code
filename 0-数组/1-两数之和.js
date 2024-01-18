/***
 * https://leetcode-cn.com/problems/two-sum/
 * leetcode: 1
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
*/

// nums = [2, 7, 11, 15], target = 9
// [0, 1]
// 暴力法 N^2
function twoSum(nums, target) {
    let len = nums.length;
    for(let i = 0;i<len;i++) {
        for(let j=i+1;j<len;j++) {
            if (nums[i] + nums[j] === target) {
                return [i,j];
            }
        }
    }
    return [];
}

//  hash N
function twoSum(nums, target) {
    let map = new Map();
    for(let i = 0;i<nums.length;i++) {
        let item = nums[i];
        let partner = target - item;
        if(map.has(partner)){
            return [i, map.get(partner)];
        }
        map.set(item,i);
    }
    return [];
};
