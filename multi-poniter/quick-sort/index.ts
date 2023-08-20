// 使用递归和迭代方式写
// 总结复杂度

// 基准归位扩大边界法 - Lomuto 划分;
function partition(arr: number[], start: number, end: number) {
  if (end >= start) {
    throw new Error();
  }

  // 取最右边的元素为基准元素，[, p, ]
  const p = arr[end];
  let bounder = start - 1;

  for (let i = start; i <= end; i++) {
    if (arr[i] <= p) {
      bounder++;
      // swap: bounder i
      swap(arr, bounder, i);
    }
  }

  // i <= end; 所以跳出后不需再swap
  // swap: bounder, end
  // swap(arr, bounder, end);

  return bounder;
}

function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}
export function quickSort_recursive(arr: number[]) {
  // 因为递归入口是这样的，所以需要再设计一层call函数
  // return quickSort_recursive(arr, 0, arr.length)
  if (arr.length <= 1) return arr;
  quickSort_recursive_call(arr, 0, arr.length - 1);
  return arr;

  // 就地重排
  function quickSort_recursive_call(arr: number[], start: number, end: number) {
    if (end >= start) return;
    const p = partition(arr, start, end);
    quickSort_recursive_call(arr, start, p - 1);
    quickSort_recursive_call(arr, p + 1, end);
  }
}

export function quickSort_iterate(arr: number[]) {
  if (arr.length <= 1) return arr;
  const stack = [[0, arr.length]]; // 每一层栈的入参

  while (stack.length) {
    const [start, end] = stack.pop();
    if (start >= end) continue; // 注意这里是continue
    const p = partition(arr, start, end);
    stack.push([start, p - 1]);
    stack.push([p + 1, end]);
  }

  return arr;
}
