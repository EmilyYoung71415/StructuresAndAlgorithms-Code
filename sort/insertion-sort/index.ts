import { swap } from '@utils';
export function insertionSort(arr: number[]) {
  if (!arr.length || arr.length === 1) return arr;

  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    while (j >= 0 && arr[j] > arr[j + 1]) {
      // swap: j,j+1
      swap(arr, j, j + 1);
      j--;
    }
  }

  return arr;
}
