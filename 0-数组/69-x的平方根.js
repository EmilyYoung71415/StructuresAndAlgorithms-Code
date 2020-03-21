/***
 * https://leetcode-cn.com/problems/sqrtx/
 * leetcode: 69
 */

// 实现 int sqrt(int x) 函数。
// 计算并返回 x 的平方根，其中 x 是非负整数。
// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。


/***
 * 思路：
 *      平方根： x ^2  = res;
 *      x为： 1-res 之前的数，所以采用二分法猜数
 */
console.log(mySqrt(8));
function mySqrt(x) {
    if (x===0 || x===1) return x;
    
    let l = 0;
    let r = x;

    while (r - l > 1) {
        let mid = Math.floor((l + r)/2);
        // 用x/mid<mid而不是mid*mid>x防止溢出
        if (Math.floor(x/mid) < mid) {
            r = mid;
        }
        else {
            l = mid;
        }
    }

    return l;
};