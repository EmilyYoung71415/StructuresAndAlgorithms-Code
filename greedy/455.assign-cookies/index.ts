export function findContentChildren(children: number[], cookies: number[]): number {
  // 1. sort  children and cookies：小孩食量 和 cookie分量都从小到大排列，优先 使用小饼干 满足 小食量的小孩
  children.sort();
  cookies.sort();

  let fullNum = 0;
  let i = 0;
  const childrenLen = children.length;

  for (let cookie of cookies) {
    if (i < childrenLen && cookie >= children[i]) {
      fullNum++;
      i++;
    }
  }

  return fullNum;
}
