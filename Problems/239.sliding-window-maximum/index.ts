export function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length;
  const result: number[] = [];
  const dequeue: number[] = []; // 双端队列 并保持单调性

  for (let l = 0, r = 0; r < n; r++) {
    // 最值维持：单调递减, 单调栈, [8, 7, 2, 1] // 队首元素最大
    // dequeue 保存的是索引
    while (dequeue.length && nums[dequeue[dequeue.length - 1]] < nums[r]) {
      dequeue.pop();
    }

    dequeue.push(r);
    const windowSize = r - l + 1;
    if (windowSize === k) {
      result.push(nums[dequeue[0]]);
      if (dequeue[0] === l) {
        dequeue.shift();
      }
      l++;
    }
  }
  return result;
}
