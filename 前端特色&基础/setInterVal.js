/**
 * settimeout 模拟实现setinterval
 * 
 * 
 * 每个setTimeout产生的任务会直接push到任务队列中；
 * 而setInterval在每次把任务push到任务队列前，
 * 都要进行一下判断(看上次的任务是否仍在队列中)
 * 
 * 
 * setinterval缺点：
 *  使用setInterval时，某些间隔会被跳过；
    可能多个定时器会连续执行
 */

/**
 * func 循环执行的函数
 * time 执行间隔时间
 */
 function _setInterVal(func,time){
    let _timer;
    if(typeof func==='function'){
        _timer = setTimeout(function(){// 不能是箭头函数
            _timer = setTimeout(arguments.callee,time);
            func();
        },time)
    }
    this.stop = function(){
        clearTimeout(_timer);
    }
 }
let a = 1;
let p = new _setInterVal(()=>{
    console.log(a++)
    if(a==3){
        p.stop()
    }
},1000)
