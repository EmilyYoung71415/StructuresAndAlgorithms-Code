import { lengthOfLongestSubstring } from './index';
import { lengthOfLongestSubstring as lengthOfLongestSubstring2 } from './2';

const testCases = [
  { s: 'abcabcbb', expected: 3 },
  { s: 'bbbbb', expected: 1 },
  { s: 'pwwkew', expected: 3 },
  { s: 'dvdf', expected: 3 },
];

describe('lengthOfLongestSubstring should work', () => {
  test.each(testCases)('use case %#', ({ s, expected }) => {
    expect(lengthOfLongestSubstring(s)).toBe(expected);
  });
});

describe('lengthOfLongestSubstring2 should work', () => {
  test.each(testCases)('use case %#', ({ s, expected }) => {
    expect(lengthOfLongestSubstring2(s)).toBe(expected);
  });
});
