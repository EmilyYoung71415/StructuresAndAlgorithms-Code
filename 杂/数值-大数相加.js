// 腾讯alloyteam
// 如何进行一个大于2的53次方的数运算
// JS 的number类型：在介于 -(2^53 -1) 到 2^53-1之间时是精确的，一旦不在这个区间的时候便出现精度问题
// 出现的问题大致表现是这样的：
// Math.pow(2, 53) === Math.pow(2, 53) + 1 // 输出为true
// 9007199254740992 + 4 === 9007199254740992 + 5 // 输出为true

// 可以通过 Number.MAX_VALUE === 1.7976931348623157e+308。
// Number.MAX_SAFE_INTEGER  === 2^53 - 1

// 思路1：
// 将Number转为String，遍历每个字符一一相加 就不会超出精度了

// 假如我们要进行
//          9007199254740991
//     + 1234567899999999999

// console.log(add(Math.pow(2, 53), 1)); // 9007199254740992
function add(a = 0, b = 0) {
  if (!isValid(a) || !isValid(b)) {
    throw new Error('参数仅支持number和string类型');
  }
  let str1 = a.toString();
  let str2 = b.toString();
  // 取两个数字的最大长度
  const maxLen = Math.max(str1.length, str2.length);
  // 用0补齐长度
  str1 = str1.padStart(maxLen, 0); // "0009007199254740991"
  str2 = str2.padStart(maxLen, 0); // "1234567899999999999"

  let sum = '';
  let flag = 0; // 是否进位
  // 从右往左开始加
  for (let i = maxLen - 1; i >= 0; i--) {
    const cursum = Number(str1[i]) + Number(str2[i]) + flag;
    flag = ~~(cursum / 10);
    sum = (cursum % 10) + sum; // 字符串相拼
  }

  if (flag) {
    sum = '1' + sum;
  }

  return sum; // 返回string类型表示的number

  // valid 合法的
  function isValid(data) {
    return typeof data === 'string' || typeof data === 'number';
  }
}

// 在str字符串前面补足repeatStr字符，使其满足maxlen长度
// 正常case：maxlen > str.len
// 考虑一个非正常case： maxlen < str.len，替换策略的问题
// if repeat优先级更高，那就是直接head进行替换
// else if maxlen优先级更高，那进行tail截断之后 return

const res = padStart('abc', 10, '0');
console.log(res);
function padStart(str, maxlen, repeatStr) {
  let result = '';

  let headLen = maxlen - str.length;
  // const repeatLen = repeatStr.length;

  while (headLen--) {
    result += repeatStr;
  }

  // 正常case
  result += str;

  return result;
}

// 思路2：bigint类型 （抖机灵
// Math.pow(2, 53) === Math.pow(2, 53) + 1
// BigInt(Math.pow(2, 53)) === BigInt(Math.pow(2, 53)) + BigInt(1)
// but: BigInt 只能和 BigInt 进行运算

// Math.pow(2, 53) // 9007199254740992
// Math.pow(2, 53) + 1 // 9007199254740992
// BigInt(Math.pow(2, 53)) + BigInt(1) // 9007199254740993n

// 扩展：大数相乘 = 基于加法实现，100*12 = 12个100+100的大数
// 当前 社区有很成熟的实现库：https://github.com/MikeMcl/bignumber.js/
