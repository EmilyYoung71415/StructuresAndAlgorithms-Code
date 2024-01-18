/**
 * 写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。
 * 
 * 
 */

var t;
function foo() {
    if (t) return t;
    t = new Date()
    return t;
}
let res = foo();

function foo2(){
    var t ;
    function foo2call(){
        if (t) return t;
        t = new Date()
        return t;
    }
    return foo2call();
}

let res = foo2();
console.log(res);

/*-----*/
/*然而还是没有解决调用时都必须进行一次判断的问题。*/
/*-----*/


// 惰性函数
// 解决每次都要进行判断的这个问题，解决原理很简单，重写函数。

var foo = function() {
    var t = new Date();
    foo = function() {
        return t;// return t 并不会再次进行 t=new Date（）的运算
    };
    return foo();
};

// 应用
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
    el.addEvent(type, fn, false);// 第一次也要起作用
}

/****
 * lodash 惰性求值
 * https://wangxiaokai.vip/posts/2018-08-18-lazy-evaluation/
 * 
 * 
 * 
 */