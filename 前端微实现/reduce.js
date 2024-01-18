/**
 * 
 * 对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
 * 
 * 相当于map数组遍历的功能，每次获取的是当前值和上一个值（之前的累积值），
 * 而上一个值不是原数组数据，是处理后的数值；
 * 怎样处理：用户定义；
 * 
 * 当遍历第一个元素时L上个累计是？ 
 *  默认是数组的第一个元素，
 *  也可以自己传入参数 initialValue：用作第一个调用 callback的第一个参数的值
 * 
 * [0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr ); // 10
 * [0, 1, 2, 3, 4].reduce((prev, curr) => {return (prev + curr)},15 );//25
 * reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。
 * 如果提供initialValue，从索引0开始。
 */

 // 二维转一维
 var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    function(a, b) {
        return a.concat(b);
    },//( acc, cur ) => acc.concat(cur),
    []
);


// 统计每个元素出现次数
// 怎么想到的，太聪明了把。
// 桶计数原理，首先生成一个桶对象。初始值
// 遍历原数，如果有属性则修改桶
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});


// 还可以用于数组去重
// 初始化[] ，每次不相同的则push进去，所以每次判断上次累积值的最后一个元素是否与当前值相同
// 思路 和浪费空间的做法一致

// pollyfill 

// 
function reduce(callback,/*initValue*/){
    'use strict';
    if(this==null){
        throw new Error('Array.prototype.reduce called on null or undefined');
    }
    if(typeof callback !== 'function'){
        throw new Error('')
    }

    // this即数组
    let t = Object(this),// reduce.call(undefined, function() {}); 
        len = t.length >>> 0,// 保证绝对合法 为数字
        k = 0,
        value;
    if(arguments.length==2){// 传入了初始值
        value = arguments[1];
    }else{
        // value 寻找第一个值，怎么t又变成数组了？
        while(k<len&&!(k in t)){// a = [1,2],a[400] =1;
            k++;
        }
        if(k>len){
            throw new Error('一个空数组，且无初始值')
        }

        // 找到数组下的第一个有效
        value = t[k+1];
    }
    for(;k<len;k++){
        if(k in t){
            value = callback(value,t[k],k,t);
        }
    }
    return value;
    // callback(accumulator,curval,curIndex,arr)
}

let res = reduce.call([1,2],function(accum,curval){
    return accum + curval;      
})

console.log(res);