/**
 * @desc 基数排序
 *    思想：基于基数的排序,每个数的个位、百位、千位等均是由0-9的数字组成
 *          桶为9个桶，分别为0-9
 *          第一趟比较，将个位数为0的依次放入0桶，1放入1桶...
 *                     然后输出桶内的数
 *          第二趟 以十位数为基准
 *                 .....
 *          重复直至排序
 *  基数排序的效率和初始序列是否有序没有关联
 *  稳定
    // 最差时间复杂度 ---- O(n * dn)
    // 最优时间复杂度 ---- O(n * dn)
    // 平均时间复杂度 ---- O(n * dn)
    // 所需辅助空间 ------ O(n * dn)
    // 稳定性 ----------- 稳定
 */

let arr = [10,201,1322,4025,45];
//radixSort(arr);
//console.log(arr)
function radixSort(arr){
    if(arr===null||arr.length<2){
        return ;
    }
    radixCal(arr,0,arr.length-1,maxbits(arr));

}

// 数组
function radixCal(arr,begin,end,digit){
    let radix  = 10;
    let count = new Array(radix);
    let bucket = new Array(end-begin+1);
    // 外层循环，重复maxbits轮
    for(let d = 1;d<=digit;d++){
        // 初始化计数桶count
        for(let i=0;i<radix;i++){
            count[i] = 0;
        }
        // 统计各个桶将要装入数据的个数
        for(let i=begin;i<=end;i++){
            // 获得第d位上的数
            let j = getDigit(arr[i],d);
            count[j]++;
        }
        //  count[i]表示第i个桶的右边界索引
        for(let i=1;i<radix;i++){
            count[i] = count[i] + count[i-1];
        }
        
        // 将数据依次装入桶中
        // 从右到左 保证排序稳定性
        for(let i = end;i>=begin;i--){
            let j = getDigit(arr[i],d);
            // 放入对应的桶中，count[j]-1是第j个桶的右边界索引
            bucket[count[j]-1] = arr[i];
            count[j]--;
        }

        // 将分配好的数据再倒出来
        for(let i = begin,j=0;i<=end;i++,j++){
            arr[i] = bucket[j];
        }
    }
}

// 数值value上的第x位上的数
function getDigit(value,x){
    // 18293,2
    // 18293/10 = 1829 ; 1829%10 =9
    return ~~(value / Math.pow(10, x - 1)) % 10;
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