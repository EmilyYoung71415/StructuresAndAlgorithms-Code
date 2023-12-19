import { isAnagram } from './index';

describe('isAnagram', () => {
  it('should return true for valid anagrams', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true);
  });

  it('should return false for non-anagrams', () => {
    expect(isAnagram('rat', 'car')).toBe(false);
  });
});
