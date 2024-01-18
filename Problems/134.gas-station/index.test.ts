import { canCompleteCircuit } from './index';
import { canCompleteCircuit as canCompleteCircuit_greedy } from './index';

describe('canCompleteCircuit should work', () => {
  it('should return the correct starting index when gas and cost arrays have the same length', () => {
    expect(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toBe(3);
    expect(canCompleteCircuit([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])).toBe(2);
    expect(canCompleteCircuit([2, 3, 4], [4, 3, 2])).toBe(1);
  });

  it('should return -1 when there is no possible starting index', () => {
    expect(canCompleteCircuit([2, 3, 4], [3, 4, 3])).toBe(-1);
  });

  it('should return the correct starting index when gas and cost arrays are empty', () => {
    expect(canCompleteCircuit([], [])).toBe(0);
  });
});

describe('canCompleteCircuit should work', () => {
  it('should return the correct starting index when gas and cost arrays have the same length', () => {
    expect(canCompleteCircuit_greedy([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toBe(3);
    expect(canCompleteCircuit_greedy([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])).toBe(2);
    expect(canCompleteCircuit_greedy([2, 3, 4], [4, 3, 2])).toBe(1);
  });

  it('should return -1 when there is no possible starting index', () => {
    expect(canCompleteCircuit_greedy([2, 3, 4], [3, 4, 3])).toBe(-1);
  });

  it('should return the correct starting index when gas and cost arrays are empty', () => {
    expect(canCompleteCircuit_greedy([], [])).toBe(0);
  });
});
