/****
 * 原型: f(n) = f(n-1) + f(n-2)
 * 变形：
 * 1、爬楼梯,每次只能走2或者1步
 * ===> 见爬楼梯
 * 2、农场奶牛母牛每年生一头小母牛，永远不会死。第一年农场一只成熟的母牛
 *    第二年开始，母牛开始生小母牛。每只小母牛3年之后可以生小小母牛。
 *    求n年之后的牛数量(咳咳不考虑是否存在公牛交配的问题)
 *
 * 斐波拉契数列求解:
 * 1、递归法 O(2^n)
 *      --- 实现简单但是复杂度指数级别增长(重复计算太多)
 * 1.5 缓存 申请一个数组存放每一个f的值
 *
 * 2、正推法 O(n)
 *      --- 每一个新的f(n)，是前两个旧的f(n-1)和f(n-2)之和
 *             for循环 从 f(0),f(1)...算到f(n)
 *      其实也就是dp的思想
 *      dp的状态定义 f(n)到达第n阶的总走法
 *      dp的递推方法: f(n) = f(n-1) + f(n-2)
 * 3、通项公式-- 由递推公式得出
 *       若f(n) = f(n-1) + f(n-2)
 *       f(n)=(1/√5)*{[(1+√5)/2]^n -[(1-√5)/2]^n}
 *       f(n) = a^n + b^n
 *  ===> 幂乘问题: 最优解法：logn
 * 4、矩阵定理
 *   |F(n),F(n-1) |= |F(n-1),F(n-2)|*{{1,1},{1,0}}
 *                 = |F(2),F(1)|*({{1,1},{1,0}})^(n-2)
 */

/*****
 * 奶牛:
 * 1:1
 * 2:1+1=2
 * 3:2+1=3
 * 4:3+1=4 = 3+1
 * 5:4+1+1=6 = 4+2
 * 6:6+1+1+1=9 = 6+3
 * f(n) = f(n-1) + f(n-3)
 */
console.log(getCow(6));
function getCow1(n) {
  if (n < 1) return 0;
  if (n <= 3) return n;
  return getCow(n - 1) + getCow(n - 3);
}

function getCow1_5(n) {
  let memory = [];
  if (n < 1) return 0;
  if (n <= 3) return n;
  if (!memory[n]) {
    memory[n] = getCow(n - 1) + getCow(n - 3);
  }
  return memory[n];
}

function getCow2(n) {
  if (n < 1) return 0;
  if (n <= 3) return n;

  let pppres = 1,
    ppres = 2,
    pres = 3,
    res = 0;
  for (let i = 4; i <= n; i++) {
    res = pppres + pres;
    pppres = ppres;
    ppres = pres;
    pres = res;
  }
  return res;
}

//way2：dp思维的代码
function getCow(n) {
  if (n == 0 || n == 1 || n == 2) return n;
  let mem = [];
  (mem[0] = 1), (mem[1] = 2), (mem[2] = 3);
  for (let i = 3; i < n; i++) {
    mem[i] = mem[i - 1] + mem[i - 3];
  }
  return mem[n - 1];
}
