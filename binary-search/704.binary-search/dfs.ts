export function binarySearch(arr: number[], target: number): number {
  // [l, m][m+1, r]
  const dfs = (l: number, r: number): number => {
    // if (l > r) return -1;
    if (l === r) return l;
    const m = Math.floor((l + r) / 2);
    // if (arr[m] === target) return m;
    if (target <= arr[m]) return dfs(l, m);
    return dfs(m + 1, r);
  };

  const targetIndex = dfs(0, arr.length - 1);
  return arr[targetIndex] === target ? targetIndex : -1;
}
