export function quickSort(arr: number[], left = 0, right = arr.length) {
  if (left >= right) return arr;

  const p = partition(arr, left, right);
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
}

export function quickSort2(arr: number[], left = 0, right = arr.length) {
  if (left >= right) return arr;
  const stack: [number, number][] = [];
  stack.push([left, right]);

  while (stack.length) {
    const [_left, _right] = stack.pop();
    if (_left >= _right) continue;
    const p = partition(arr, _left, _right);
    stack.push([_left, p + 1]);
    stack.push([p - 1, _right]);
  }

  return arr;
}

// [data<p, p, arr>p]
// Lomuto分割
function partition(arr: number[], left = 0, right = arr.length): number {
  const p = arr[right];
  // data<p的那个最小接近p的元素
  let boundary = left - 1;

  // 这里结束为i=right, 就不需要for循环外再交换了
  for (let i = left; i <= right; i++) {
    if (arr[i] <= p) {
      boundary++;
      // swap(arr, boundary, i);
      [arr[boundary], arr[i]] = [arr[i], arr[boundary]];
    }
  }

  return boundary;
}
