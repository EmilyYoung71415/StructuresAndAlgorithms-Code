// s=“12223333752“，请你输出[1, 8, 12, 7, 5]，即合并相同的数字并按顺序输出
// 来源：微软前端二面笔试题from web

// 题解：从222xxx 2=8 可看出，不是连续相同的数字，只要是相同的就可以

// 思路：直接遍历可以从前往后遍历，
// 再用一个指针从当前要求和的数地方往后遍历，用bool记录使用过的数

export function mergeNumAndPrintf(str: string): number[] {
  const result: number[] = [];
  const boolSet: Set<number> = new Set();
  const len = str.length;

  for (let i = 0; i < str.length; i++) {
    const num1 = Number(str[i]);
    if (boolSet.has(num1)) continue;

    // 必须使用一个set来记录使用过的数，如果是连续相同合并数的话，就可以靠i += j来跳
    boolSet.add(num1);

    let curSum = num1;
    for (let j = i + 1; j < len; j++) {
      const num2 = Number(str[j]);
      if (num1 === num2) {
        curSum += num1;
      }
    }

    result.push(curSum);
  }

  return result;
}

// 思路2
// Map<num, count> 遍历记录各个数字出现的次数
// dataQueue: []; 按照出现次序push num
// 顺序输出dataQueue, 每遇到data时 dataQ[index] = num*count
// 假设n个数, 空间复杂度： 2*n， 时间复杂度：m个数，m+n

// 改编：合并连续相等的数
// s=“12223333752“，请你输出[1, 6, 12, 7, 5, 2]
export function mergeConsecutive(str: string): number[] {
  const result: number[] = [];
  const len = str.length;

  for (let i = 0; i < len; ) {
    const num1 = Number(str[i]);
    let curSum = num1;
    let j = i + 1;

    // 遍历到第一个不相等的元素 中断
    for (; j < len; j++) {
      const num2 = Number(str[j]);
      if (num1 !== num2) break; // 中断j的整个循环
      curSum += num1;
    }

    i = j; // 是直接i=j 而不是i+j
    result.push(curSum);
  }

  return result;
}
