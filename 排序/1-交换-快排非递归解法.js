/*****
 * 非递归实现快排
 * 利用栈记忆待排序的两个端点
 */

const swap = require('./swap');
let arr = [6, 3, 5, 9, 1, 4];
console.log(quickSort(arr));

function quickSort(arr) {
  if (arr == null || arr.length < 1) return [];
  let stack = [[0, arr.length - 1]];

  while (stack.length > 0) {
    const [lIndex, rIndex] = stack.pop();
    if (lIndex >= rIndex) continue;
    let p = partition(lIndex, rIndex);
    stack.push([lIndex, p - 1]);
    stack.push([p + 1, rIndex]);
  }
  return arr;
  // 基准归位扩大边界法-Lomuto划分
  function partition(l, r) {
    if (l > r) return;
    let pivot = arr[r],
      bounder = l - 1;

    for (let i = l; i <= r; i++) {
      if (arr[i] <= pivot) {
        bounder++;
        swap(arr, bounder, i);
      }
    }
    return bounder;
  }
}
