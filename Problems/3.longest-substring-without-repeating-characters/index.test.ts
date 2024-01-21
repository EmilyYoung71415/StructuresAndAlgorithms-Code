import { lengthOfLongestSubstring } from './index';
import { lengthOfLongestSubstring as lengthOfLongestSubstring2 } from './2';

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

  // 重复元素在队首
  it('use case 4', () => {
    const s = 'dvdf';
    const expected = 3;
    expect(lengthOfLongestSubstring2(s)).toBe(expected);
  });
});

describe('lengthOfLongestSubstring2 should work', () => {
  it('use case 1', () => {
    const s = 'abcabcbb';
    const expected = 3;
    expect(lengthOfLongestSubstring2(s)).toBe(expected);
  });

  it('use case 2', () => {
    const s = 'bbbbb';
    const expected = 1;
    expect(lengthOfLongestSubstring2(s)).toBe(expected);
  });

  it('use case 3', () => {
    const s = 'pwwkew';
    const expected = 3;
    expect(lengthOfLongestSubstring2(s)).toBe(expected);
  });

  it('use case 4', () => {
    const s = 'dvdf';
    const expected = 3;
    expect(lengthOfLongestSubstring2(s)).toBe(expected);
  });
});
