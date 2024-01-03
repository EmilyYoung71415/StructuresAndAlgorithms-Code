export function characterReplacement(s: string, k: number): number {
  let [l, r, longest, max] = new Array(4).fill(0);
  const frequencyMap = new Map<string, number>();

  while (r < s.length) {
    // const count = addRightFrequency(s[r], frequencyMap);
    const rightChar = s[r];
    frequencyMap.set(rightChar, (frequencyMap.get(rightChar) || 0) + 1);
    const rightCount = frequencyMap.get(rightChar);
    longest = Math.max(longest, rightCount);
    let window = r - l + 1;
    const canSlide = k < window - longest;

    if (canSlide) {
      // subtractLeftFrequency(s[l], frequencyMap);
      const leftChar = s[l];
      const leftCount = frequencyMap.get(leftChar);
      frequencyMap.set(leftChar, leftCount - 1);
      l++;
    }
    window = r - l + 1;
    max = Math.max(max, window);
    r++;
  }

  return max;
}
