/**
 *  @desc 二分查找
 *  二分查找是基于有序数组的
 *  基本思想：优先与数组的中间元素比较，如果等于中间元素则直接返回，否则取半递归查找
 *  相对于顺序查找的O(N)复杂度，二分Logn
 * 
 *  注意点：
 *      1、边界的判断  start = 0, end = arr.length -1 则  while (start <= end) [start, end]
 *      2、目标值重复：leetcode 34
 */

function binarySearch(arr, target) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = (end + start) >> 1;
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }

    return -1;
}


function binarySearch(arr, target) {
    return binarySearchCall(arr, target, 0, arr.length - 1);

    function binarySearchCall(arr, target, start, end) {
        if (start > end) return -1;
        let mid = (end + start) >> 1;
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) return binarySearchCall(arr, target, mid + 1, end);
        return binarySearchCall(arr, target, start, mid - 1);
    }
}

console.log(binarySearch([1, 2, 3, 4, 6, 10, 20], 10));