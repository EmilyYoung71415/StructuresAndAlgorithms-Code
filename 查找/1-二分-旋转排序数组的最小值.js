/***
 * leetcode 153
 * https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/description/
 * 
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 * 找出旋转点
 * 假设数组中不存在重复元素。
 */

// 输入: [3,4,5,1,2]
// 输出: 1

// 输入: [4,5,6,7,0,1,2]
// 输出: 0

/*****
 * 思路:
 *      设旋转点x 则数组分成两个部分 [>x, x + <x]
 *      相比普通二分的改动是 arr[index] === target => arr[index] < arr[index-1] && arr[index] > arr[index+1]
 * 
 *      特殊点：index-1非法：旋转点为队首
 *             index+1非法  旋转点为队尾 相当于没旋转
 */
console.log(findMin([4,5,6,7,0,1,2]));
function findMin(nums) {
    let start = 0;
    let end = nums.length - 1;
    // 无旋转
    if (nums.length === 1 || nums[end] > nums[0]) return nums[0];

    while (start <= end) {
        let mid = start + ((end - start) >> 1);
        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }
        if (nums[mid] < nums[mid - 1]) {
            return nums[mid];
        }

        // 旋转点在右边 缩短左边界
        if (nums[mid] > nums[0]) {
            start = mid + 1;
        }
        // 旋转点：mid 及其之前的元素
        else {
            end = mid;
        }
    }

    return -1;
}