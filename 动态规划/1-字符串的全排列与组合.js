/**
 * 全组合：
 *     'ABCD' 4个中选择 2个组合，求组合方式
 *      ==-> AB\AC\AD\BC\BD\CD
 * 演化:
 *      不重复数值的组合问题:可以从里面选择1、2、3、4个字符串 依次求组合数
 *      ABCD：
 *          A\B\C\D\
 *          AB\AC\AD\BC\BD\CD
 *          ABC\ABD\BCD\ACD
 *          ABCD
 *      思路：
 *          一个字符串所有组合包含三种情况：
 *          1、仅包含首字母
 *          2、选择首字母，剩余字符继续求组合
 *          3、不选择首字母，其余字符求组合
 *      所有组合[]
 *      是集合 这三种情况 [].concat(res1-arr,res2.arr,res3-arr);
 */

//  let res = getCombine('ABCD');
//  console.log(res.length);
function getCombine(str) {
  if (str.length == 1) {
    return [str];
  }

  let arr1 = getCombine(str.slice(1)); // 传入 除了当前字符的
  let res0 = arr1; // 剩余字符
  let res1 = arr1.map(x => str[0] + x); //首字母 + 剩余字符
  let res2 = [str[0]]; // 仅首字母
  return res0.concat(res1, res2);
}

/****
 * 全排列问题：
 *      ABC
 *      打乱顺序 A(3,3)=6*2=6
 *      abc,acb,bac,bca,cab,cba
 *
 * 思路：
 *     a+剩余字母组合值
 *     b+剩余字母组合值
 *     c+剩余字母组合值
 *     ...
 */
// let str = 'ABCD'
// let res = getPerputation(str);
function getPerputation(str) {
  if (str.length == 1) {
    return [str];
  }

  let res = [];
  for (let i = 0; i < str.length; i++) {
    let restStr = str.slice(0, i) + str.slice(i + 1);
    let restArr = getPerputation(restStr);
    restArr = restArr.map(x => str[i] + x);
    res = res.concat(restArr);
  }
  return res;
}

/****
 * 不重复字符串的排列组合
 *
 * 如 ABCD
 * ==->
 *      4个元素'
 *          ABCD: ACDB\ABDC\...
 *          ABC: CBA\ACB\CAB...
 *          AB\BC\AC:..
 * 思路：
 *      先求组合数，然后对每个组合数进行全排列
 */

// let test = 'ABC';
// getComAndPer(test);
function getComAndPer(str) {
  let comArr = getCombine(str);

  let resArr = [];
  for (let i = 0; i < comArr.length; i++) {
    let curPerArr = getPerputation(comArr[i]);
    resArr = resArr.concat(curPerArr);
  }
  return resArr;
}

/*****
 * 补充
 *      扩展： 求 A(5,3)=5*4*3
 *              C(5,3)=5*4*3/3*2*1
 *                6,2 = 6*5/2*1
 * 组合数：
 *      1、暴力求解
 *
 */
getC(5, 3);
function getC(m, n) {
  let res = 1;
  // 分母
  for (let i = m; i >= m - n + 1; i--) {
    res *= i;
  }

  // 依次除以 2*1

  while (n) {
    res /= n;
    n--;
  }
  return res;
}

// 法2： C(n,m)=C(n-1,m-1)+C(n-1,m)
// 要么选 、要么不选
// let res = getC2(6,2);
// console.log(res)
function getC2(m, n) {
  if (n == 0 || m == n || m == 1 || m == 0) {
    return 1;
  }
  return getC2(m - 1, n) + getC2(m - 1, n - 1);
}

/**
 * 将其转换为 dp
 *  C(n,k)=C(n-1,k)+C(n-1,k-1)
 *  F(n)=F(n-1)+F(n-2)
 *   及其类似，只是这里的k变为了0
 *
 * 即
 *  变量： m、n
 *      第一列： 从x中选择0个的选择方法数：1
 *      第一行：从0中选择x个 方法数：1
 *      第i，j行： C(n,k)=C(n-1,k)+C(n-1,k-1)
 *      解释： 对于第n个元素，要么选，要么不选
 *          如果选，则只需在剩下的n-1个元素再选 k-1个
 *          不选，就在剩下的n-1个元素选k个
 *
 *
 *      解释： 到达当前行： 1、上方格子向下走、2、左边的格子向右走
 *       组合数类比：
 *          一个4X5的方格组，也就是一行5个格子，有4行，最开始你站在最左上角，
 *          你可以向下或向右一步，问有几种方法来到达最右下角。
 *
 *          高中思想：走７步，但是需要　３步向下、４步向有
 *          所以问题转化为　７步里选３步向下　其余的向右
 *
 *      i\j 0 1 2 3
 *      0
 *      1
 *      2
 *
 */

let res = getC3(5, 2); // 5*4/2=10
console.log(res);
function getC3(m, n) {
  let dp = [];
  // 初始化dp数组
  /**
   * m or n 等于 0 结果都是 1 即 矩阵是从第0行0列开始的，且值都是1
   * 当 m 为1即 分母为1时 结果也是1
   * 此外的特殊值：m = n
   */

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][0] = 1; // 第0列
  }

  // 第0行 第1行的初始化 (其实第0行初始都多余了)
  for (let j = 1; j <= n; j++) {
    dp[0][j] = 1;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (j < i) {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];
      } else if (j > i) {
        // 从i个选择j个 i<j 没有意义
        dp[i][j] = 0;
      } else {
        // 相等
        dp[i][j] = 1;
      }
    }
  }
  // console.log(dp)
  return dp[m][n];
}

/****
 * 扩展：
 *      大数相乘
 *
 *      最大公约数、最小公倍数
 *
 *
 *      组合数： 划分数、多重组合数？
 *
 *      感觉打开了新世界。。。
 *      大多数的dp推导公式 都是从组合数这里来的貌似
 *
 *
 *      求组合数 联想到了 杨辉三角 和 求两个字符串的最长公共子序列
 */
