/***
 * 找出数组的第k小元素
 * 思路:
 * way1:排序后取第k大元素 最快:nlogn
 * way2:小顶堆，每次堆顶是最小元素 复杂度：n+klogn
 * way3:基于快排的划分算法 复杂度:平均O(n)
 * 划分的时候pivot归位后的下标m 将数组划为[l,...m-1],[m+1,...,r]
 * 讨论k与m的关系
 *  k==m 找到了
 *  m<k 元素在 [l,...m-1]里 继续递归划分
 *
 */

const swap = require('./swap');
let arr = [1, -3, 2, 6, 4, 9, 0];

for (let i = 0; i < arr.length; i++) {
  console.log(kth_elem(arr, i));
}
// k以0计数 数组也是以0索引开始
function kth_elem(arr, k) {
  if (arr == null || arr.length < 1) return null;
  arr = arr.slice(); // 不改变原数组
  return kth_elemCal(0, arr.length - 1, k);

  function kth_elemCal(l, r, k) {
    if (k < 0 || r < l) return;
    if (r == l) return arr[r];
    let p = partition(arr, l, r);
    if (p == k) return arr[p];
    else if (k < p) return kth_elemCal(l, p - 1, k);
    else return kth_elemCal(p + 1, r, k);
  }

  function partition(arr, l, r) {
    // 每次以arr[r]作为基准值
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
