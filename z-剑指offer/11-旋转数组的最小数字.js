/***
 * https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
 * 数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  
 * 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素
 */

// 输入：[3,4,5,1,2]
// 输出：1

/***
 * 思路：
 *      和 53-2类似，将数组划分成两部分
 *      寻找旋转数组的最小元素即为寻找 右排序数组 的首个元素
 *      性质：左边排序数组的任意元素 > 右边排序数组的任意元素
 *       numbers[m] > numbers[j]时： mm 一定在 左排序数组 中，x在 []
 */
function minArrayminArray(nums) {
    let l = 0;   
    let r = nums.length;
    
    while(l < r) {
        let mid = l + Math.floor((r-l)/2);
        if (nums[mid] > numbers[r]) {
            l = mid + 1;
        }
        else if (nums[mid] > numbers[r]) {
            r = mid - 1;
        }
        // 相等时 无法判断 旋转点在哪个区间，
        // j=j−1 只需证明每次执行此操作后，旋转点 x 仍在 [i, j]区间内即可
        // 两数相等，删掉最后这个不会影响影响结果正确性，还能减少搜索空间
        else {
            r -= 1;
        }
    }
    return nums[l];
}