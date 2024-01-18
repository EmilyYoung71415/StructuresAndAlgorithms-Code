/***
 * 小和:每个数的小和为左边比它小的数的数值累加总和
 *
 *      4 1 3 5 0 6
 * 4: 0; 1:0; 3:1; 5:4+1+3=8; 0:0; 6:4+1+3+5=13;
 * 总和：13+8+1=22
 *
 * 思考：
 *    解法1：暴力遍历，每次遍历到当值就收集其左边的所有比它小的数的总和
 *           复杂度：n + n-1 + n-2 + n-3 + n-4 + ......  =O(n^2)
 *    解法2：归并排序。
 *          每个合并时计算最小和，最小和 = 左边子合并时的最小和 + 右边子合并时的最小和 + 左右分支合并时的最小和
 *          每次合并时；
 *              如最后一次合并  1 3 4 | 0 5 6
 *              1 3 4 最小和 1
 *              0 5 6 最小和为5
 *              现在考虑左右合并时的最小和：
 *              1： 右边5、6 ==》 1*2 =2
 *              3： 右边5 、6 ==》 3*2=6
 *              4： 右边 5、6 ===》 4*2 = 8
 *              即合并最小和 = 2+ 6 +8 = 16
 *              全部最小和 = 16 + 1 +5 = 22
 *          复杂度：基于归并排序改进，只需在合并merge里求值
 */

function smallSum(arr) {
  if (arr === null || arr.length < 2) {
    return 0;
  }
  let result = mergeSortCal(arr, 0, arr.length - 1);
  return result;

  function mergeSortCal(arr, left, right) {
    if (left == right) {
      return 0;
    }

    let mid = left + ((right - left) >> 1); // 位运算效率大于符号运算
    return mergeSortCal(arr, left, mid) + mergeSortCal(arr, mid + 1, right) + merge(arr, left, mid, right);
  }

  function merge(arr, left, mid, right) {
    let temp = [],
      i = 0,
      p1 = left,
      p2 = mid + 1,
      res = 0;
    while (p1 <= mid && p2 <= right) {
      //  right - p2 + 1 即右边比左边大的数的个数
      res += arr[p1] < arr[p2] ? (right - p2 + 1) * arr[p1] : 0;
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
    return res;
  }
}
