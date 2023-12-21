export function quickSort(arr: number[], left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  const p = partition(arr, left, right);
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
  return arr;
}

export function quickSort2(arr: number[], left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  const stack: [number, number][] = [];
  stack.push([left, right]);
  while (stack.length) {
    const [_left, _right] = stack.pop();
    if (_left >= _right) continue;
    const p = partition(arr, _left, _right);
    stack.push([_left, p - 1]);
    stack.push([p + 1, _right]);
  }
  return arr;
}

// [data<p, p, arr>p]
function partition(arr: number[], left = 0, right = arr.length - 1): number {
  const pivot = arr[right];

  let i = left - 1;

  for (let j = left; j <= right - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      // swap: i,j
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // swap: i+1, pivot
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];

  return i + 1;
}
