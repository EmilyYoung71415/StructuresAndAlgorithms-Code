/***
 * https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/
 * 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * 假设：k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。
 */
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]
// 解释:

//   滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

// 一共会输出 n-k+1 个数字
/****
 * 蛮力法
 * 随着数组的遍历，每次窗口push更新最新值，然后拿出窗口里的最大元素即可
 * 时间复杂度 O(kn)
 */
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
function maxSlidingWindow(nums, k) {
  if (!nums.length) return [];
  let stack = nums.slice(0, k); // 队列里存入滑动窗口里的所有数
  let result = [];
  for (let i = k; i <= nums.length; i++) {
    let max = Math.max.apply(null, stack);
    result.push(max);
    stack.shift();
    stack.push(nums[i]);
  }
  return result;
}

// 注意 [],0 的case

/*******
 *  way2： 队列 + 两个含最大值的栈
 *  O(n)的解法
 *  窗口看作队列，窗口向右滑动时 队列首元素被删除， 向左滑动时 队列末添加元素
 *  由含min函数的栈可知，该栈可以用O(1)时间得到最小值
 *  而队列而由两个栈实现
 *  ===> 代码过多 相当于解两道题了
 */

/*******
 *  way3：双端队列：存入的不是滑动窗口的每个数值，而是将可能成为最大值的数放入
 *        策略：
 *              cur > queue队末元素:  队首出队 保证队列里的元素是降序排列的，如果cur大于队列里的所有元素，队列元素依次出队
 *              cur < queue队末元素:  入队，因为有可能在队首元素出队后，cur元素变为最大的
 *              即 最大值 永远位于队列的头部
 *       由于队列两端均可能删除数字 即引入双端队列
 *
 * 双端队列： 存入的是数的下标 而不是数值
 *       这样可以根据下标判断当前元素是否在滑动窗口范围内
 */

function maxSlidingWindow(nums, k) {
  if (!nums.length) return [];
  let dqueue = [];
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    // dqueue里记录的最大值不在滑动窗口内
    if (dqueue.length && i - dqueue[0] >= k) {
      dqueue.shift();
    }

    // 从右到左清理dqueue里比cur小的值
    while (dqueue.length && nums[dqueue[dqueue.length - 1]] < nums[i]) {
      dqueue.pop();
    }

    // 记录的是下标 而不是值
    dqueue.push(i);

    // dqueue[0] 记录的是当前每次滑动窗口选择的最大值
    i - k + 1 >= 0 && result.push(nums[dqueue[0]]);
  }

  return result;
}
