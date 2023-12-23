import { eraseOverlapIntervals } from './index';

describe('eraseOverlapIntervals', () => {
  it('should return 1 when given intervals = [[1,2],[2,3],[3,4],[1,3]]', () => {
    const intervals = [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ];
    const result = eraseOverlapIntervals(intervals);
    expect(result).toBe(1);
  });

  it('should return 2 when given intervals = [[1,2],[1,2],[1,2]]', () => {
    const intervals = [
      [1, 2],
      [1, 2],
      [1, 2],
    ];
    const result = eraseOverlapIntervals(intervals);
    expect(result).toBe(2);
  });

  it('should return 0 when given intervals = [[1,2],[2,3]]', () => {
    const intervals = [
      [1, 2],
      [2, 3],
    ];
    const result = eraseOverlapIntervals(intervals);
    expect(result).toBe(0);
  });
});
