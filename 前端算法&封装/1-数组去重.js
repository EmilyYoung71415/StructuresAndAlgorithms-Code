/**
 * 数组去重
 * 
 * 不同版本的思路：
 *      1、双重循环，新来的元素和已去重后的每个数比较，不一样则push
 *      2、改进： 双重循环的内循环 用indexof查找
 *      3、排序后，比较相邻元素
 *      4、filter: 简化外层循环
 *      5、es6：Set
 *              [...new Set(arr)]
 *              Array.from(new Set(arr));
 */