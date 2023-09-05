/*****
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格
 * 计算你所能获取的最大利润
 * leetcode:
 * [121]:最多只允许完成一笔交易（即买入和卖出一支股票）
 *
 * [122]:可以尽可能地完成更多的交易（多次买卖一支股票）
 *     不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）
 *
 * [123]:最多可以完成 两笔 交易
 *     不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）
 *
 * [188]:最多可以完成 k 笔交易
 *
 * [309]:买卖时间含有冷冻期
 *     1.不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）
 *     2.卖出股票后,你无法在第二天买入股票 (即冷冻期为 1 天)
 *
 * [714]:买卖含手续费
 *      购买了一个股票，在卖出它之前你就不能再继续购买股票了
 *      可以无限次地完成交易，但是你每次交易都需要付手续费
 *
 */

/*****
 * 思路:
 * 抽象一个算法思维解决全部问题，dp
 * ==> [122~188] 最多可以完成k笔交易,而309,714都是dp下的约束条件
 * 188.最多k笔交易
 *
 * exp:
 * [3,2,6,5,0,3], k = 2
 * 输出7
 *
 * 题目限制条件:
 * 1. 同时只能持有一支股票
 * ===> 当天要么持有股票 要么不持有股票。
 *      当天买入(没股票的前提下) or 卖出(有股票的前提下)
 * 2. 最多k次交易次数
 *
 * dp[i] 表示 到第i天 的最大利润
 * dp[i] = max{ dp[i-1] + a[i] // 卖出股票
 *              dp[i-1] - a[i] } // 买股票
 * // 但是不知道前一天是否有交易的资格，即卖出股票是否有股票
 * ==> dp[i][j] j={0,1} 表示 当前天是否持有股票
 * dp[i][j] ={
 *      dp[i][0] =  max{ dp[i-1][0] // 没有股票
 *                       dp[i-1][1] + a[i-1] }// 前一天有股票 卖出股票
 *      dp[i][1] =  max{ dp[i-1][0] - a[i-1] // 前一天没有股票 买入股票
 *                       dp[i-1][1] }
 * }
 *
 * 3. 但是呢，并不知道这次交易前交易过几次，是否满足不超过k次交易制约条件
 * dp[i][k][j]   k 表示当前天交易过多少次
 *  dp[i][k][0] = max{ dp[i-1][k][0] // 不动
 *                     dp[i-1][k-1][1] + a[i]
 *                   }
 *  dp[i][k][1] = max{ dp[i-1][k][0] - a[i]
 *                     dp[i-1][k][1]
 *                   }
 * 状态的变动情况:
 * dp[i][0][0]  交易0次不持有股票
 * dp[i][0][1]  当前持有股票，在此之前交易过0次
 * dp[i][1][0]  之前交易过一次，当前没有股票，即将dp[i-1][0][1]持有的股票卖了
 * dp[i][1][1]  之前交易过1次，此时持有股票，说明在dp[i-1][1][0]的时候入了股票
 * 除了买和卖带来的变化，当前天的股票状态可能来自变化，直接是昨天的股票情况
 *
 * 最后的结果值肯定在 max{dp[n-1][{0,...k}],0}里最后股票肯定是会被卖出去的
 */

// 123 最多交易两次
/***
 * dp[i][k][j]  
 *      j = {0,1}
 *      k = {0,1,2}
 * exp:
 *  Input: [3,3,5,0,0,3,1,4]
    Output: 6
 * 
 * 
 */
// console.log(maxProfit( [3,3,5,0,0,3,1,4]))
function maxProfit_123(prices) {
  if (prices.length < 1) return 0;
  let dp = [],
    n = prices.length;

  // 生成一个三维数组
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    for (let j = 0; j <= 2; j++) {
      dp[i][j] = [];
    }
  }

  // 初始化 到第0天的最大利润
  (dp[0][0][0] = 0), (dp[0][0][1] = -prices[0]);
  dp[0][1][0] = dp[0][1][1] = dp[0][2][0] = dp[0][2][0] = -Infinity;

  for (let i = 1; i < n; i++) {
    // 交易0次
    dp[i][0][0] = dp[i - 1][0][0];
    dp[i][0][1] = Math.max(dp[i - 1][0][1], dp[i - 1][0][0] - prices[i]);

    dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][0][1] + prices[i]);
    dp[i][1][1] = Math.max(dp[i - 1][1][1], dp[i - 1][1][0] - prices[i]);

    dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][1][1] + prices[i]);
  }
  return Math.max(dp[n - 1][0][0], dp[n - 1][1][0], dp[n - 1][2][0]);
}

