/**
 *  @desc 快速排序
 *  基本思想：6 1 2 3 9 4 7 
 *      以第一个数如6为基准，将上数调整为 比6小的在左边，比6大的在右边
 *      
 *      快排为什么快？
 *              相比冒泡，每次都是交换都是跳跃式。比较和交换的次数变少
 *              设定基准值，每次比较之后只需再次迭代比较以基准为划分的剩下的两半。即基于二分思想
 *      转换为程序语言；
 *              我们要不断划分"一半一半"。则很明显使用递归
 *              刚开始是quickSort(第一个数，最后一个)
 *              划分之后,quickSort(左边的第一个数，中间值)
 */

function quickSort(arr){
    if(arr===null||arr.length<2){
        return;
    }
    quickSortCal(arr,0,arr.length-1);
}

function quickSortCal(arr,left,right){
    if(left<right){
        let p = partition(arr,left,right);// 第一次分割，并将基准值返回
        quickSortCal(arr,left,p-1);
        quickSortCal(arr,p+1,right);
    }
}

function partition(arr, left, right) {
    if (left < right) {
        let
            p = arr[right],
            bounder = left - 1;// <= 区域的右边界
        for (let i = left; i <= right; i++) {
            if (arr[i] <= p) {// 以基准值为划分 小于等于的在一边，大于的在另一边
                swap(arr, ++bounder, i)
            }
        }
        return bounder;
    }

}


function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}



/**
 * @desc  JS实现快排
 * 基本思路：两个数组right、left;一个基准值mid
 *          每次遍历时比mid大的数仍在right里，比mid小的仍在left里。
 *          连接left、mid、right完成第一轮比较。
 *          剩下的，递归调用快排，输入left、right。递归出口是当前数组长度<=1,分无可分。
 */


function quickSort_js(arr) {
    if (arr.length <= 1) return arr;

    var
        mid = ~~(arr.length / 2),
        midItem = arr.splice(mid, 1)[0], //中间值作为基准值并将其从原数组中删除
        left = [],
        right = [];

    arr.forEach(element => {
        if (element < midItem) {
            left.push(element);
        } else {
            right.push(element);
        }
    });

    var
        _left = quickSort_js(left),
        _right = quickSort_js(right);

    //合并
    return _left.concat(midItem, _right);
}


/**
 * @desc  一行代码实现快排
 * 知识点:   强大的api。
 *          filter
 *          arr.slice(1) //未定义start即从下标1到数组结尾的所有数
 */

function quickSort_oneLine(a) {
    return a.length <= 1 ? a :quickSort_oneLine(a.slice(1).filter(item => item <= a[0])).concat(a[0], quickSort_oneLine(a.slice(1).filter(item => item > a[0])));
}