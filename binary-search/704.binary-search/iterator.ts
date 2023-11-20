export function binarySearch(arr: number[], target: number): number {
  // [l, m], [m+1, r]
  if (!arr.length) return -1;

  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (target <= arr[m]) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return arr[l] === target ? l : -1;
}
