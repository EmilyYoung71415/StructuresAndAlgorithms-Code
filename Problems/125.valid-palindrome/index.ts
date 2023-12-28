export function isPalindrome(s: string): boolean {
  if (!s.length) return true;

  // 双指针 Time O(N) | Space O(1)
  let [leftIdx, rightIdx] = [0, s.length - 1];
  const targetCharReg = /[a-zA-Z0-9]/; // 字母 number

  while (leftIdx < rightIdx) {
    const leftChar = s[leftIdx];
    const rightChar = s[rightIdx];

    if (!targetCharReg.test(leftChar)) {
      leftIdx++;
    } else if (!targetCharReg.test(rightChar)) {
      rightIdx--;
    } else {
      if (leftChar.toLowerCase() != rightChar.toLowerCase()) {
        return false;
      }
      leftIdx++;
      rightIdx--;
    }
  }
  return true;
}

// arr: Filter && Clone && Reverse
// Time O(N) | Space O(N)
export function isPalindrome2(s: string): boolean {
  if (!s.length) return true;
  const filterAlphaNumeric = (s: string) => {
    const nonAlphaNumeric = new RegExp('[^a-z0-9]', 'gi');
    return s
      .toLowerCase() /* Time O(N) | Space O(N) */
      .replace(nonAlphaNumeric, ''); /* Time O(N) | Space O(N) */
  };

  const reverse = (s: string) => {
    return s
      .split('') /* Time O(N) | Space O(N) */
      .reverse() /* Time O(N) | Space O(N) */
      .join(''); /* Time O(N) | Space O(N) */
  };

  const alphaNumeric = filterAlphaNumeric(s); /* Time O(N) | Space O(N) */
  const reversed = reverse(alphaNumeric); /* Time O(N) | Space O(N) */

  return alphaNumeric === reversed;
}
