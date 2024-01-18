/**
 * 
 * 参考：https://github.com/mqyqingfeng/Blog/issues/11
 * 原生实践之：
 *      call、apply 使用
 * 
 *  call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
 *  与apply不同call方法传递给调用函数的参数是逐个列出的，而apply则是要写在数组中
 * 
 * 
 *  var foo = {
        value: 1
    };

    function bar() {
        console.log(this.value);
    }

    bar.call(foo); // 1

    总结：call 干了什么：
    1、call将bar函数内部的this指向了foo对象，于是输出foo.value
    2、bar执行了
 * 
 */


 // 开始实践模拟之
/***
 * 思路;
 *      call既然把this替换了，我们可以换个角度思考
 *      var foo = {
            value: 1，
            bar:function(){
                console.log(this.value)
            }
        };  
 * 
 * 
 *      思路：
 *          在原对象上增加fn函数，并执行this。用完之后销毁
 *            context.fn = this;
                var args = arguments[1] //获取传入的数组参数
                context.fn(args.join(',');
                delete context.fn;


            1、修改arg，使得函数可以传不同函数（ewal）
                使用eval拼接执行 arguments参数
            2、this传入null时是window；函数可以有返回值
            3、因为fn挂载在context上的，如果不同则容易污染
                为了保证挂在context上的f独一无二化，可以考虑symbol
*/


Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 测试
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}


// apply 和call差不多，只是apply要传入arr

Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
