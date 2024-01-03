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
