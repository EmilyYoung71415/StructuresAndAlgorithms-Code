/***
 * 猿辅导的一面代码题
 * 有序含重复元素的数组里找目标元素，返回第一个目标元素出现的索引
 * 要求：时间复杂度小于O(n)
 * 思路：
 *      二分法
 *     + 递归的二分：找到第一个
 */

const arr = [2, 2, 2, 2, 2, 3, 3, 4, 5];
console.log(findTarget(arr, 2)); // 4

function findTarget(arr, target) {
  return findTargetCall(arr, target, 0, arr.length - 1);

  function findTargetCall(arr, target, left, right, isflag) {
    if (left > right) return -1; // 未找到
    // if (isflag && arr[left] < arr[right]) return left + 1;
    if (isflag) {
      if (left === 0 && arr[left] === target) return 0;
      else if (arr[left] < arr[right]) return left + 1;
    }
    let mid = (left + right) >> 1;
    if (arr[mid] > target) return findTargetCall(arr, target, left, mid - 1);
    else if (arr[mid] < target) return findTargetCall(arr, target, mid + 1, right);
    // else return mid;
    // 这里找到了 继续递归
    else return findTargetCall(arr, target, left, mid, true);
  }
}
