/*****
 * 零钱兑换:322
 *
 * 给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 每种硬币的数量是无限
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 * exp:
 * coins = [1, 2, 5], amount = 11 (11 = 5 + 5 + 1)
 * 输出3
 *
 * coins = [2], amount = 3
 * out:-1
 */

/*****
 * 思路:
 * 1.贪心?优先选择尽量多的大面额
 * => x 比如 amount = 6, coins=[1,3,4] 4+1+1 > 3+3
 *
 * 2.递归枚举所有可能的组合，然后选择硬币数最少的
 *   可重复选择硬币，用start标记选择的起始避免重复
 *
 * 3.dp
 * 状态定义:dp[i][j] 是只用前i种币种 凑成j元需要的最少币种
 * // 是不是有点像背包?
 * 递推方程:
 *      // 1.不用当前币种 2.用当前币种
 *      dp[i][j] = min{dp[i-1][j],dp[i][j-w[i]]+1}
 * 二维，从左上走到右下的过程
 *
 * 4.dp改进
 * 状态定义:dp[i] 凑成i元最少需要的张数
 * [1,2,5] 可使用的面额，问题转换为 类似与爬梯子，一次能走 1、2、5步
 *
 * 状态转换：dp[i] = min{i-coins[j]} + 1
 *
 */

/***
 * [470,18,66,301,403,112,360],8235
 * 超出时间限制
 * 通过93/182
 */

console.log(coinChange([1, 2, 5], 11));

// way2
function coinChange2(coins, amount) {
  let minCount = Infinity;
  coinChangeCall(amount, 0, 0);
  return minCount == Infinity ? -1 : minCount;
  function coinChangeCall(remain, start, sum) {
    if (remain == 0) {
      minCount = sum < minCount ? sum : minCount;
    }
    // 失败的
    if (remain < 0 || start > coins.length - 1) {
      return;
    } else {
      for (let i = start; i < coins.length; i++) {
        coinChangeCall(remain - coins[i], i, sum + 1);
      }
    }
  }
}

// way3:
/****
 *
 * 出错的例子
 * [2,5,10,1] 47
 * =>4
 *
 * 注意：
 *  1.当无法找零的时候 使用maxcount代替 而不是 0
 *   比如第一行的 j<coins[i]的情况
 *
 *  2.当普通行 j<coins[i]的时候 应该有娄底
 *    且娄底值是上一行数据 dp[i-1][j] 而不是 maxcount or 0
 *
 *  该种解法 由于第一行的初始，必须预排序
 */
function coinChange3(coins, amount) {
  let dp = [],
    len = coins.length,
    MAX_COUNT = amount + 1;
  if (amount == 0) return 0;
  coins.sort((a, b) => a - b);
  coins.unshift(0);
  for (let i = 0; i <= len; i++) {
    dp[i] = [];
  }

  for (let i = 0; i <= len; i++) {
    for (let j = 0; j <= amount; j++) {
      // if(i==0||j==0||j<coins[i]){
      if (i == 0 || j == 0) {
        dp[i][j] = 0;
      }
      // 第一行
      else if (i == 1) {
        dp[i][j] = j % coins[i] == 0 && j >= coins[i] ? j / coins[i] : MAX_COUNT;
      }
      // 如果当前j<coin[i]
      else {
        dp[i][j] = j >= coins[i] ? Math.min(dp[i - 1][j], dp[i][j - coins[i]] + 1) : dp[i - 1][j];
      }
    }
  }
  return dp[len][amount] > amount ? -1 : dp[len][amount];
}

// way4
function coinChange4(coins, amount) {
  let maxCount = amount + 1;
  let dp = new Array(amount + 1).fill(maxCount);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}
