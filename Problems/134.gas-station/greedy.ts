export function canCompleteCircuit(gas: number[], cost: number[]): number {
  // 从gas 0作为起点，如果无法越过当前点，直将下一个点作为出发点
  // 当无法抵达到达下一个加油站，起点开始的加油站和当前节点的加油站都不能作为起点
  // 将下一个点当作出发点，油量和成本置空，重新开始
  const len = gas.length;
  let sumOfGas = 0;
  let sumOfCost = 0;
  let start = 0;
  let gasShortage = 0; // 无法走的加油站缺了多少油

  for (let i = 0; i < len; i++) {
    sumOfGas += gas[i];
    sumOfCost += cost[i];

    if (sumOfGas < sumOfCost) {
      // 这里是累加 而不是 =
      gasShortage += sumOfCost - sumOfGas; // 从当前加油站到达后面的加油站差了多少油
      // 将下一个点当作出发点，注意油量和成本置空，重新开始
      start = i + 1;
      sumOfGas = 0;
      sumOfCost = 0;
    }
  }

  if (start < len && sumOfGas - sumOfCost >= gasShortage) return start;
  return -1;
}
