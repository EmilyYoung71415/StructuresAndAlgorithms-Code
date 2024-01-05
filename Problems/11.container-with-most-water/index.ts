export function maxArea(heights: number[]): number {
  const n = heights.length;
  let [l, r, maxArea] = [0, n - 1, 0];

  while (l < r) {
    let h = heights[l];
    let w = r - l;

    if (heights[l] < heights[r]) {
      h = heights[l];
      l++;
    } else {
      h = heights[r];
      r--;
    }

    const area = w * h;
    maxArea = Math.max(area, maxArea);
  }

  return maxArea;
}