/****
 * leetcode:121 最多买一次
 * 为什么j不再是 0 1 表示当前持有股票与否?
 * 也可以定义状态位 dp[i][k][j] k={0,1} j={0,1}
 * 一共对应状态 00;01;10;11; 但是11是不存在的，交易一次之后不会再买
 * 即对应三种状态:00:还没买，01买入并持有一只股票，10买了股票卖了
 * 
 * 所以可以kj变量确定的状态 
 * dp[i][j] j={0,1,2} 0：还没买股票。1：买入了一股股票还没卖 2.之前买了一股股票现在把他卖了
 * 
 * exp；
 *  Input: [7,1,5,3,6,4]
    Output: 5
 */
// console.log(maxProfit( [7,1,5,3,6,4]))
function maxProfit_121(prices) {
  if (prices == null || prices.length < 1) return 0;

  let dp = [],
    n = prices.length;
  for (let i = 0; i < n; i++) {
    dp[i] = [];
  }

  // 初始值
  (dp[0][0] = 0), (dp[0][1] = -prices[0]), (dp[0][2] = 0);

  let result = 0;
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0];
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i][2] = dp[i - 1][1] + prices[i];
    result = Math.max(result, dp[i][0], dp[i][1], dp[i][2]);
  }
  return result;
}

/****
 * dp[i][k][j] 到第i天 交易k次获得的最大利润
 * k = {0~k}
 * j = [0,1] 表示当前是否持有股票
 *
 * leetcode:188
 * exp:
 * [3,2,6,5,0,3], k = 2
 * output:7
 */
// console.log(maxProfit_188(2,[3,2,6,5,0,3]))
/*****
 * 空间超出限制了...
 * 通过测试209/211
 *
 * 改进: ✅
 * 1、k>prices.length/2,允许的交易次数超过天数的一半，则问题转换为122，即不限制交易次数
 * ==> 交易不能重叠 即同一天最多只能进行买/卖交易之一，所以对应k次交易，至少需要2*k天
 * ==> k>n/2 即可理解为不限制交易次数，尽可能多的交易，那么就转换为贪心
 */
function maxProfit_188(kn, prices) {
  if (kn == 0 || prices == null || prices.length < 1) return 0;

  let dp = [],
    n = prices.length;
  // 贪心
  if (kn >= n >> 1) {
    return greedy(prices);
  }

  // 生成三维矩阵
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    for (let k = 0; k <= kn; k++) {
      dp[i][k] = [];
    }
  }

  // 初始化
  (dp[0][0][0] = 0), (dp[0][0][1] = -prices[0]);
  for (let k = 1; k <= kn; k++) {
    dp[0][k][0] = dp[0][k][1] = -Infinity;
  }

  // 到第i天 dp[i][k][0]存放着最大利润
  let res = 0;
  for (let i = 1; i < n; i++) {
    // 交易了k次
    for (let k = 0; k <= kn; k++) {
      dp[i][k][0] = k > 0 ? Math.max(dp[i - 1][k][0], dp[i - 1][k - 1][1] + prices[i]) : dp[i - 1][k][0];
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k][0] - prices[i]);
      res = Math.max(res, dp[i][k][0], dp[i][k][1]);
    }
  }
  return res;

  function greedy(prices) {
    if (prices == null || prices.length < 1) return 0;
    let min = prices[0],
      sum = 0;

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > min) {
        sum += prices[i] - min;
      }
      min = prices[i];
    }
    return sum;
  }
}

/****
 * leetcode:122
 * 可以尽可能地完成更多的交易
 * [7,1,5,3,6,4] output:7
 * 主要思想：贪心
 *
 * 策略：买上升曲线的股票，在低谷时买 顶峰时买
 * 遍历一次记录当前最大和最小
 */
// console.log(maxProfit_122([7,6,4,3,1]))
function maxProfit_122(prices) {
  if (prices == null || prices.length < 1) return 0;
  let min = prices[0],
    sum = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > min) {
      sum += prices[i] - min;
    }
    min = prices[i];
  }
  return sum;
}
// dp 解答
function maxProfit_122(prices) {
  if (prices == null || prices.length < 1) return 0;
  let dp = [],
    n = prices.length;

  // 建立二维数组
  for (let i = 0; i < n; i++) {
    dp[i] = [];
  }

  // 初始化
  (dp[0][0] = 0), (dp[0][1] = -prices[0]);

  let res = 0;
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    res = Math.max(dp[i][0], dp[i][1]);
  }
  return res;
}

/*****
 * leetcode:309 含冷冻期
 * 辨析一下第121 最多买一次
 *
 * 在满足以下条件下尽可能多的完成交易
 * 1、不能同时参与多笔交易
 * 2、卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)
 *
 * exp:
 *  [1,2,3,0,2]
 *  3
 * 状态:[买入, 卖出, 冷冻期, 买入, 卖出]
 */
