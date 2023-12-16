/****
 * 已知一个背包称重max_w,有n种物品可以选择,
 * 每种物品的重量和价值分别为wi,vi,如果每种物品
 * 可以选择多个,怎么选择物品使得背包价值最大?
 * 物品不能拆分,价值、重量等都是正整数
 *
 * exp:
 * n = 4,max_w = 10
 * w = [2,3,4,7]
 * v = [1,3,5,9]
 *
 * output:[0,1,0,1],12
 *
 */

/****
 * 建模:
 * 解<x1,x2,x3,x4..>表示第i种物品装入背包的个数
 * 目标函数  求和vixi(i=1 to n)
 * 约束条件  求和wixi(i=1 to n)<=max_w
 *
 * 子问题界定:f(i,j)放进称重为j的背包中的前i个物品中最优方案的价值
 * 子问题计算顺序:
 *                  i= 1,2,3,4,5...
 *      对于给定的i，j=1，2，3，4...
 *
 * 递推方程:形成的矩阵是最优子集的产生的价值
 *      f(i,j) = max{f(i-1,j),f(i,j-wi)+vi}
 *
 *      1.不选择第i件物品，所以由前i-1个物品决定
 *      2.包含第i件物品，但是i件物品可以不止选一样
 * 初始值:
 *      f(0,y)= 0; f(x,0)=0;
 *      f(1,y)= ~~(y/w1)*v1 // 能装的个数 x 价值
 *
 * 标记函数: 用于还原最优子集的组成元素
 *      mark(i,j)装前i种物品，总重不超过j，背包达到最大价值时装入物品的最大标号
 *  way1:
 *      mark(i,j) = mark(i-1,j)// 没有装入第i件物品 f[i-1][j]>f[i][j-w[i]]+v[i]
 *              or  i //装入了i    f[i-1][j]<f[i][j-w[i]]+v[i]
 *
 *      // 初始值: 当只有第一种物品的时候
 *      mark(1,y) = 0,// y<w1
 *              or  1 // y>=w1
 *
 *  way2: 上下比较 如果f[i][j]<f[i-1][j] 那么j肯定是带来了新变化
 */

/******
 * 状态矩阵
 * 
 * 标记函数
 *  [     0  1  2  3  4  5  6  7  8  9 10
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        [ 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2 ],
        [ 0, 0, 1, 2, 3, 3, 2, 3, 3, 3, 3 ],
        [ 0, 0, 1, 2, 3, 3, 2, 4, 3, 3, 4 ] 
    ]
 */
let w = [2, 3, 4, 7],
  v = [1, 3, 5, 9],
  max_w = 10;
console.log(knapSack(4, w, v, max_w));

function knapSack(n, w, v, max_w) {
  let f = [];

  w.unshift(0);
  v.unshift(0);

  for (let i = 0; i <= n; i++) {
    f[i] = [];
  }

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= max_w; j++) {
      if (i == 0 || j == 0) {
        f[i][j] = 0;
      } else if (j >= w[i]) {
        f[i][j] = Math.max(f[i - 1][j], f[i][j - w[i]] + v[i]);
      } else {
        f[i][j] = f[i - 1][j];
      }
    }
  }

  let mark = getMark(f, n, max_w);
  // 追踪标记表mark 得到[x1,x2,x3,x4..]n种物品的装入量
  let result = trackSolution(mark, n, max_w);

  return [result, f[n][max_w]];

  function getMark(f, n, max_w) {
    let mark = [];

    for (let i = 0; i <= n; i++) {
      mark[i] = [];
    }

    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= max_w; j++) {
        if (i == 0 || j == 0) {
          mark[i][j] = 0;
        }
        // 第一种物品初始化 如果j>w1 则当前最新物品为物品1
        else if (i == 1) {
          mark[i][j] = j >= w[i] ? 1 : 0;
        } else {
          if (f[i][j] > f[i - 1][j]) {
            mark[i][j] = i;
          } else {
            mark[i][j] = mark[i - 1][j];
          }
        }
      }
    }
    return mark;
  }

  function trackSolution(mark, n, max_w) {
    let result = new Array(n + 1).fill(0);
    let i = n,
      j = max_w; // i指向最大物品标号默认是n，j是当前承重
    while (mark[i][j] != 0 && j >= 0) {
      i = mark[i][j];
      result[i] = 1;
      j = j - w[i];
      // 如果标号最大还是i 那么i号物品还可以继续装
      while (mark[i][j] == i) {
        j = j - w[i];
        result[i] += 1;
      }
    }
    result.shift(); // 去掉result首元素-占位的
    return result;
  }
}
