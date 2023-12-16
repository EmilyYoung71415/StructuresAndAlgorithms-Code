/****
 * leetcode:152 Maximum Product Subarray
 *
 * 找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）
 * 要求序列是连续的
 *
 * exp:
 * [2,3,-2,4] output:6 子数组 [2,3] 有最大乘积 6
 * [-2,0,-1] output:0  结果不能为 2, 因为 [-2,-1] 不是子数组。
 *
 */

/****
 * 思路:
 * way1、递归，对于每个数可以是选的可以是不选的，即找出数组的全组合
 * way2、dp
 * 尝试1：x
 *      状态定义: dp[i] 表示以当前arr[i]结尾的最长子序列乘积
 *      状态结果:因为不一定最大乘积里 arr[n-1]是一定在的 即 max{dp[0]..dp[n-1]}
 *      状态转移:dp[i] = dp[i-1]*arr[i]
 *      ==> 但是当前元素可能是负数 如果是正数: preMax *arr[i] √
 *                               如果是负数: |负数的最小值| * arr[i]
 *      所以我们dp[i]的时候需要知道dp[i-1]记录的0~i-1的最大乘积 和最小乘积
 *      ==> 二维
 * 尝试2: √
 *      状态定义: dp[i] 表示当前arr[i]结尾的最长子序列乘积
 *      状态转移: dp[i][j] j={0,1} dp[i][0]以arr[i]结尾的最大乘积,dp[i][1]最小乘积
 *         dp[i][0] = dp[i-1][0]*arr[i] // arr[i]>=0
 *                    dp[i-1][1]*arr[i] // arr[i]<0
 *
 *         dp[i][1] = dp[i-1][1]*arr[i] // arr[i]>=0
 *                    dp[i-1][0]*arr[i] // arr[i]<0
 */
console.log(maxProduct([-3, 0, -4]));
// way3
function maxProduct2(nums) {
  if (nums == null || nums.length < 1) return 0;
  let len = nums.length,
    dp = new Array(len);

  // 生成一个二维数组
  for (let i = 0; i < len; i++) {
    dp[i] = [];
  }

  dp[0][0] = dp[0][1] = nums[0];
  let result = nums[0];
  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]);
    dp[i][1] = Math.min(dp[i - 1][0] * nums[i], dp[i - 1][1] * nums[i], nums[i]);
    result = Math.max(result, dp[i][0]);
  }
  return result;
}
// way3:优化
// 空间压缩:因为是 n*2矩阵 所以滚动方向是从左到右 申请长n的一维数组
// i循环里的dp[j] 表示原dp里的第i行的数据,dp[j]表示第i行 第j列的数据
function maxProduct2(nums) {
  if (nums == null || nums.length < 1) return 0;
  let len = nums.length,
    dp = new Array(2); // dp[0] dp[1]

  // 初始化
  dp[0] = dp[1] = nums[0];

  let res = nums[0];
  for (let i = 1; i < len; i++) {
    let max = dp[0],
      min = dp[1];
    dp[0] = Math.max(max * nums[i], min * nums[i], nums[i]);
    dp[1] = Math.min(max * nums[i], min * nums[i], nums[i]);
    res = Math.max(res, dp[0]);
  }
  return res;
}

// way1: 选择 不选择
/***
 * 错误过的测试数据
 * [2,3,-2,4]
 * output:24
 * expected:6
 *
 * [-3,-4]
 * output:-3
 *
 * 超时
 * 179 / 184
 *
 */
function maxProduct1(nums) {
  if (nums == null || nums.length < 1) return 0;
  let res = nums[0];
  // maxProductCall(nums,0,1);
  maxProductCall(nums, 1, res);

  return res;
  function maxProductCall(arr, start, curRes) {
    res = Math.max(curRes, res);
    // 递归终点
    if (start > arr.length - 1) {
      return;
    }
    maxProductCall(arr, start + 1, curRes * arr[start]); // 选择
    maxProductCall(arr, start + 1, arr[start]); // 不选
  }
}
