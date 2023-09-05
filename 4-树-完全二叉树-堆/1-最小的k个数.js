/***
 * 剑指offer：40
 * https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
 *
 */

/********************************
 *  维护容量为k的容器，
 *      当容器内的元素个数<k时候，直接push数据，
 *      当容器满了又想塞入新数据时，找出容器内最大值  与 待塞入值比较，谁小谁进来
 *
 *      当容器满的时候，需要做的三件关键的事：
 *          1、k个数里找到最大数 ====> 大顶堆 O(1)
 *          2、在容器里删除最大数
 *          3、插入新的数
 *          删除 & 插入 O(logk)
 * 综上复杂度O(nlogk)
 * 优点： 适合 n很大，k很小的情景，在梳理海量数据面前有明显优势，找k大就只需要k容量的容器
 * ===>
 *      当需要在容器内频繁查找并替换最大值时，堆很适合
 */
/***
 * 其他方法：
 * way1： 排序后取前k个。nlogn
 * way2： 借鉴快排的partition函数，当partition矫正后的元素位于第k个，[xxx,第k大的数字,xxx]
 *        那么前k个大的元素也确定了 O(n)
 */
const { Heap } = require('./index.js');
function getLeastNumbers(arr, k) {
  // MaxHeap.add peek poll
  let heap = new Heap('max');

  arr.forEach(item => {
    if (heap.size < k) {
      head.add(item);
    } else {
      let curMax = heap.peek;
      if (curMax > item) {
        heap.poll();
        heap.add(item);
      }
    }
  });

  return heap.arr;
}
