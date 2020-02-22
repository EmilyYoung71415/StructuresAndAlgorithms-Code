/***
 * https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 * 输入台阶数n 返回跳法
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 */

/***
 * 思路：
 *      构造递归式
 *      到达第n阶的方式： 从n-1阶跳1级， 从n-2阶跳2级
 *      所以: fn = fn(n-1) + fn(n-2);
 *      fn(0) = 0
 *      fn(1) = 1
 *      fn(2) = [1+1,0+2] = 2
 *      fn(3) = [1+1+1,1+2,2+1] = 3
 */

function numWays(n) {
    if(n==0) return 1;
    if (n<=3) return n;

    let pprev = 2n;
    let prev = 3n;
    let result = 0;
    for(let i=4n;i<=n;i++) {
        result = prev + pprev;
        pprev = prev;
        prev = result;
    }
    return result%1000000007n;
}

// 失败case：n=0 输出1