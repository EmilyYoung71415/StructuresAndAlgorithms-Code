// 下面五段代码分别输出什么？并且什么时候输出什么？
/*
*
*     闭包、作用域的考法
*/
// 0 1 2 3 4 
for(var i = 0; i < 5; i++) {
    console.log(i);
}

// 分别隔0 1 2 3 4s 输出5 
for(var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000 * i);
}

// 立即执行函数 传入 i 分别隔0 12 3 4 输出0 1 23 4 
// 因为创建了闭包
for(var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    })(i);
}

// 还是输出 5

for(var i = 0; i < 5; i++) {
    (function() {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    })(i);
}

// 回调函数传入 参数
for(var i = 0; i < 5; i++) {
    setTimeout((function(i) {
        console.log(i);
    })(i), i * 1000);
}

// settimeout 可以传入第三个参数 一旦定时器到期，作为参数传递给function
for(var i=1;i<3;i++){
    setTimeout((i)=>{
        console.log(i)
    },i*1000,i)
}
/*
function foo(){
    var arr = [];
    for(var i = 0; i < 2; i++){
        // 并没有把函数的返回值赋值给数组元素，而仅仅是把函数赋值给了数组元素
        arr[i] = (function(j){
            return j;
        })(i)
    }
    return arr;
}
var bar = foo();
console.log(bar[0]());//2 
*/