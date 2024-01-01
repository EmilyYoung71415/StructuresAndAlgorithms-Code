import { maxProfit, maxProfit2 } from './index';

describe('maxProfit should work', () => {
  it('use case 1', () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const expected = 5;
    expect(maxProfit(prices)).toBe(expected);
  });
  it('use case 1', () => {
    const prices = [7, 6, 4, 3, 1];
    const expected = 0;
    expect(maxProfit(prices)).toBe(expected);
  });
});

describe('maxProfit2 should work', () => {
  it('use case 1', () => {
    const prices = [7, 1, 5, 3, 6, 4];
    const expected = 5;
    expect(maxProfit2(prices)).toBe(expected);
  });
  it('use case 1', () => {
    const prices = [7, 6, 4, 3, 1];
    const expected = 0;
    expect(maxProfit2(prices)).toBe(expected);
  });
});
