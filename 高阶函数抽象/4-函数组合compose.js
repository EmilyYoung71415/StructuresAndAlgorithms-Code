/**
 * 例：
 *      写一个函数，输入 'kevin'，返回 'HELLO, KEVIN'
 * 
 * 我们可以拆分成两个函数然后使用函数的组合完成，功能；
 * 
 * 
 */


var toUpperCase = function(x) { return x.toUpperCase(); };
var hello = function(x) { return 'HELLO, ' + x; };

var greet = function(x){
    return hello(toUpperCase(x));
};

greet('kevin');

// var greet = compose(hello, toUpperCase); 
// compose 函数让代码从右往左运行，而不是从内往外，
// but now: compose(d, compose(c, compose(b, a)))
// we want :compose(d, c, b, a)


function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};



// redux 实现
function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((f, g) => (...args) => f(g(...args)))
}


/*



实现一个 compose 函数，它接受任意多个函数作为参数
（这些函数都只接受一个参数），然后 compose 返回的也是一个函数，达到以下的效果：
const operate = compose(div2, mul3, add1, add1)
operate(0) // => 相当于 div2(mul3(add1(add1(0))))
operate(2) // => 相当于 div2(mul3(add1(add1(2))))



*/