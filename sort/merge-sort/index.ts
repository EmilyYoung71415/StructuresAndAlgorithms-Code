export function mergeSort(arr: number[], left: number = 0, right: number = arr.length - 1) {
  if (left >= right) return arr;
  const mid = (left + right) >> 1;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
  return arr;
}

// 合并两个有序数组：arr(left, mid - 1) arr(mid + 1, right)
// 结果：将arr: left-right区间的数排列整齐了
function merge(arr: number[], left: number, mid: number, right: number) {
  const tempArr: number[] = [];
  let tempI = 0;
  let p1 = left;
  let p2 = mid + 1;

  while (p1 <= mid && p2 <= right) {
    tempArr[tempI++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }

  // 将剩余的拼接
  while (p1 <= mid) {
    tempArr[tempI++] = arr[p1++];
  }

  while (p2 <= right) {
    tempArr[tempI++] = arr[p2++];
  }

  // 将temp的数据 遍历挨个替换arr的
  for (let i = 0; i < tempArr.length; i++) {
    arr[left + i] = tempArr[i];
  }

  return arr;
}
