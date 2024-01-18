// a target value, return the index

// 二分查找是基于有序数组的, 相对于顺序查找的O(N)复杂度，二分LogN
// binarySearch is based on sorted arr, it's complexity is logN compared to On

export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 递归
export function binarySearchRecursive(arr: number[], target: number) {
  return binarySearchRecursiveCall(arr, target, 0, arr.length - 1);

  function binarySearchRecursiveCall(arr: number[], target: number, left: number, right: number) {
    if (left > right) return -1;
    const mid = (left + right) >> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) return binarySearchRecursiveCall(arr, target, mid + 1, right);
    return binarySearchRecursiveCall(arr, target, left, mid - 1);
  }
}
