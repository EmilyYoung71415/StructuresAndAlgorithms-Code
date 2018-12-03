/**
 *  @desc 经典快速排序
 *  基本思想：6 1 2 3 9 4 7 
 *      以第一个数如6为基准，将上数调整为 比6小的在左边，比6大的在右边
 *      
 *      快排为什么快？
 *              相比冒泡，每次都是交换都是跳跃式。比较和交换的次数变少
 *              设定基准值，每次比较之后只需再次迭代比较以基准为划分的剩下的两半。即基于二分思想
 * 
 *      快排与基本排序最大的进步我觉得在于：
 *              每次遍历的时候，不浪费每次的比较
 *              不是说以基准值 为准，找到符合要求的即可，同时他还基于基准值在每次遍历之后
 *              以 基准为划分， 将arr 分为了  <p的   [基准值p]  >p的
 *              
 *              每次遍历 同样是确定一个元素，即基准值 归位
 *              但是，遍历的次数少了很多，二维降解为了一维
 *              同时元素缩小的范围也是立竿见影，一半一半... 
 *      快排的最优与最差？
 *          最优： 选择的基准值 正好将 队列分为了 左右两边个数均等的两堆
 *          最差:  顺序 或者逆序时最差
 * 
 * 时间复杂度   最优O(N*logN)  最差O(n^2)  平均O(N*logN) 
 * 空间  O(logN)
 * 稳定  常规实现做不到稳定性
 *      
 *      改进：
 *          1、基准值：随机？ 或者 三等分：<p =p >p
 *          2、js一行代码?
 */

function quickSort(arr){
    if(arr===null||arr.length<2){
        return;
    }
    quickSortCal(arr,0,arr.length-1);
}

function quickSortCal(arr,left,right){
    if(left<right){
        let p = partition(arr,left,right);// 基准值
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
            // 以基准值为划分 小于等于的在一边，大于的在另一边            
            if (arr[i] <= p) {
                bounder++;
                // 这里是针对 中间有大于基准的数的时候 
                // 将当前的arr[i]与边界的下一个值交换
                // 如果是紧邻的，那么就是自己和自己交换
                swap(arr,bounder, i)
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
