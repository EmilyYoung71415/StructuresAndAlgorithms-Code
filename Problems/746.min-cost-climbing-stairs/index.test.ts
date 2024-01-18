import { minCostClimbingStairs as minCostClimbingStairs_for } from './pre-for';

test('minCostClimbingStairs should work', () => {
  const input = [10, 15, 20];
  const expected = 15;
  const output = minCostClimbingStairs_for(input);
  expect(output).toBe(expected);
});

test('minCostClimbingStairs should work2', () => {
  const input = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
  const expected = 6;
  const output = minCostClimbingStairs_for(input);
  expect(output).toBe(expected);
});
