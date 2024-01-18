/****
 * leetcode:191
 * 输入是一个无符号整数，返回其二进制表达式中数字位数为 ‘1’ 的个数
 *
 * exp:
 * 输入：00000000000000000000000000001011
 * 输出：3
 *
 */

/****
 * 思路
 * 1、整数按位访问,依次对出现的1的个数计数
 *     x%2==1 count++; x=x>>1;
 * 2、上个方法的不好之处在于有很多0不得不访问
 * ==> 利用位运算: x^(x-1)
 *     每次去掉二进制中位置最靠后的1
 */
console.log(hammingWeight(00000000000000000000000000001011));
// 除k求余法
function hammingWeight1(n) {
  let count = 0;
  while (n !== 0) {
    // if(n%2==1){
    //     count++
    // }
    count += n & 1;
    // n=n>>1;//右移 ❌ >> 是错的
    n = n >>> 1; //改成>>> 无符号右移 (但是数据位数过大的时候在node运行是0)
  }
  return count;
}

// 改为递归
function hammingWeight1(n) {
  // if(n){
  //    return n%2 + hammingWeight(~~(n/2));
  // }
  // return n;//是0000的话
  // 优化1
  // return n!==0?n%2+ hammingWeight(~~(n/2)):0;
  // 再次优化 如果n不为1 则返回 &&后面的
  return n && (n % 2) + hammingWeight(~~(n / 2));
}

//利用 x^(x-1) 是清零最低位1
function hammingWeight2(n) {
  let count = 0;
  // 除非是00000000 那么至少都有1个1
  while (n) {
    count++;
    n = n & (n - 1);
  }
  return count;
}

// 利用js 的toString 转为二进制
// 提交显示这个是最快的?
function hammingWeight(n) {
  // ['1','0','0','1']
  return n
    .toString(2)
    .split('')
    .filter(t => t == '1')
    .join('').length;
}
