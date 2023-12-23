import { canJump, canJump2 } from './index';

describe('canJump', () => {
  it('should work', () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    expect(canJump([3, 2, 1, 0, 4])).toBe(false);
  });
});

describe('canJump 2', () => {
  it('should work', () => {
    expect(canJump2([2, 3, 1, 1, 4])).toBe(true);
    expect(canJump2([3, 2, 1, 0, 4])).toBe(false);
  });
});
