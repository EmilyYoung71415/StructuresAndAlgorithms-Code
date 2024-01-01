// Time O(N) | Space O(1)
export function maxProfit(prices: number[]): number {
  let [left, right, max] = [0, 1, 0];

  while (right < prices.length) {
    const canSlide = prices[right] <= prices[left];
    if (canSlide) {
      left = right;
    }
    const windowValue = prices[right] - prices[left];
    max = Math.max(max, windowValue);
    right++;
  }
  return max;
}

export function maxProfit2(prices: number[]): number {
  let buyIdx = 0;
  let maxProfit = 0;
  let curProfit = 0;
  for (let sellIdx = 1; sellIdx < prices.length; sellIdx++) {
    const [sell, buy] = [prices[sellIdx], prices[buyIdx]];
    if (sell > buy) {
      curProfit = sell - buy;
      if (curProfit > maxProfit) {
        maxProfit = curProfit;
      }
    } else if (sell < buy) {
      buyIdx = sellIdx;
    }
  }

  return maxProfit;
}
