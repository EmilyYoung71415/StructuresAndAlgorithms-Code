/******
 * 将字符串的某个空格替换为 "%20"
 * 实例:
 * 输入："We are happy."
   输出："We%20are%20happy."
 * 
 */

/******
 * 如果实在原来字符串上替换，可能覆盖修改在字符串后面的内存
 * 如果是创建新的字符串在新的字符串上替换，自己可以分配足够内存
 *
 *
 *
 * 思路：
 * 1.字符串转换为数组，[w,e,'',a,r,e,]
 *   然后遍历数组把数组里是空格的替换为 "%20"
 *   再转换为字符串
 * 2.顺序遍历，每次碰到空格字符进行替换，由于是一个字符替换成3个字符
 *   所以把空格后面的字符后移2字节
 *   时间效率：字符长度n，每个空格需要后移n个字符，时间效率n^2
 * 3.从后往前替换
 */
let str = 'We are happy.';
console.log(replaceSpaces(str));
function replaceSpaces(str) {
  let strArr = str.split('');
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] == ' ') {
      strArr[i] = '%20';
    }
  }
  return strArr.join('');
}
