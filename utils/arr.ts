export function swap(arr: number[], i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export function serializeArr(arr: number[][]) {
  const _arr = arr.slice();
  _arr.sort((arr1: number[], arr2: number[]) => {
    const _arr1 = arr1.sort();
    const _arr2 = arr2.sort();
    if (arr1.length !== arr2.length) return arr1.length - arr2.length;
    return Number(JSON.stringify(_arr1)) - Number(JSON.stringify(_arr2));
  });
  return JSON.stringify(_arr);
}
