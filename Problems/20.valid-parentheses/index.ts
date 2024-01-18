// 使用栈，遇到左括号就入栈，右括号就出栈，看出栈之后的栈顶元素是否与右括号相匹配
// 且需要维护 括号匹配关系
// [] {} ()
// [右括号]：[左括号]
export function isValid(s: string): boolean {
  const matchMap = {
    ']': '[',
    '}': '{',
    ')': '(',
  };
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const isR = !!matchMap[char];
    if (!isR) {
      stack.push(char);
    } else {
      const peek = stack.pop();
      if (matchMap[char] != peek) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
