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
 * 随着数组的遍历，每次窗口push更新最新值，然后拿出窗口里的最大元素即可
 * 时间复杂度 O(n)
 */
maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3);
function maxSlidingWindow(nums, k) {
    if (!nums.length) return [];
    let stack = nums.slice(0,k);
    let result = [];
    for(let i=k; i<=nums.length; i++) {
        let max = Math.max.apply(null, stack);
        result.push(max);
        stack.shift();
        stack.push(nums[i]);
    }
    return result;
}

// 注意 [],0 的case
