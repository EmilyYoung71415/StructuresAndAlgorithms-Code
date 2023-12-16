import { swap } from '@utils';

export function quickSort(arr: number[]): void {
  if (arr == null || arr.length < 1) return;
  dfs(0, arr.length - 1);

  function dfs(l: number, r: number) {
    if (l >= r) return;
    const p = partition(l, r);
    // [l, p-1], [p], [p+1, r];
    dfs(l, p - 1);
    dfs(p + 1, r);
  }

  // 以p为基准将数组划分成 <p, =p, >p的三部分
  function partition(l: number, r: number): number {
    // if (l > r) return;
    const pivot = arr[r];
    let bounder = l - 1;

    for (let i = l; i <= r; i++) {
      if (arr[i] <= pivot) {
        bounder++;
        swap(arr, bounder, i);
      }
    }

    return bounder;
  }
}
