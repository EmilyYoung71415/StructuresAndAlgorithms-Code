export function permute(nums: number[]): number[][] {
  const n = nums.length;
  const res: number[][] = [];
  const path: number[] = [];
  const visited: boolean[] = new Array(n).fill(false);

  const dfs = () => {
    if (path.length === n) {
      res.push(path.slice());
      return;
    }

    for (let j = 0; j < n; j++) {
      if (visited[j]) continue;
      path.push(nums[j]);
      visited[j] = true;
      dfs();
      visited[j] = false;
      path.pop();
    }
  };

  dfs();

  return res;
}
