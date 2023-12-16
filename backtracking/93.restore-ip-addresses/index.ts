export function restoreIpAddresses(s: string): string[] {
  const n = s.length;
  const res: string[] = [];
  const path: number[] = []; // 255.255.11.23

  const dfs = (i: number) => {
    if (path.length >= 4) {
      if (i === n) {
        res.push(path.slice().join('.'));
      }
      return;
    }

    for (let j = i; j < n; j++) {
      // 转换成 Number
      const num = Number(s.slice(i, j + 1)); //[start,i]
      if (num > 255) break; // 2555 -> [2] [25] [255]都组合一遍
      path.push(num);
      dfs(j + 1);
      path.pop();
      // 为什么是后序判断? 0000-> 0.0.0.0
      // 后序表示 从后到前的数据  0.11.22.12
      if (s[i] === '0') break; // 不可以前导0
    }
  };

  dfs(0);

  return res;
}
