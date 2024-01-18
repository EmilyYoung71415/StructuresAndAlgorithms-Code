/**
 * 每次调用函数，都返回加1的一个数字(数字初始值为0)
 * 1、全局变量
 * 2、闭包+立即执行函数 构造私有变量
 * 3、valueOf可以改变吗
 */
/* 
    全局
    var a = 0;
    function add(){
        return ++a;
    }
    console.log(add());//1
    console.log(add());//2

*/

/*

function add(){
    let a = 1;
    return (function(){
        return ++a;
    })()
}

console.log(add())
// 改造一下 表面上 用户只需调用一次 立即执行函数   
*/

// 立即执行函数

// (function IIFE(){
//     console.log(1)
// }())

// (function(){
//     console.log(1)
// })()

