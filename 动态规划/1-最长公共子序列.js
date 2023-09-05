/****
 * 最长公共子序列
 * 在两个字符串序列中以相同顺序出现，但[不要求连续]（非字符串子串）的字符串序列
 *
 * exp:
 *  str1="1A2B3C",str2="B1D23CA" LCS="123C"
 */

/***
 * 思维转变:
 * 从尾向首看,
 * if(xm == yn) 那么当前元素一定在最长子序列里
 *      接下来找  {x0,x1,....,xm-1}
 *           与  {y0,y1,....,yn-1}
 *      LCS{xn-1,ym-1}
 *
 * if(xm != yn) 那么在  {x0,x1,....,xm-1} 与 {y0,y1,....,yn}
 *                  or  {x0,x1,....,xm} 与 {y0,y1,....,yn-1}里
 *
 *      LCS{xn-1,ym} || LCS{xn,ym-1}
 *
 * 先求dp矩阵，然后依据dp矩阵 反向求出最长公共子序列
 * 状态定义：dp[i][j]表示str1[0...i-1]与str2[0...j-1]的最长公共子序列长度
 * 状态初始: dp[i][0] = 0 || 1(一旦 str1[i]==str2[0] i之后的都是1了);
 *          dp[0][j] 同上
 *
 * 状态转移:
 *          dp[i][j] = dp[i-1][j-1]+1 // str1[i]==str2[j]
 *              or
 *                   = max{dp[i-1][j],dp[i][j-1]}
 *
 */
let str1 = '1A2B3C',
  str2 = 'B1D23CA';
console.log(LCS(str1, str2));
function LCS(str1, str2) {
  if (str1 == null || str2 == null || str1.length < 1 || str2.length < 1) {
    return '';
  }

  let dp = getdp(str1, str2);
  let result = getLcs(dp, str1, str2);
  return result;
}

function getdp(str1, str2) {
  let len1 = str1.length,
    len2 = str2.length,
    dp = [];

  // 建立二维矩阵
  for (let i = 0; i < len1; i++) {
    dp[i] = [];
  }

  // 初始化
  dp[0][0] = str1[0] == str2[0] ? 1 : 0;

  for (let i = 1; i < len1; i++) {
    // dp[i][0] = dp[i-1][0]==1?1:(str1[i]==str2[0]?1:0);
    dp[i][0] = Math.max(dp[i - 1][0], str1[i] === str2[0] ? 1 : 0);
  }

  for (let j = 1; j < len2; j++) {
    dp[0][j] = Math.max(dp[0][j - 1], str2[j] === str1[0] ? 1 : 0);
  }

  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      if (str1[i] == str2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

function getLcs(dp, str1, str2) {
  if (!Array.isArray(dp) || !Array.isArray(dp[0])) return '';
  let row = str1.length - 1,
    col = str2.length - 1,
    len = dp[row - 1][col - 1], // LCS的最大长度
    res = '';
  while (len >= 0) {
    if (col > 0 && dp[row][col] == dp[row][col - 1]) {
      col--;
    } else if (row > 0 && dp[row][col] == dp[row - 1][col]) {
      row--;
    } else {
    /**     3
     *   3  4
     * 此时 row col指向的元素相同
     */
      res = str1[row] + res; // 前插
      row--;
      col--;
      len--; //确定了一个
    }
  }
  return res;
}
