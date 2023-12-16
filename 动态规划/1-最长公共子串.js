/***
 * 最长公共子串
 *  str1 = '1AB2345CD'
 *  str2 = '12345EF'
 * 那么最长公共子串: 2345
 * 即 要求是不能断开的
 *
 */

/****
 * 先求dp矩阵，然后依据dp矩阵 反向求出最长公共子序列
 * 状态定义：dp[i][j]表示str1[0...i-1]与str2[0...j-1]的最长公共子序列长度
 * 状态初始: dp[i][0] = 0 || 1(str1[i]==str2[0]);
 *          dp[0][j] 同上
 *
 * 状态转移:
 *          dp[i][j] = dp[i-1][j-1]+1 // str1[i]==str2[j]
 *              or
 *                   = 0
 *
 */
let str1 = '1AB2345CD',
  str2 = '12345EF';
console.log(Lcs(str1, str2));
function Lcs(str1, str2) {
  if (str1 == null || str2 == null || str1.length < 1 || str2.length < 1) {
    return '';
  }
  let dp = getDp(str1, str2);
  let res = getLcs(dp, str1, str2);
  return res;
}

function getDp(str1, str2) {
  let len1 = str1.length,
    len2 = str2.length,
    dp = [];

  for (let i = 0; i < len1; i++) {
    dp[i] = [];
  }

  for (let i = 0; i < len1; i++) {
    dp[i][0] = str1[i] == str2[0] ? 1 : 0;
  }

  for (let j = 0; j < len2; j++) {
    dp[0][j] = str1[0] == str2[j] ? 1 : 0;
  }

  // 普通元素
  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      if (str1[i] == str2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return dp;
}

function getLcs(dp, str1, str2) {
  let maxCount = 0,
    endIndex = 0;
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (dp[i][j] > maxCount) {
        maxCount = dp[i][j];
        endIndex = i;
      }
    }
  }
  return str1.substring(endIndex - maxCount + 1, endIndex + 1);
}
