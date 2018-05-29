/**
 * @desc 归并排序
 * 基本思想：
 *         分而治之，即判断一整块数的排序很难，但是我可以不断迭代得到最后两两的组合
 *         排好序的两个数再依次和另外两个相合并
 * 重点：
 *      递归的base case 出口
 *      master公式估约递归的复杂度
 * 时间复杂度   最优O(N*logN)  最差O(N*logN)  平均O(N*logN) 
 * 空间  O(N+logN)
 * 稳定  实现可以做到稳定性
 */

function mergeSort(arr) {
    if (arr === null || arr.length < 2) {
        return;
    }
    mergeSortCal(arr, 0, arr.length);
    arr.shift();// 删除第一个undefined
}

function mergeSortCal(arr, left, right) {
    if (left === right) {
        return;
    }
    let mid = left + ((right - left) >> 1); // 位运算效率大于符号运算
    mergeSortCal(arr, left, mid);
    mergeSortCal(arr, mid + 1, right);
    // 合并
    merge(arr, left, mid, right);
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



