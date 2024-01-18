/***
 * leetcode 154 与 剑指offer 《面试题11. 旋转数组的最小数字》一致
 * https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 * 找出旋转点
 * 注意数组中可能存在重复的元素。
 */

// 输入: [2,2,2,0,1]
// 输出: 0

// [1,1]
/****
 * 思路：
 *      相较于1来说: 允许重复？
 * 
 * 
 */
// console.log(findMin([1,1]));
// console.log(findMin([2,2,2,0,1]));
// console.log(findMin([10, 1, 10, 10, 10]));
// 在1的基础上微整
// ❌ 185 / 192
function findMin(nums) {
    let start = 0;
    let end = nums.length - 1;
    // 无旋转
    if (nums.length === 1 || nums[end] > nums[0]) return nums[0];

    while (start < end) {
        let mid = start + ((end - start) >> 1);
        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }
        if (nums[mid] < nums[mid - 1]) {
            return nums[mid];
        }

        // 旋转点在右边 缩短左边界
        // [10,1,10,10,10] 这个case失败了 return 10
        // 因为 mid=2 nums[2] >== nums[0] start = 3 这样就跳过了 实际旋转点在的位置
        if (nums[mid] >= nums[0]) {
            start = mid + 1;
        }
        // 旋转点：mid 及其之前的元素
        else {
            end = mid;
        }
    }

    return nums[start];
}


// way2:
/***
 *  修改的点：将nums[mid]与右边界元素(nums[end])相比较
 *  二分查找算法的难点在于如何更新左右边界指针。
 *  
 *  允许数组中元素重复会影响算法的时间复杂度嘛？为什么会影响？怎么影响的？
 *      ==> 因为可能包含重复数字，在 nums[pivot] == nums[high] 分支下才会导致最差时间复杂度为 O(N)
 *          时间复杂度：平均logn 最差的时候 退化为O(n)
 *  解法参考：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/solution/xun-zhao-xuan-zhuan-pai-xu-shu-zu-zhong-de-zui-1-8/
 */

function findMin(nums) {
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        let mid = start + ((end - start) >> 1);

        if (nums[mid] < nums[end]) {
            end = mid;
            // end = mid -1 过于激进 case [3,1,3]
        }
        else if (nums[mid] > nums[end]) {
            start = mid + 1;
        }
        else if (nums[mid] === nums[end]) {
            end--;
        }
    }

    return nums[start];
}