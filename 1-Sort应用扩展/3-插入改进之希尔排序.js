/**
 * @desc 希尔排序
 *      希尔排序，也叫递减增量排序
 * 
 *      回顾一下插入排序的性质
 *          1.插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率
 *          2.插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位
 * 
 *      希尔排序通过将比较的全部元素分为几个区域来提升插入排序的性能(加大步长
 *      当刚开始元素很无序的时候，步长最大，所以插入排序的元素个数很少，速度很快；
 *      当元素基本有序了，步长很小，插入排序对于有序的序列效率很高
 * 
 *      希尔排序的关键不是随机分组各自排序，而是将某个增量的记录组成子序列，
 *          实现跳跃式移动
 *   时间复杂度   最优O(n) 
 * @example
 *                        8 9 1 7 2 3 5 4 6 0
 * grap=10/2 = 5(步长)    [8,3][9,5][1 4][7 6][2 0]
 * ==>                    3 5 1 6 0 8 9 4 7 2
 * grap=5/2=2             [3 1 0 9 7][5 6 8 4 2]
 * ===>                    0 2 1 4 3 5 7 6 9 8
 * grap=2/2=1             0 1 2 3 4 5 6 7 8 9  
 */

//  let arr = [8,9,1,7,2,3,5,4,6,0];
//  shellSort(arr)
 function shellSort(arr){
    if(arr===null||arr.length<2){
        return;
    }

    let len = arr.length;
    for(let grap = ~~(len/2);grap>0;grap= ~~(grap/2)){
        //从第gap个元素开始，逐个跨组处理
        for(let i = grap;i<len;i++){
            let index = i;
            // 对index连接的一群数为组进行插入排序
            while(index-grap>=0&&arr[index]<arr[index-grap]){
                swap(arr,index,index-grap);
                index -= grap;
            }
        }
    }
 }


 function swap(arr,index1,index2){
    [arr[index1],arr[index2]] = [arr[index2],arr[index1]];
 }