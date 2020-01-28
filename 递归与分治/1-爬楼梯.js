/****
 * leetcode：70
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * exp
 * 2:2 (1+1 2)
 * 3:3 (1+1+1,1+2,2+1,)
 * 
 * 思路:
 * 1：1
 * 2：2
 * 3：3
 * 4：5
 * 斐波拉契数列特征
 * 思考本质： 到达当前阶n =  f(n-1) + f(n-2)
 *          因为最后一步要么 跨1步、要么跨2步
 */


 console.log(climbStairs(4))
function climbStairs1(n){// 时间复杂度 2^n
    if(n<=0) return 0;
    if(n<=3) return n;
    return climbStairs(n-1) + climbStairs(n-2);
}

// 优化 这个递归像是展开的树，肯定有很多重复的
// 迭代
/***
 * pprev   prev     i
 *  1       2       3   4   5
 * 
 */
function climbStairs(n){
    if(n<3) return n;
    let pprev = 1,
        prev = 2,
        res = 0;
    for(let i=3;i<=n;i++){
        res = pprev + prev;
        pprev = prev;
        prev = res;
    }
    return res;
}
