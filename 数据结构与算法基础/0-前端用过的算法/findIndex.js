/**
 * es6的findindex
 *      [12, 5, 8, 130, 44].findIndex(isBigEnough);  // 3
 * 
 *      function isBigEnough(element) {
            return element >= 15;
        }
    一个回调函数：
    思路：
        遍历一遍返回符合要求的数
 */


function findIndex(array, predicate, context) {
    for (var i = 0; i < array.length; i++) {
        if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
}

console.log(findIndex([1, 2, 3, 4], function(item, i, array){
    if (item == 3) return true;
})) // 2


// 优化一下，实现一个函数，能findIndex and findlastindex；

// 怎么根据参数的不同，在同一个循环中实现正序、逆序遍历

function createIndexFinder(dir) {
    return function(array, predicate, context) {

        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;

        for (; index >= 0 && index < length; index += dir) {
            if (predicate.call(context, array[index], index, array)) return index;
        }

        return -1;
    }
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);



// 进阶 sortIndex
// 完成filter函数功能，提供接口，用户可以定义需要搜索的item(筛选的条件)
/**
 * 期待效果：
 *  var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

    var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
        return stooge.age
    });
 */

function cb(func, context) {
    if (context === void 0) return func;
    return function() {
        return func.apply(context, arguments);
   };
}

// iteratee是回调函数，
function sortedIndex(array, obj, iteratee, context) {

// cb 单独独立，对每个元素进行处理，多传入多一个context
// 目的是为了解决 this指向问题
 iteratee = cb(iteratee, context)

 var low = 0, high = array.length;
 while (low < high) {
     var mid = Math.floor((low + high) / 2);
     if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
     else high = mid;
 }
 return high;
};


// 同理，indexof可以参照createIndexfinder;