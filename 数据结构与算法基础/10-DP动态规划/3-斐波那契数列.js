/**
 * @desc 斐波那契数列
 *  n=1||2:
 *      F(n) = 1; 
 *  n>2:
 *      F(n) = F(n-1) + F(n-2); 
 * 
 */
// 递归版 复杂度：O(2^N)
function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// ==> 斐波拉契数列为1、1、2、3、5、8、....



// 非递归
/**
 * 从左到右依次求出每一项的值
 * 即当前项目等于前两项相加
 *  pre res  
 *   1   1  2   3   5  
 * 
 * i=3之后
 *  res = res + pre = 2
 *  pre = res(改变之前) = 1
 *       pre res    
 *   1    1   2   3
 */

 console.log(fibonacci2(5));
function fibonacci2(n) {
    if(n<0){
        return 0;
    }
    if(n==1||n==2){
        return 1;
    }

    let res = 1,
        pre = 1;
    for(let i =3;i<=n;i++){
        let temp = res;
        res = res + pre;
        pre = temp;
    }
    return res;
}