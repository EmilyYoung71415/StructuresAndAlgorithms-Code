/**
 * @param weights表示物品重量集 [2,3,4]
 * @param values表示物品价值集 [3,4,5]
 * @param capacity表示背包的容量  5
 * @param n表示当前物品索引
 * @return  7
 *      背包物品满足容量的情况下，产生的最大价值
 *      打印方案详细情况
 */
console.log(knapSack(5, [2, 3, 4], [3, 4, 5], 3));
function knapSack(capacity, weights, values, n) {
  if (n == 0 || capacity == 0) {
    return 0;
  }

  if (weights[n - 1] > capacity) {
    return knapSack(capacity, weights, values, n - 1);
  } else {
    var a = values[n - 1] + knapSack(capacity - weights[n - 1], weights, values, n - 1),
      b = knapSack(capacity, weights, values, n - 1);
    return a > b ? a : b;
  }
}
