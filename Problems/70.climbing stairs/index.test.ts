import { climbStairs as climbStairs_FOR } from './pre-order';

test.only('climbStairs should work', () => {
  const output1 = climbStairs_FOR(3);
  expect(output1).toBe(3);

  const output2 = climbStairs_FOR(4);
  expect(output2).toBe(5);
});
