/**
 * 只执行一次函数once
 * 背景：
 *      有很多只执行一次的函数，虽然业务逻辑不一样但是都有个大前提背景，
 *      即函数只能被执行一次，比如:点击一次消失、点击提交、只能自增一次的函数等
 *                        我们希望：该函数只能执行一次，之后无论再怎么点击或自增都不再起作用
 * 
 * 
 * 思路：
 *      判断函数是否执行过，一旦执行则销毁函数
 *      高阶函数once
 * 
 */
function once(fn){
    return function(...args){
        if(fn){
            let ret = fn.apply(this,args);
            fn = null;
            return ret;
        }
    }
}

