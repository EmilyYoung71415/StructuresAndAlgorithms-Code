import { lengthOfLongestSubstring } from './index';

describe('lengthOfLongestSubstring should work', () => {
  it('use case 1', () => {
    const s = 'abcabcbb';
    const expected = 3;
    expect(lengthOfLongestSubstring(s)).toBe(expected);
  });

  it('use case 2', () => {
    const s = 'bbbbb';
    const expected = 1;
    expect(lengthOfLongestSubstring(s)).toBe(expected);
  });

  it('use case 3', () => {
    const s = 'pwwkew';
    const expected = 3;
    expect(lengthOfLongestSubstring(s)).toBe(expected);
  });
});
