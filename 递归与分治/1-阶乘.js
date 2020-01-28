/**
 * n! = n*(n-1)*(n-2)*......1 
 * 0！=1  1！=1
 * 负数没有阶乘,如果输入负数返回-1
 * 
 */

console.log(getFactorial(3));
function getFactorial1(n){
    if(n<0) return -1;
    let res = 1;
    for(let i=0;i<n;i++){
        res *= i+1;
    }
    return res;
}

function getFactorial(n){
    if(n<0) return -1;
    if(n==0) return 1;
    return n*getFactorial(n-1);
}