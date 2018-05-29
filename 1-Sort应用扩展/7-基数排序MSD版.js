/**
 * @desc 基数排序MSD版本
 * 
 * MSD的方式与LSD相反，是由高位数为基底开始进行分配，但在分配之后并不马上合并回一个数组中，
 * 而是在每个“桶子”中建立“子桶”，将每个桶子中的数值按照下一数位的值分配到“子桶”中。
 * https://www.cnblogs.com/Braveliu/archive/2013/01/21/2870201.html
 * 
 * 思路：
 *      先根据最高位关键码K1排序，得到若干对象组，对象组中每个对象都有相同关键码K1
 *      再分别对每组中对象根据关键码K2进行排序，按K2值的不同，
 *           再分成若干个更小的子组，每个子组中的对象具有相同的K1和K2值。
 *      依此重复，直到对关键码Kd完成排序为止。
 *      最后，把所有子组中的对象依次连接起来，就得到一个有序的对象序列。
 * 乍一看和归并好像
 *      最低位LSD优先法
 *      首先依据最低位关键码Kd对所有对象进行一趟排序，
        再依据次低位关键码Kd-1对上一趟排序的结果再排序，
        依次重复，直到依据关键码K1最后一趟排序完成，就可以得到一个有序的序列。
        使用这种排序方法对每一个关键码进行排序时，[不需要再分组，而是整个对象组]。
 */

 let res  = radixSortMsd([12, 14, 54, 5, 6, 3, 9, 8, 47, 89])
console.log(res)
 function radixSortMsd(arr){
    if(arr===null||arr.length<2){
        return ;
    }
    return radixCal(arr,0,arr.length-1,maxbits(arr));
 }

 function radixCal(arr,begin,end,d){
    let radix  = 10;
    let count = new Array(radix);
    let bucket = new Array(end-begin+1);

    // 置空桶
    for(let i=0;i<radix;i++){
        count[i] = 0;
    }


    // 统计各个桶需要装的元素的个数
    for(let i = begin;i<=end;++i){
        count[getDigit(arr[i],d)]++;
    }

    //求出桶的边界索引，count[i]值为第i个桶的右边界索引+1
    for(let i=1;i<radix;i++){
        count[i] = count[i] + count[i-1];
    }

    // 从右边到左扫描 保证稳定
    for(let i = end;i>=begin;--i){
        let j = getDigit(arr[i], d);//求出关键码的第d位的数字， 例如：576的第3位是5
        bucket[count[j]-1] = arr[i];  //放入对应的桶中，count[j]-1是第j个桶的右边界索引
        --count[j];                   //第j个桶放下一个元素的位置(右边界索引+1)
    }

    //注意：此时count[i]为第i个桶左边界    
    for(let i = begin,j=0;i<=end;i++,j++){
        arr[i] = bucket[j];
    }

    // 对各桶中的数据进行再排序
    for(let i=0;i<radix;i++){
        let p1 = begin + count[i];// 第i个桶的左边界
        let p2 = begin + count[i+1]-1;// 第i个桶的右边界

        if(p1<p2&&d>1){
            //对第i个桶进行递归调用 基数排序，数位降1
            radixCal(arr, p1, p2, d-1);
        }
    }
    return arr;
 }



 
// 数值value上的第x位上的数
function getDigit(value,x){
    return ~~(value / ~~(Math.pow(10, x - 1))) % 10;
}

// 数组中的最大位数[确定循环多少次
function maxbits(arr){
    let maxValue = Math.max.apply(Math,arr);

    let res = 0;
    while(maxValue!=0){
        res++;
        maxValue = ~~(maxValue/10);
    }
    return res;
}