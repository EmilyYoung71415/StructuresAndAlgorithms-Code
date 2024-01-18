export function canCompleteCircuit(gas: number[], cost: number[]): number {
  const len = gas.length;
  // 总(gas - cost)的最低点
  let minIndex = 0;
  //  总(gas - cost)的最低点对应的剩余值
  let minSpare = Infinity;
  // 累计剩余：总(gas - cost)
  let spare = 0;

  for (let i = 0; i < len; i++) {
    spare += gas[i] - cost[i];
    if (spare < minSpare) {
      minSpare = spare;
      minIndex = i;
    }
  }

  // 如果总(gas - cost)小于0，那么无法走完全程
  if (spare < 0) return -1;
  // 遍历后的 minSpare > 0，表示所有情况都是满足的，直接返回 0
  if (minSpare >= 0) return 0;
  return (minIndex + 1) % len;
}
