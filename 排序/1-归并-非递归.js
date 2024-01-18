/**
 * @description 归并排序非递归解法 - 迭代
 * 思路：
 *     将数组中相邻元素两两配对，用merge函数将他们排序，
 *      组成n/2个长度为2的内部排好序的小数组段，
 *      然后自底向上 将他们排序成长度为4的子数组段
 *      重复往复，直至整个数组排好序  
 *   [6 5 3 1 7 2 4]
 *   两个为一组并排好序  5 6 1 3 2 7 4
 *   四个为一组排好序   1 3 5 6 2 4 7 
 *   8个合并           1 2 3 4 5 6 7
 */

function mergeSort(arr) {
    if (arr === null || arr.length < 2) {
        return;
    }

    let len = 1;
    while (len < arr.length) {
        for (let i = 0; i + len < arr.length; i += len * 2) {
            let left = i,
                right = i + 2 * len - 1,
                mid = i + len - 1;
            if (right > arr.length) {
                right = arr.length - 1;
            }
            merge(arr, left, mid, right);
        }
        len *= 2;
    }
}


function merge(arr, left, mid, right) {
    let
        temp = [],
        i = 0,
        p1 = left,
        p2 = mid + 1;
    while (p1 <= mid && p2 <= right) {
        temp[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    while (p1 <= mid) {
        temp[i++] = arr[p1++];
    }
    while (p2 <= right) {
        temp[i++] = arr[p2++];
    }
    for (let i = 0; i < temp.length; i++) {
        arr[left + i] = temp[i];
    }
}