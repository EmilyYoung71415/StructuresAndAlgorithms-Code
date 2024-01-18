export function findContentChildren(children: number[], cookies: number[]): number {
  // 1. sort  children and cookies：小孩食量 和 cookie分量都从小到大排列，优先 使用小饼干 满足 小食量的小孩
  children.sort((a, b) => a - b);
  cookies.sort((a, b) => a - b);

  let fullNum = 0;
  let childIndex = 0;
  const childrenLen = children.length;

  for (let cookie of cookies) {
    if (childIndex < childrenLen && cookie >= children[childIndex]) {
      fullNum++;
      childIndex++;
    }
  }

  return fullNum;
}

export function findContentChildren2(children: number[], cookies: number[]): number {
  children.sort((a, b) => a - b);
  cookies.sort((a, b) => a - b);

  let fullNum = 0;
  let cookieIndex = 0;

  for (let child of children) {
    // remainCookies >= 0
    for (let j = cookieIndex; j < cookies.length; j++) {
      const cookie = cookies[j];
      if (cookie >= child) {
        fullNum++;
        cookieIndex = j + 1;
        break; // 优化：找到满足的饼干后，跳出当前循环，继续下一个小孩
      }
    }
  }

  return fullNum;
}
