/**
 * @desc 数组洗牌又名数组乱序，给定数组，将其打乱，返回新的数组
 */

 //splice
 /*
    思路：
        每次 random 一个下标，
            存入返回数组
            存入后在原数组中删除此数[保证每次random得到的值都是未重复的]
    性能：
        复杂度是 O(n^2)
 */
var testdata = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
function shuffle(arr) {
   var result = [];
 
   while (arr.length) {
     var index = ~~(Math.random() * arr.length);
     result.push(arr[index]);
     arr.splice(index, 1);
   }
 
   return result;
}

console.log(shuffle(testdata))


//基于Array.prototype.sort的随机排列
//==》 这种随机是错误的：可以证明越大的数字出现在越后面的概率越大
//==》 详情参看月影博文：数组的完全随机排列：https://www.h5jun.com/post/array-shuffle.html

function shuffle2(a) {
   return a.concat().sort(function(a, b) {
     return Math.random() - 0.5;
   });
}



//Fisher–Yates Shuffle
/*
   遍历数组元素，将其与之前的任意元素交换。
   因为遍历有从前向后和从后往前两种方式，
   所以该算法大致也有两个版本的实现
*/
//从前往后
function shuffle(array) {
   var _array = array.concat();
 
   for (var i = _array.length; i--; ) {
     var j = Math.floor(Math.random() * (i + 1));
     var temp = _array[i];
     _array[i] = _array[j];
     _array[j] = temp;
   }
 
   return _array;
}