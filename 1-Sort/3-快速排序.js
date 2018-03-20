/**
 *  @desc 快速排序
 *  基本思想：6 1 2 3 9 4 7 
 *      以第一个数如6为基准，将上数调整为 比6小的在左边，比6大的在右边
 *      ===>    申请两个数组,遍历剩下的数，如果比基准大则将数push到right数组里，否则push到left数组
 *      ===>    没有额外空间：
 *              两个哨兵i、j，分别从剩下列队的两头出发，一个从1出发，一个从7出发
 *              右边的哨兵先出发，直至遇到比6小的数字(找寻不属于右边大部落的走丢了的数)，停下。
 *              左边的再出发，直至遇到比6大的数字(不属于左边小部落的走丢了的数)，停下
 *              然后左边哨兵和右边哨兵互相交换人质[可以这样理解]
 *              交换之后，两个哨兵继续向中间靠拢(记住不是同时出发哦)，直至遇见。
 *              即交换遇见的那个中间值和基准值
 *              如此实现以基准为分界线的划分
 *      快排为什么快？
 *              相比冒泡，每次都是交换都是跳跃式。比较和交换的次数变少
 *              设定基准值，每次比较之后只需再次迭代比较以基准为划分的剩下的两半。即基于二分思想
 *      转换为程序语言；
 *              我们要不断划分一半一半。则很明显使用递归
 *              刚开始是quickSort(第一个数，最后一个)
 *              划分之后,quickSort(左边的第一个数，中间值)
 */


function quickSort(array, left, right) {　　
    if (left > right) return ;　　
    var i = left,
        j = right,
        pivot = array[left];//基准值
    while(i!=j){
        while(array[j]>=pivot&&i<j){
            j--;
        }
        while(array[i]<=pivot&&i<j){
            i++;
        }
        if(i<j){
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    //重置基准值        
    array[left] = array[i];
    array[i] = pivot;
    quickSort(array, left, i - 1);　　　　
    quickSort(array, i + 1, right);　　
    return array;
}
var arr = [6, 2, 1, 8, 4, 5, 1, 7]
console.log(quickSort(arr, 0, arr.length - 1)); 