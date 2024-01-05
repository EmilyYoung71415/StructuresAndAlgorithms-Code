import { maxArea } from './index';

describe('11. Container With Most Water', () => {
  it('use case 1', () => {
    const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    const output = maxArea(height);
    expect(output).toBe(49);
  });

  it('use case 2', () => {
    const height = [1, 1];
    const output = maxArea(height);
    expect(output).toBe(1);
  });
});
