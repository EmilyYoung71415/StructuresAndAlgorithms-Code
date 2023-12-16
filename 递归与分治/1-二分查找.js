/******
 * leetcode:704
 * n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * 假设所有元素都不重复
 *
 * 二分查找的关键思路:
 * 1、被查找对象有序
 * 2、每次取有序列中的中间值item ，target 与 中间值比较
 *  if target > item  , target在有序列中的右边
 *  if target < item  , target在有序列中的左边
 * 3、结束条件
 *     target == item
 * or  有序列遍历完毕
 */

let nums = [-1, 0, 3, 5, 9, 12],
  target = 2;
console.log(search(nums, target));
function search1(arr, target) {
  if (arr == null || arr.lenght < 1) return -1;

  let lIndex = 0,
    rIndex = arr.length - 1,
    mid = ((lIndex + rIndex) / 2) >> 0;

  while (lIndex <= rIndex) {
    if (target > arr[mid]) {
      lIndex = mid + 1;
    } else if (target < arr[mid]) {
      rIndex = mid - 1;
    } else {
      // 等于
      return mid; // 返回下标
    }
    mid = ((lIndex + rIndex) / 2) >> 0;
  }
  return -1;
}

// 递归
// 因为需要伴随变量：左右的index
function search(arr, target) {
  if (arr == null || arr.length < 1) return -1;
  return searchCall(0, arr.length - 1);

  // 每一层的return值：要么取决于下一层  要么是底层的return触底反弹；
  // 期间不需要对return的值进行累加 或者 结合 或者 变形 等加工处理
  function searchCall(lIndex, rIndex) {
    if (lIndex > rIndex) return -1; // 特殊return 底层的更底层
    let mid = ((lIndex + rIndex) / 2) >> 0;
    if (target > arr[mid]) {
      return searchCall(mid + 1, rIndex);
    } else if (target < arr[mid]) {
      return searchCall(lIndex, mid - 1);
    } else {
      return mid;
    }
  }
}
