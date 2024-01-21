export function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  const n = s.length - 1;
  let [l, r] = [0, 0];
  let maxLen = 0;

  while (r <= n) {
    if (!set.has(s[r])) {
      set.add(s[r]);
      r++;
      maxLen = Math.max(set.size, maxLen);
    } else {
      while (set.has(s[r])) {
        set.delete(s[l]);
        l++;
      }
    }
  }

  return maxLen;
}
