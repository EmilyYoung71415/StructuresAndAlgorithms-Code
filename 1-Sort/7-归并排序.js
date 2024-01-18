/**
 * @desc 归并排序
 * 基本思想：
 *         分而治之，即判断一整块数的排序很难，但是我可以不断迭代得到最后两两的组合
 *         排好序的两个数再依次和另外两个相合并
 * 
 * 代码思维：
 *         先分而治之：不断分解，直到只剩最后两个一组
 *          对排好的序两队进行合并
 */


//合并
function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

function mergeSort(arr) {
    var len = arr.length;
    //返回数组值
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    //mergeSort(left), mergeSort(right) 将值依次划分直至数组只剩一个值
    return merge(mergeSort(left), mergeSort(right));
}

/**
 * @desc 后记—栈溢出问题
 * mergeSort()函数会导致很频繁的自调用。一个长度为n的数组最终会调用mergeSort() 2*n-1次，
 * 如果需要排序的数组长度很大会在某些栈小的浏览器上发生栈溢出错误
 * 
 * 解决：
 *      把递归算法改用迭代实现是解决栈溢出错误
 *      即修改合并时的递归为迭代，虽然慢一点但是不受调用栈限制
 * 
 * 
 */
function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] < right[0])
            result.push(left.shift());
        else
            result.push(right.shift());
    }

    return result.concat(left, right);
}

function mergeSort(a) {
    if (a.length === 1)
        return a;

    var work = [];
    for (var i = 0, len = a.length; i < len; i++)
        work.push([a[i]]);

    work.push([]); // 如果数组长度为奇数

    for (var lim = len; lim > 1; lim = ~~((lim + 1) / 2)) {
        for (var j = 0, k = 0; k < lim; j++, k += 2)
            work[j] = merge(work[k], work[k + 1]);

        work[j] = []; // 如果数组长度为奇数
    }

    return work[0];
}

console.log(mergeSort([1, 3, 4, 2, 5, 0, 8, 10, 4]));







/**
 * @desc arguments.callee()
 * 使用 arguments.callee(返回正被执行的 Function 对象) 来代替函数名调用
 * 递归调用时浏览器的栈大小限制，可以用代码去测试
 */

var cnt = 0;
try {
    (function () {
        cnt++;
        arguments.callee();
    })();
} catch (e) {
    console.log(e.message, cnt);
}
// chrome: Maximum call stack size exceeded 35992
// firefox: too much recursion 11953

/**************arguments.callee()**********************/
var sum = function (n) {
    if (n <= 0) return 1;
    else return n + arguments.callee(n - 1)
}
//比较一般的递归函数：
var sum = function (n) {
    if (1 == n) return 1;
    else return n + sum(n - 1);
}