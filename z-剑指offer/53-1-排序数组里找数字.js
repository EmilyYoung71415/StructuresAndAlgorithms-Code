/***
 * https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
 * 统计一个数字在排序数组中出现的次数。
 * 
 */

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2


/****
 * 思路：
 *      way1： 顺序遍历, 遇到+1 ==> 时间复杂度N， 且没有利用到有序的这个特点
 *      way2： 二分：找出左边界、右边界 然后相减
 *              若 nums[mid] =target ，则右边界在闭区间 [mid+1, r]中；左边界[l, mid-1]
 *              右边界是从左边开始找的, 左边界从右开始找
 */
function search(nums, target) { 
    let l = 0;
    let r = nums.length-1;

    // 右边界
    while(l <= r) {
        let mid = l + Math.floor((r-l)/2);
        if (nums[mid] <= target) {
            l = mid + 1;
        }
        else {
            r = mid - 1;
        }
    }

    let right = l;
    l = 0; 
    r = nums.length - 1;

    while(l <= r) {
        let mid = l + Math.floor((r-l)/2);
        if (nums[mid] >= target) {
            r = mid - 1;
        }
        else {
            l = mid + 1;
        }
    }

    let left = r;
    return right - left - 1;
};