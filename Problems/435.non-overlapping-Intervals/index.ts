export function eraseOverlapIntervals(intervals: number[][]): number {
  // 1. 将intervals按照end从小到大排序
  intervals.sort((a, b) => a[1] - b[1]);

  // 2. 遍历intervals，如果当前interval的start小于等于上一个interval的end，则删除当前interval
  let prev = intervals[0];
  let removeNum = 0;
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];
    // interval.start <= prev.end
    if (interval[0] < prev[1]) {
      removeNum++;
    } else {
      prev = interval;
    }
  }

  return removeNum;
}
