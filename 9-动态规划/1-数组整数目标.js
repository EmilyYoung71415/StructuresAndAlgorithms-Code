/**
 *
 * 如数组[3,2,7,9,11] aim=11
 * 问是否能从数组中选择任意多的数累加得到11
 *
 * 穷举所有办法：
 * 0个一组、1个一组、2个一组、3个一组、4个一组
 * 其实就是 数组中的每个数就俩状态:0 1 选中和未被选中
 * ==> 从第0位开始，二叉树分支，要与不要
 */
let testArr = [3, 4];
//console.log(moneyproblem(testArr,11))
function moneyproblem(arr, aim) {
  return process(arr, 0, 0, aim);

  // 在0-arr.length上选择数
  // i表示遍历到i时，对当前arr[i]是否进行选择的操作
  // 此时的sum是前i个数中已选择数的sum
  function process(arr, i, sum, aim) {
    if (sum === aim) {
      return true;
    }
    if (i === arr.length) {
      return false;
    }
    return process(arr, i + 1, sum, aim) || process(arr, i + 1, sum + arr[i], aim);
  }
}

/**
 * 如[3,2,7] aim=11例子
 * 抛开递归，改为动态规划
 * 关键是找到依赖关系
 * 1、变量 i、sum // 二维矩阵
 * 2、确定变量范围
 *      i：即数组长度约制
 *    sum: 给定数组的总和约制 0-sum
 * 3、期待所得：dp[0][0]  因为调用return process(arr,0,0,aim)嘛
 * 3、base-case:
 *      if(i===arr.length) return false
 *      if(sum === aim) return true;
 *  即确定矩阵最后一行
 *      i\sum 0 1 2 3 4 5 6 7 8 9 10 11 12
 *      0
 *      1
 *      2
 *      3     F F ....................T..F
 * 4、找普通格子的依赖关系：
 *       return process(arr,i+1,sum,aim)|| process(arr,i+1,sum+arr[i],aim);
 *      一个普通格子的true / false
 *      来源于他下面的格子和 下面格子中隔了旁边arr[i]个
 *
 */

let res = moneyproblem([3, 2, 4, 7], 11);
console.log(res);
function moneyproblem(arr, aim) {
  let row = arr.length + 1; //i
  let Dp = []; //  由true/false组成
  // 初始化二维矩阵
  for (let i = 0; i < row; i++) {
    Dp[i] = [];
  }

  // 依据basecase
  for (let i = 0; i < row; i++) {
    Dp[i][aim] = true;
  }

  // 找到依赖开始推
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = aim - 1; j >= 0; j--) {
      Dp[i][j] = Dp[i + 1][j]; // 由底向上推
      if (j + arr[i] <= aim) {
        Dp[i][j] = Dp[i][j] || Dp[i + 1][j + arr[i]];
      }
    }
  }

  if (!Dp[0][0]) {
    return false;
  }
  return true;
}
