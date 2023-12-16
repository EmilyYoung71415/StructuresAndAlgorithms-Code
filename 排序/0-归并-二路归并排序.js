/****
 * 归并算法 典型的分支思想，两两划分直至最后只剩下一个元素
 * 然后 合并的时候 即是 两个有序链表的合并
 *
 * 空间：merge的时候辅助空间要占n个的单位
 * 稳定
 */

function mergeSort(arr) {
  if (arr === null || arr.length < 2) {
    return;
  }
  mergeSortCal(arr, 0, arr.length);
  arr.shift(); // 删除第一个undefined
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
  let temp = [],
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
