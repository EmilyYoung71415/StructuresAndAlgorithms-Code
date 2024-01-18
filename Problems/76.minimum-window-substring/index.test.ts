import { minWindow, minWindow_perf } from './index';

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

describe('239.minimum-window-substring minWindow_perf', () => {
  it('case 1', () => {
    expect(minWindow_perf('ADOBECODEBANC', 'ABC')).toBe('BANC');
  });

  it('case 2', () => {
    expect(minWindow_perf('a', 'a')).toBe('a');
  });

  it('case 3', () => {
    expect(minWindow_perf('a', 'aa')).toBe('');
  });

  it('case 4', () => {
    expect(minWindow_perf('ab', 'a')).toBe('a');
  });
});
