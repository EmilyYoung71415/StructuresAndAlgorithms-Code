/**
 * jq的each：
 *      遍历数组和对象
 *      与es6foreach对比：
 *          jq的可以中止
 * 
 * 思路：
 *      判断参数类型：数组 or 对象 or 类数组对象
 *      
 *      数组 for循环，对象 for in
 * 
 * 
 *      
 */

function each(obj, callback) {
    var length, i = 0;

    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}