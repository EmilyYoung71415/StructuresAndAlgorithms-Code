/*****
 * 在一个二维数组中，
 * 每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * 
 * 输入数组：
    [
        [1,2,8,9]，
        [2,4,9,12]，
        [4,7,10,13]，
        [6,8,11,15]
    ]
    如果输入查找数值为7，则返回true，
    如果输入查找数值为5，则返回false。
 * 
 */

/****
 * way1
 * 双重循环遍历开始
 * 当在任意中间棋点时 如果target>cur 那么目标元素在右边或下边
 * ===> 确定的区域存在重叠 且不是方块状的难以控制循环走向
 * 
 * way2
 * 换一个循环方式
 * 每次在方块里确定右上角的元素为比较值cur,如果cur>target
 * 那么cur这一列都被排除，目标区域缩小一列，当前cur变为8
 * 当cur=2时，2<7，那么2这一行被排除
 * 直至方块的右上角元素为target为止
 */
let arr = [
    [1,2,8,9],
    [2,4,9,12],
    [4,7,10,13],
    [6,8,11,15]
]
console.log(searchArray(arr,5))
function searchArray(array,target){
    if(array==null||array.length<1||array[0].length<1) return false;
    let 
        n = array.length-1,
        row = array.length-1,
        col = array[0].length-1;
    while(row>=0&&col>=0){
        let cur = array[n-row][col];
        if(cur==target){
            return true;
        }else if(cur>target){
            col--;
        }else{
            row--;
        }
    }
    return false;
}

/*****
 * 总结：
 * 核心在于发现每个子矩阵右上角的数的性质:x左边的数都小于等于x，x下边的数都大于等于x
 * 时间复杂度：
 * 每一步会排除一行或者一列，矩阵一共有 n 行，m 列，所以最多会进行 n+m 步。
 * 所以时间复杂度是 O(n+m)。
 * 
 */