/****
 * 思路:
 * 1、因为是不限制交易次数，
 * ==> 简单贪心下 + 限制条件隔一天才能买
 *     [1,2,3,0,2] ==> 3-1=2 x
 *
 * 2、 局部最优
 * 动态规划
 * dp[i][j] 表示到第i天的利润，j={0,1,2} 表示买入、卖出、冷冻[卖出之后第二天是冷冻]
 * ==> 股票买入只能通过冷冻期 x 冷冻期存在一天。阻碍买与卖
 * ❎
 * 重新设计状态定义:
 * dp[i][j][m] 表示到第i天的利润，j={0.1} 表示是否持有股票，m={0,1}表示是否处于冷冻期
 * 可以，但是浪费一个变量:[j][m] = 01 不持有股票但是在冷冻期 x
 *      可以表示三个状态：0、没有股票 1、有股票但是正在冷冻期 2、有股票过了冷冻期
 * ==> 所以还是 j= {0,1,2}
 * // 0 1 表示现在是否持有股票 2=  true or false 表示 是否是冷冻期
 * 冷冻期开始: 买入一只股票
 * dp[i][2] = 0 or 1 记录当前天买的股票是否在冷冻
 * dp[0][0] = 0,dp[0][1] = -prices[i],dp[0][2] = 0
 * 最终结果:
 * dp[]\
 *
 * ===> ❌
 * dp[i][0] 截至第i天 最后一个操作是卖时的最大收益
 * dp[i][1] 截至第i天 最后一个操作是买时的最大收益
 * dp[i][2] 截至第i天 最后一个操作是冷冻时的最大收益
 *
 * dp[i][2] = dp[i-1][1]
 *
 * dp[0][0] = 0,dp[0][1]= -prices[i],dp[0][2] = -prices[i]
 * // 第i天卖出i-1的，或者是 等于前一天的(此时处于冷冻期 or 单纯不买)
 * dp[i][0] = max{dp[i-1][1]+prices[i],dp[i-1][0]}
 * dp[i][1] = max{dp[i-1][2]-prices[i],dp[i-1][1]}
 * dp[i][2] = dp[i-1][0]
 */
// console.log(maxProfit_309([1,2,3,0,2]));
function maxProfit_309(prices) {
  if (prices == null || prices.length < 1) return 0;
  let dp = [],
    n = prices.length;

  // 建立二维数组
  for (let i = 0; i < n; i++) {
    dp[i] = [];
  }

  // 初始化
  (dp[0][0] = 0), (dp[0][1] = -prices[0]), (dp[0][2] = 1);

  let res = 0;
  for (let i = 1; i < n; i++) {
    // 如果前一天是冷冻期 那么当前天就不是冷冻期
    dp[i][2] = dp[i - 1][2] == 1 ? 0 : dp[i - 1][2];
    dp[i][0] = dp[i][2] == 0 ? Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]) : dp[i - 1][0];
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    // 卖出了股票
    if (dp[i][1] == dp[i - 1][0] - prices) {
      dp[i + 1][2] = 1; // 进入冷冻期
    }
    res = Math.max(dp[i][0], dp[i][1]);
  }
  return res;
}

function maxProfit_309(prices) {
  if (prices == null || prices.length < 1) return 0;
  let dp = [],
    n = prices.length;

  // 建立二维数组
  for (let i = 0; i < n; i++) {
    dp[i] = [];
  }

  // 初始化
  (dp[0][0] = 0), (dp[0][1] = -prices[0]), (dp[0][2] = 0);

  let res = 0;
  for (let i = 1; i < n; i++) {
    // 当前没股票的收益: 1.不动  2.卖掉昨天的股票
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    // 当前有股票的收益；1.不动 2.昨天(解冻后)买入股票
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][2] - prices[i]);
    // dp[i][2] =  Math.max(dp[i-1][0],dp[i-1][1],dp[i-1][2]);
    dp[i][2] = dp[i - 1][0];
    res = Math.max(dp[i][0], dp[i][1]);
  }
  return res;
}

/*****
 * leetcode:714
 *
 * prices = [1, 3, 2, 8, 4, 9], fee = 2
 * 可以无限次交易费用，但是 每次交易需要支付手续费
 * 即每笔收益 =  max - min - fee
 * exp：
 * prices = [1, 3, 2, 8, 4, 9], fee = 2
 * 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
 */
console.log(maxProfit_714([1, 3, 2, 8, 4, 9], 2));
function maxProfit_714(prices, fee) {
  if (prices == null || prices.length < 1) return 0;
  let dp = [],
    n = prices.length;

  // 建立二维数组
  for (let i = 0; i < n; i++) {
    dp[i] = [];
  }

  // 初始化
  (dp[0][0] = 0), (dp[0][1] = -prices[0]);

  let res = 0;
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    res = Math.max(dp[i][0], dp[i][1]);
  }
  return res;
}
