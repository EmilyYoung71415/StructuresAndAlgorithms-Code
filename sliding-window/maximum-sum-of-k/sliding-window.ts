export function maxSum(arr: number[], k: number) {
  let [current_sum, max] = [0, 0];

  // initial current_sum of first k elements
  for (let i = 0; i < k; i++) {
    current_sum += arr[i];
    max = current_sum;
  }

  // iterate the array once
  // and increment the current_sum by arr[i] and decrement by arr[i-k]
  for (let i = k; i < arr.length; i++) {
    current_sum += arr[i] - arr[i - k];
    // compare current_sum with max
    max = Math.max(max, current_sum);
  }

  return max;
}
