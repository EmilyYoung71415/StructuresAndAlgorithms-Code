/**
 * 给出面额arr = [1,2,5,10] 每种面额可使用多张钱币。
 * 期望找零值 aim = 36
 * 请返回 找零的组合方案使得钱币张数最少
 *
 * 如 arr = [2,3,5]
 *    aim = 20
 * return 4 ==> 5*5*5*5
 *
 * 思路：
 *      优先使用最大面额，当最大面额不满足时再考虑次大面额 即贪心策略
 *
 * 简单、快速
 * 但是缺点是 不保证绝对最优
 * 如 [4,3,1]方案aim [6]， 贪心返回[4,1,1]; 而最佳是[3,3]
 */

function minMoneyback(coins) {
  this.coins = coins.sort((a, b) => b - a); //从大到小排序一下
  this.makeChage = function (aim) {
    let change = [],
      total = 0;
    for (let item of this.coins) {
      while (item + total <= aim) {
        change.push(item);
        total += item;
      }
    }
    return change;
  };
}

let test = new minMoneyback([1, 3, 4]);
let res = test.makeChage(6);
console.log(res);
