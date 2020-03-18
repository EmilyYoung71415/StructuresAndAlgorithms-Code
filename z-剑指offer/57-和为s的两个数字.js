/****
 * https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/
 * 输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。
 */

// 输入：nums = [2,7,11,15], target = 9
// 输出：[2,7] 或者 [7,2]

/***
 * 思路：
 *      数组递增、排序
 *      很像leetcode的第一题【两数之和】，
 *      但此题数组为有序，可以使用使用大小指针求解，不断逼近结果，最后取得最终值。
 */

function twoSum(array, sum) {
    if (array==null || array.length==0) return [];
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        const s = array[left] + array[right];
        if (s > sum) {
            right--;
        } 
        else if (s < sum) {
            left++;
        } 
        else {
            return [array[left], array[right]]
        }
    }
    return [];
}
