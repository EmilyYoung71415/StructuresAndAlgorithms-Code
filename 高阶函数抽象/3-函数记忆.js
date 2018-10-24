/**
 * 函数记忆是指将上次的计算结果缓存起来，
 * 当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。
 * 
 */

 function memorize(f){
    let cache  = {};
    return function(){
        // 用参数和长度作为唯一的key
        let key  = arguments.length + [].join.call(arguments,",");
        console.log(key);
        if(key in cache){
            return cache[key]
        } else{
            return cache[key]  = f.apply(this,arguments);
        }
    }
 }


function add(){
   return Array.from(arguments).reduce((prev,next)=>{
        return prev+next;
    },0);
}
//let res =  add(1,2,3,4);
// let madd = memorize(add);
// let res = madd(1,2,3,4);
// console.log(res);



// underscore 的实现
function memorize2(func,hasher){
    function memoize(key){
        let cache = memoize.cache;
        // 默认以第一个参数为key
        let address = ''+(hasher?hasher.apply(this,arguments):key);
        if(!cache[address]){
            cache[address] = func.apply(this,arguments);
        }
        return cache[address];
    }
    memoize.cache = {};
    return memoize;
}


let addplus = memorize2(add,function(){
    // 自定义参数
    let arg = [].slice.call(arguments);
    return JSON.stringify(arg);
});
let a1 = addplus(1,2,3);
let a = addplus(1,2,30);
console.log(a1);