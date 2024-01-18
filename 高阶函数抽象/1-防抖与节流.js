/**
 * 节流：throttle
 *      短期时间内，突然涌入大量待响应事件，
 *      节流作用：暂停响应，控制每隔xx时间响应（就像地铁安检通行一样）
 *      核心： 降低触发回调的频率，让一个函数不要太频繁地执行
 *      常用场景： dom拖拽
 * 思路：
 *      定时器，隔xx时间消灭定时器
 *      当定时器被消灭时，fn.apply(this,args) 才放入参数
 * 
 * 常见应用场景：
 *      dom拖拽
 *      搜索联想
 *      射击游戏的发射事件
 */

function throttle(fn, time = 500){
    let timer;
    return function(...args){
      if(timer == null){
        fn.apply(this,args);
        timer = setTimeout(() => {
          timer = null;
        }, time)
      }
    }
}

// example
// btn.onclick = throttle(function(e){zzz})


/***
 * 防抖 debounce
 * 
 * 背景：
 *      每当浏览器缩小时，发送一个请求。
 *      同样由于窗口在不断缩小，所以不能一直发送请求。
 *      而使用节流，又是隔段时间执行一次，降低触发频率，
 *      实际上我们需要的是： 对于连续函数调用，执行一次；
 * 即去抖
 * 
 * 
 * 常见应用场景：
 *      resize、scroll触发统计事件
 *      文本输入后发送验证
 * 
 */

// 高程版
// side effect  副作用给原函数加了id属性
// function debounce(method, context) {
//     clearTimeout(method.tId);
//     method.tId = setTimeout(function() {
//       method.call(context);
//     }, 1000);
// }

  function debounce(fn, dur){
    dur = dur || 100;
    var timer;
    // 闭包的作用： timer避免全局污染，将timer放入函数中，闭包使得原函数体的逻辑与timer分隔开
    // 从而实现了 原来 timer是全局变量，调用函数debounce时候函数内部可以读取timer变量
    // 现在timer内置了，debounce函数调用时使得该函数能读取 函数内部的值，需要返回function
    // 即将能读取内部变量的函数直接返回，就可以实现读取函数debounce内部的变量了；
    // 让该function 依据作用域/执行栈 去读取timer变量；

    // 这里的应用是 避免污染全局变量， 使用闭包隔离变量与 函数内部逻辑；
    return function(){
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, dur);
    }
  }
  

  /// debounce 改版：
  // 我想第一次执行时立刻执行，等到ns之后重新触发第二次执行(现在的是都等xs再执行)
  // 将这个api抽离出来，形成定制化

/**
 * func 约束函数
 * wait 间隔时间
 * immediate  第一次是否立即执行
 * 
 * 
 */
function debounce(func, wait, immediate) {

  var timeout;

  return function () {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
              timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
  }
}





 /**
  * 两者辨析：
  *     按一个按钮发送 AJAX：给 click 加了 debounce 后就算用户不停地点这个按钮，也只会最终发送一次；
  *                       如果是 throttle 就会间隔发送几次
  * 
  * 
  *    监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；
  *                     如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次
  * 
  */