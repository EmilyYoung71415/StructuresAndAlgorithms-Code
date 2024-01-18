export function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  let l = 0;
  let maxSize = 0;

  for (let r = 0; r < s.length; r++) {
    // 左移：窗口非法 → 开始收缩，直接合法位置
    while (set.has(s[r])) {
      set.delete(s[l]);
      l++;
    }
    set.add(s[r]);
    maxSize = Math.max(maxSize, set.size);
  }

  return maxSize;
}
