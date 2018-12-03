/**
 * 数组展开 flatten
 *  // 完全展开
    [[[1, 2], [1, 2, 3]], [1, 2]] => [1, 2, 1, 2, 3, 1, 2]
    // 只展开一层 不递归展开
    [[[1, 2], [1, 2, 3]], [1, 2]] => [[1, 2], [1, 2, 3], 1, 2]
 * 
 * 
 *  思路：
 *      1-递归
 *      2-toString
 *          如果数组里全是数字，则可以toString一下，
 *          然后将得到的[1, [2, [3, 4]]].toString() // "1,2,3,4"
 *          split即可得到
 *          但是仅限于数字的情况
 * 
 *      3-reduce
 *          使用reduce简化遍历代码
 * 
 *      4-es6的扩展符
 *          可讲数组扩展一层
 *          [].concat(...[1,2,[[3,4]]]) // 1,2,[3,4]
 * 
 *          在此基础上可以改进一下实现 
 * 
 * 
 *      5-underscore实现
 * 
 *      6-酷炫写法
 *          flatten = Function.apply.bind([].concat, [])
 * 
 *          相当于
                 function(arg) {
                    return [].concat(...arg)
                }
 */

/*
 // 方法 1
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        }
        else {
            result.push(arr[i])
        }
    }
    return result;
}


console.log(flatten(arr))



// 方法3
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

console.log(flatten(arr))


var arr = [1, [2, [3, 4]]];

function flatten(arr) {

    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

console.log(flatten(arr))


*/


const flatten = Function.apply.bind([].concat, [])
console.log(flatten([[[1, 2], [1, 2, 3]], [1, 2]]));
