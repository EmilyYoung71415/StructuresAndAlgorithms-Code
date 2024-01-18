import { minWindow } from './index';

describe('239.minimum-window-substring', () => {
  it('case 1', () => {
    expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
  });

  it('case 2', () => {
    expect(minWindow('a', 'a')).toBe('a');
  });

  it('case 3', () => {
    expect(minWindow('a', 'aa')).toBe('');
  });
});
