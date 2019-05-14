/**
 * @desc 求排序后的最大相邻差值问题
 * 
 *       无序数组:[20,70,11,99]
 *       排序后：11 20 70 99 两两数相邻差值分别为 9 50 29    
 *       》》 return 50
 *      要求：数范围包含0正负; 时间复杂度O(n)
 * 
 * 思路：
 *      1) 桶的大小是由arr.length确定而不是arr的数值范围！！
 *          如上述例子，我们需要4+1 = 5 个桶
 *          max-min / 5 =20 20为一个步长
 *          0-19，20-29，30-39....
 *      2) 可以确定的是-
 *          首桶和尾桶肯定均非空
 *      3) 我们要确定最大相邻差
 *          即求桶与桶之间的差(即最大相邻差肯定不是出在桶内部的 因为条件2即保证了"跨桶"的存在)
 *          而最大相邻差 =  桶1.max ~(中间若干空桶) ~桶2.min
 *      4)  由上分析，
 *          1.我们不需要计算桶内部的排序结果 只需统计桶内部每次插入数之后的min max变化
 *          2.遍历桶的时候不必挨着遍历比较，只需求相邻的非空桶即可    
 * 回顾：
 *      一个求最大相邻差的问题被转换为了变形后的桶排序         
 */

let test = [-11,-60,70,79];
maxGap(test);
function maxGap(arr){
    if(arr ===null || arr.length<2){
        return;
    }
    let len = arr.length;
    let max = Math.max.apply(Math, arr);
    let min = Math.min.apply(Math, arr);

    if(min === max){
        return 0;
    }

    // 申请三个len长度的桶  max min hasNum [标注对象桶的信息
    let 
        hasNum = [],
        maxArr = [],
        minArr = [];
    // 初始化
    for(let i =0;i<len+1;i++){
        hasNum[i] = 0;//默认为无数
        maxArr[i] = 0;
        minArr[i] = 0;
    }

    // 遍历原始数据 开始将数据丢进桶里并顺便更新 被丢桶的信息
    let bid = 0;
    for(let i=0;i<len;i++){
        bid = bucket(arr[i],len,max,min);// 一个数应该进入的桶号
        maxArr[bid] = hasNum[bid]?Math.max(maxArr[bid],arr[i]):arr[i];
        minArr[bid] = hasNum[bid]?Math.min(minArr[bid],arr[i]):arr[i];
        hasNum[bid]=1;
    }

    // 已知装好各就其位数据的桶，我们现在遍历桶
    let 
        result = 0,
        lastMax = maxArr[0];//上个相邻桶里的最大数
    for(let i=1;i<len+1;i++){
        if(hasNum[i]){
            result = Math.max(result,minArr[i]-lastMax);
            lastMax = maxArr[i];
        }
       
    }
    return result;
}

// 数值对应 --- 将数值num丢进适合他的桶
// 如 11 20 70 99  的 70

// 0     1    2     3(x)    4
// 0-19 20-39 40-59 60-79  80-99
// 11                70     99

/*
       x-0          4-0
    ————————  =   ————————— ===》 x = [4/(99-11)] x 70
      70-11         99-11
*/
function bucket(num,len,max,min){
     let index = Math.ceil((num - min) *len/(max-min));
     return index;
}
