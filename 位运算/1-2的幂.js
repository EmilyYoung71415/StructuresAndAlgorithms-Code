/****
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方
 * 
 * exp:
 * 8=2^3 √
 * 25=5^2 x
 * 18=9*2 x
 */

/****
 * 思路：
 * 1、不断对数进行模2判断是否为0 
 *    x%2==1,x=x/2;else:false
 * 2、公式:
 *    开根号 判断是否为整数 log2
 * 3、x&(x-1)  
 */
console.log(isPowerOfTwo(0))
/***
 * 错误过的例子 
 * 输入0
 * 
 */
function isPowerOfTwo(n){
    if(n<=0) return false;
    // while(n%2==0){// n==0 死循环
    //     n= n/2>>0;
    // }
    while((n&1)==0){// 记住打括号
        n>>=1;
    }
    return n==1?true:false;
}

function isPowerOfTwo(n){
    return n>0&&!(n&(n-1));
}