/*


1. 节流和防抖，手写一下代码

（1）防抖：

定义： 合并事件且不会去触发事件，当一定时间内没有触发这个事件时，才真正去触发事件。

原理：对处理函数进行延时***作，若设定的延时到来之前，再次触发事件，则清除上一次的延时***作定时器，重新定时。

场景： keydown事件上验证用户名，输入法的联想。

实现：

function debounce(fn, delay) {
    var timer
 
    return function () {
        var that = this
        var args = arguments
 
        clearTimeout(timer)
            timer = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}
（2）节流：

定义： 持续触发事件时，合并一定时间内的事件，在间隔一定时间之后再真正触发事件。每间隔一段时间触发一次。

原理：对处理函数进行延时***作，若设定的延时到来之前，再次触发事件，则清除上一次的延时***作定时器，重新定时。

场景： resize改变布局时，onscroll滚动加载下面的图片时。

实现：

方法一：使用时间戳。
当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为0)，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

缺陷：第一次事件会立即执行，停止触发后没办法再激活事件。

function throttle(fn, interval) {
    var previousTime = +new Date()
 
    return function () {
        var that = this
        var args = arguments
        var now = +new Date()
        if (now - previousTime >= interval) {
            previousTime = now
            fn.apply(that, args)
        }
   }
}
方法二：使用定时器
当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。

缺陷：第一次事件会在n秒后执行，停止触发后依然会再执行一次事件。

function throttle(fn, interval) {
    var timer
    return function (){
        var that = this
        var args = arguments
 
   if(!timer){
        timer = setTimeout(function () {
            fn.apply(that, args)
            timer = null
         }, interval)
        }
    }
}
方法三：优化
鼠标移入能立刻执行，停止触发的时候还能再执行一次。


var throttle = function(func,delay){
    var timer = null;
    var startTime = Date.now();
 
    return function(){
        var curTime = Date.now();
        var remaining = delay-(curTime-startTime);
        var context = this;
        var args = arguments;
 
        clearTimeout(timer);
        if(remaining<=0){
            func.apply(context,args);
            startTime = Date.now();
        }else{
            timer = setTimeout(func,remaining);
        }
    }
}










*/