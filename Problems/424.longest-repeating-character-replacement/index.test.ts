import { characterReplacement } from './index';

describe('characterReplacement should work', () => {
  it('case 1', () => {
    expect(characterReplacement('ABAB', 2)).toBe(4);
  });
  it('case 2', () => {
    expect(characterReplacement('AABABBA', 1)).toBe(4);
  });
});
