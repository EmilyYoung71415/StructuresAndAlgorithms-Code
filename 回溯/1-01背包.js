/****
 * 背包问题:
 *     一个背包最多只能装W重量的物品，
 *     已知有n种物品，每种物品只有一个，
 *     第i种物品重量为wi,价值为vi，
 *     问怎么选择物品转入背包，使得背包价值最大
 *
 * exp:
 *     V=[12,11,9,8]
 *     W=[8,6,4,3]
 *     w=13
 * 最优解:[0,1,1,1] 价值:28,重量:13
 */

/*****
 * 思路:
 * 每个物品，对应两种结果 选 or 不选 所以枚举共有结果:2^n
 *
 * 对应的状态是 是0-1二叉树
 *
 * 制约条件:当前pathArr的重量超过w
 * 递归结束条件:pathArr.length
 *
 * 返回选择方案 、最优价值、实际重量
 *
 */

let V = [12, 11, 9, 8],
  W = [8, 6, 4, 3],
  bagW = 13;
console.log(MFKnapsack(W, V, bagW));
function MFKnapsack(arrW, arrV, bagW) {
  let besPathArr = [],
    maxValue = 0;
  MFKnapsack([], 0, 0);
  return besPathArr;

  // pathArr 表示递归到x层经过的所有物品的选择情况 <0,1,1>表示前三样只有第一样不选
  // index 表示当前该选择第x样物品
  // curWeight 表示当前背包已有的重量
  function MFKnapsack(pathArr, index, curWeight) {
    if (pathArr.length == arrW.length) {
      let value = getValue(pathArr, arrV);
      if (value > maxValue) {
        maxValue = value;
        besPathArr = pathArr;
      }
    } else {
      if (arrW[index] + curWeight > bagW) return;
      // 对应两种选择 选当前物品 和 不选
      let tempArr = pathArr.slice();
      tempArr[index] = 0;
      MFKnapsack(tempArr, index + 1, curWeight);
      tempArr[index] = 1;
      MFKnapsack(tempArr, index + 1, curWeight + arrW[index]);
    }
  }

  function getValue(arr, values) {
    let sum = 0;
    arr.forEach((chosed, index) => {
      sum += chosed ? values[index] : 0;
    });
    return sum;
  }
}
