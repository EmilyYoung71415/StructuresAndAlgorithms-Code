import { isPalindrome, isPalindrome2 } from './index';

describe('isPalindrome should work', () => {
  it('test case 1', () => {
    const s = 'A man, a plan, a canal: Panama';
    const output = isPalindrome(s);
    expect(output).toBeTruthy();
  });

  it('test case 2', () => {
    const s = 'race a car';
    const output = isPalindrome(s);
    expect(output).toBeFalsy();
  });

  it('test case 2', () => {
    const s = ' ';
    const output = isPalindrome(s);
    expect(output).toBeTruthy();
  });
});

describe('isPalindrome2 should work', () => {
  it('test case 1', () => {
    const s = 'A man, a plan, a canal: Panama';
    const output = isPalindrome2(s);
    expect(output).toBeTruthy();
  });

  it('test case 2', () => {
    const s = 'race a car';
    const output = isPalindrome2(s);
    expect(output).toBeFalsy();
  });

  it('test case 2', () => {
    const s = ' ';
    const output = isPalindrome2(s);
    expect(output).toBeTruthy();
  });
});
