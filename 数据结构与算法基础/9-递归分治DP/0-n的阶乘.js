/**
 * n! = n*(n-1)*(n-2)*......1 
 * 0！=1  1！=1
 * 负数没有阶乘,如果输入负数返回-1
 */

// for循环版
// console.log(getFactorialFor(3));
function getFactorialFor(n) {
    if (n < 0) {
        return -1;
    }
    let temp = 1;
    for (let i = n; i > 0; i--) {
        temp = temp * i;
    }
    return temp;
}


// 递归版
// n! = n*(n-1)！ 
console.log(getFactorial2(-8))
function getFactorial2(n){
    if(n>=0){
        // 递归出口
        if(n===0){
            return 1;
        }else{
            let temp = n * getFactorial2(n-1);
            return temp;
        }
    }
    return -1;
}