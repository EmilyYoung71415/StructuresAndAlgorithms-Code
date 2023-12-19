export function isAnagram(s: string, t: string): boolean {
  // 判断t是否是是s的字母异位词
  // 1. 长度不同，直接返回false
  // 2. 将s和t排序，比较是否相等
  if (s.length !== t.length) {
    return false;
  }

  const sArr = s.split('').sort();
  const tArr = t.split('').sort();
  // 判断sArr和tArr是否相等
  for (let i = 0; i < sArr.length; i++) {
    if (sArr[i] !== tArr[i]) {
      return false;
    }
  }

  return true;
}
