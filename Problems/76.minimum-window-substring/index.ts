export function minWindow_perf(s: string, t: string): string {
  const n = s.length;
  const m = t.length;
  let [l, r, minLen, minL] = [0, 0, Infinity, 0];
  const needMap = new Map<string, number>();
  let missingCount = m;

  // 统计t字符，表示要满足t子串的要求各个字符需要的数量
  for (let i = 0; i < m; i++) {
    const c = t[i];
    needMap.set(c, (needMap.get(c) || 0) + 1);
  }

  while (r < n) {
    const c = s[r];
    // 如果当前字符是t中的字符，那么需要的数量减一
    missingCount -= needMap.get(c) > 0 ? 1 : 0;
    needMap.set(c, (needMap.get(c) || 0) - 1);

    if (missingCount === 0) {
      // 如果当前窗口满足要求，那么尝试缩小窗口
      while (l <= r && needMap.get(s[l]) < 0) {
        const lc = s[l];
        // 让needMap中的负数变为正数，表示当前窗口不满足要求，开始寻找下一个满足的窗口
        needMap.set(lc, (needMap.get(lc) || 0) + 1);
        l++;
      }

      const curLen = r - l + 1;
      if (curLen < minLen) {
        minLen = curLen;
        minL = l;
      }
    }
    r++;
  }

  return minLen === Infinity ? '' : s.slice(minL, minL + minLen);
}

// FIXME:超时了需要优化
export function minWindow(s: string, t: string): string {
  const n = s.length;
  const m = t.length;
  let [l, minLen, minStart] = [0, Infinity, 0];

  for (let r = 0; r < n; r++) {
    // shrink window
    while (l <= r && isValid(s, t, l, r)) {
      const curLen = r - l + 1;
      if (curLen < minLen) {
        minLen = curLen;
        minStart = l;
      }
      l++;
    }
  }

  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen + 1);

  // s[l...r] 是否包含 t
  function isValid(s: string, t: string, l: number, r: number): boolean {
    const map = new Map<string, number>();

    for (let i = 0; i < m; i++) {
      const c = t[i];
      map.set(c, (map.get(c) || 0) + 1);
    }

    for (let i = l; i <= r; i++) {
      const c = s[i];
      if (map.has(c)) {
        map.set(c, map.get(c) - 1);
      }
    }

    for (const v of map.values()) {
      if (v > 0) return false;
    }

    return true;
  }
}
