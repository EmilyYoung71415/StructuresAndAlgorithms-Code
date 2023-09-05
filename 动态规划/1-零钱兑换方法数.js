/**
 * leetcode:518
 * 每种面值可以使用任意张
 * 求换钱方法
 *
 * exp:
 * arr = [5,10,25,1]  aim = 15
 * 15:
 *      5*3
 *      10+5
 *      15*1
 *      10+5*1
 *      5+5+5*1
 *      5*10+5
 * 六种
 *
 * amount = 3, coins = [2]
 * 0  只用面额2的硬币不能凑成总金额3。
 *
 */

/******
 * 硬币不限量
 *
 * 思路:十分类似 零钱兑换币种版
 * 1.递归，统计符合的个数
 *
 * 2.动态规划
 * dp[i][j] 只使用前i种硬币 凑成j元的方法数
 *
 * 递推公式:
 *    dp[i][j] = dp[i-1][j]  + dp[i][j-coins[i]] || dp[i-1][j];
 *
 * 3.dp
 * 一维数组 dp[i] 凑成i元的方法数
 * dp[0] = 1
 * dp[i] = {dp[j] + dp[j-coins[i]]}
 *
 */
let arr = [1, 2, 5],
  aim = 5;

console.log(change(aim, arr));

// way1
// 超出时间限制
function change1(amount, coins) {
  let sum = 0;
  changeCall(amount, 0);
  return sum;
  function changeCall(remain, start) {
    if (remain == 0) {
      sum++;
    } else if (remain < 0) {
      return;
    } else {
      for (let i = start; i < coins.length; i++) {
        changeCall(remain - coins[i], i);
      }
    }
  }
}

// way2
function change(amount, coins) {
  let dp = [],
    len = coins.length;

  coins.unshift(0);
  for (let i = 0; i <= len; i++) {
    dp[i] = [];
  }

  for (let i = 0; i <= len; i++) {
    for (let j = 0; j <= amount; j++) {
      if (i == 0) {
        dp[i][j] = 0;
      } else if (j == 0) {
        dp[i][j] = 1;
      }
      // else if(i==1){
      //     dp[i][j] = 1;
      // }
      else {
        dp[i][j] = j >= coins[i] ? dp[i - 1][j] + dp[i][j - coins[i]] : dp[i - 1][j];
      }
    }
  }
  return amount == 0 ? 1 : dp[len][amount];
}

// way2
// dp优化 使用一维数组
function change3(amount, coins) {
  let dp = new Array(amount + 1).fill(0);
  coins.unshift(0);
  dp[0] = 1; // 初始值是1 噢

  for (let i = 1; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] = dp[j] + dp[j - coins[i]];
    }
  }

  return dp[amount];
}
