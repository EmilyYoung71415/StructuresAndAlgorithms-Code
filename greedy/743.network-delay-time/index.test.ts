import { networkDelayTime } from './index';

describe('networkDelayTime should work', () => {
  it('should work 1', () => {
    const times = [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1],
      ],
      n = 4,
      k = 2;
    const output = networkDelayTime(times, n, k);
    expect(output).toBe(2);
  });

  it('should work 2', () => {
    const times = [[1, 2, 1]],
      n = 2,
      k = 1;
    const output = networkDelayTime(times, n, k);
    expect(output).toBe(1);
  });

  it('should work 3', () => {
    const times = [[1, 2, 1]],
      n = 2,
      k = 2;
    const output = networkDelayTime(times, n, k);
    expect(output).toBe(-1);
  });
});
