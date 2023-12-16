/*****
 * 插入排序之二分插入
 *
 * 改进 插入的过程，不再一个个比较 而是 在已排好序的元素中二分查找
 * 找到正确的位置
 *
 */
let arr = [1, 2, 3, 4, 5, 7, 8, 9, 6];
console.log(insertionSortDichotomy(arr));
function insertionSortDichotomy(arr) {
  if (arr === null || arr.length < 2) {
    return;
  }
  for (let i = 1; i < arr.length; i++) {
    // i 从1开始表示每次新的元素
    // 二分法查找左边的已排好序的数 与新元素比较
    let temp = arr[i],
      left = 0,
      right = i - 1;
    while (left <= right) {
      let mid = ~~((left + right) / 2);
      if (arr[mid] > temp) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // 将欲插入新牌位置右边的牌整体向右移动一个单位
    for (let j = i - 1; j >= right + 1; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = temp;
  }
}
