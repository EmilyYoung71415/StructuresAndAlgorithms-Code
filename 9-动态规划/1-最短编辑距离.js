/*****
 * leetcode:72
 * 给定两个单词 word1 和 word2，
 * 计算出将 word1 转换成 word2 所使用的最少操作数
 * 
 * 你可以对一个单词进行如下三种操作：
    插入一个字符
    删除一个字符
    替换一个字符
 * 
 * word1 = "horse", word2 = "ros"
 * output:3
 *  horse -> rorse (将 'h' 替换为 'r')
    rorse -> rose (删除 'r')
    rose -> ros (删除 'e')
 * 
 */

/*****
 * 思路:
 * dp状态定义:dp[i][j] word1前i个字符变为 word2前j个字符的最短编辑距离
 *      表示 i:str_from的当前遍历小标,j:str_to的当前遍历下标
 * dp状态转换:
 *  dp[i][j] = dp[i-1][j-1] // if(word1[i]==word2[j])
 *    else insert del replace
 *    Math.min{dp[i-1][j],dp[i][j-1],dp[i-1][j-1]}   + 1
 *
 */

/****
 * 错误过的测试用例:
 * str1 = '',str2 = ''
 * output:0
 * str1 = 'a' str2 = ''
 * output:1
 */
let word1 = 'horse',
  word2 = 'ros';
console.log(minDistance(word1, word2));
function minDistance(word1, word2) {
  if (word1 == null || word2 == null) {
    return 0;
  }
  if (word1.length < 1 || word2.length < 1) {
    return word1.length < 1 ? word2.length : word1.length;
  }

  let len1 = word1.length,
    len2 = word2.length,
    dp = [];

  word1 = '0' + word1;
  word2 = '0' + word2;
  // 建立二维矩阵
  for (let i = 0; i <= len1; i++) {
    dp[i] = [];
  }

  // 初始化
  // word1 匹配 空字符 -- 全部删除
  for (let i = 0; i <= len1; i++) {
    dp[i][0] = i;
  }
  // word1 空字符 匹配 -- 插入
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (word1[i] == word2[j]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[len1][len2];
}
