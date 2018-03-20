/**
 *  @desc 桶排序 
 *  @param array 数组
 *  @param num 桶的数量
 *  基本思想：
 *      如果所有的数是10以内的，然后申请10个桶，遍历到相应数时就在数组的相应下标计数。
 *      输出时遍历木桶，如果木桶里没有数则不输出，有数则遍历输出（有可能一个桶里有很多数）
 * 
 *  扩展； 
 *      如果数跨度很大，比如1-100等那我岂不是要申请100个桶？其次，如果数是小数呢？该丢进哪个桶
 *      ===》分而治之策略，将数据按照一定步长，分成几个桶（之前是一个数对应一个桶，现在可能是10-50均在一个桶里）
 *           然后桶里面的数再进行排序（递归桶排序、插入排序等等）
 *  总结：简单、快速      
 */

function bucketSort(array, num) {
　　if (array.length <= 1) {
　　　　return array;
　　}
　　var len = array.length, 
        buckets = [], 
        result = [], 
        min = max = array[0], 
        space, //步长
        n = 0;

　　var index = Math.floor(len / num) ;
　　while(index<2){
　　　　num--;
　　　　index = Math.floor(len / num) ;
　　}

　　for (var i = 1; i < len; i++) {
　　　　min = min <= array[i] ? min : array[i];
　　　　max = max >= array[i] ? max : array[i];
　　}
　　space = (max - min + 1) / num;  //步长
　　for (var j = 0; j < len; j++) {
　　　　var index = Math.floor((array[j] - min) / space);
　　　　if (buckets[index]) { // 非空桶，插入排序
　　　　　　var k = buckets[index].length - 1;
　　　　　　while (k >= 0 && buckets[index][k] > array[j]) {
　　　　　　　　buckets[index][k + 1] = buckets[index][k];
　　　　　　　　k--;
　　　　　　}
　　　　　　buckets[index][k + 1] = array[j];
　　　　} else { //空桶，初始化
　　　　　　buckets[index] = [];
　　　　　　buckets[index].push(array[j]);
　　　　}
　　}
　　while (n < num) {
　　　　result = result.concat(buckets[n]);
　　　　n++;
　　}

　　return result;
}

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bucketSort(arr,4));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50];