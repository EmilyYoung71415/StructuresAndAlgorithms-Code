/*****
 * leetcode: 4
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 * 你可以假设 nums1 和 nums2 不会同时为空。
 */
// nums1 = [1, 3]
// nums2 = [2]
// 则中位数是 2.0

// nums1 = [1, 2]
// nums2 = [3, 4]
// 则中位数是 (2 + 3)/2 = 2.5


/********************************
 * 思路：
 *      way1、两个有序数组，合并后，再二分找中位数 m+n
 *      way2、两个有序数组 分别求中位数  ==> 当然是错的啦
 *      way3、n数组的中位数 即求 Math.floor((n+1)/2)  Math.floor((n+2)/2) 两个数之和/2 即为中位数
 *            长度为9的数组 中位数即为第5个
 *            巧妙的方法排除掉前4个元素
 *              获取第k个数，取两个数组中第k/2个数进行比较，
 *              如果比较小，就把这个数组的前k/2个元素全部剔除，依次循环，直到k为1或者有一个数组为空
 */
function findMedianSortedArrays(nums1, nums2) {
    let m = nums1.length;
    let n = nums2.length;
    
    let left = (m + n + 1) >> 1;
    let right = (m + n + 2) >> 1;
    
    return (
        findKMax(nums1, 0, nums1.length - 1, nums2, 0, nums2.length - 1, left)
    + findKMax(nums1, 0, nums1.length - 1, nums2, 0, nums2.length - 1, right)
    ) * 0.5;

    function findKMax(num1, start1, end1, num2, start2, end2, k) {
        let len1 = end1 - start1 + 1;
        let len2 = end2 - start2 + 1;
    
        // 保证num1的长度一定小于num2,这样确定num1为空，直接来取num2的第k个数
        if (len1 > len2) return findKMax(num2, start2, end2, num1, start1, end1, k);
        if (len1 === 0) return num2[start2 + k - 1];
    
        if (k === 1) return Math.min(num1[start1], num2[start2]);
        // 如果k/2比其中一个数组的长度还要大,取数组末尾元素即可
        let i = start1 + Math.min(len1, k >> 1) - 1;
        let j = start2 + Math.min(len2, k >> 1) - 1;
    
        if (num1[i] > num2[j]) {
            // 已经剔除j - start2 + 1个元素
            return findKMax(num1, start1, end1, num2, j + 1, end2, k - (j - start2 + 1));
        }
        else {
            // 已经剔除i - start1 + 1个元素
            return findKMax(num1, i + 1, end1, num2, start2, end2, k - (i - start1 + 1));
        }
    }
}