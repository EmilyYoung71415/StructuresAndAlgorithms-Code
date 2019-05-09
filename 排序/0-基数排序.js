/***
 * 基数排序
 * 不是基于比较，而是采用多关键字排序思想（基于关键字各位的大小进行比较
 * 借助 分配、收集两个操作对单逻辑关键字进行排序
 * 在线可视化：https://visualgo.net/en/sorting
 * 
 * 基排序 分为 最高位优先(MSD) 和 最低位优先(LSD)
 * 如最低位优先的变化过程:
 *      原始    个位    十位    百位/最终
 *      329     720     720     329
 *      457     355     329     355
 *      657     436     436     436
 *      839  => 457 =>  839  => 457
 *      436     657     355     657
 *      720     329     457     720 
 *      355     839     657     839
 */
let arr = [1,23,4];
radixsort(arr);
console.log(arr)
function radixsort(arr){
    let m = getMax(arr);// Math.max.apply(null,arr)
    for(let exp = 1;~~(m/exp)>0;exp*=10){// 依次从个位,十位..百位
        countSort(arr,exp);
    }

    // 将所有待比较数值统一为同样的数位长度
    // 数位较短的数前面补零 然后从最低位开始，依次进行一次排序
    function countSort(arr,exp){
        let output = [],len = arr.length;
        let count = new Array(10).fill(0);// 生成10个桶 记录该趟0~9的出现次数
        
        for(let i=0;i<len;i++){
            // 取得当前比较位比如456在第2趟比较的是5
            // count[5]++
            count[(arr[i]/exp)%10]++;
        }
        for(let i=1;i<10;i++){
            count[i] += count[i-1]
        }

        for (let i = len-1; i >= 0; i--){ 
            // 按照位指的数归位 
            output[count[ (arr[i]/exp)%10 ] - 1] = arr[i]; 
            count[ (arr[i]/exp)%10 ]--; 
        } 

        for(let i=0;i<len;i++){
            arr[i] = output[i];
        }
    }

    function getMax(arr){
        let max = arr[0]
        for(let i=1;i<arr.length;i++){
            if(arr[i]>max){
                max = arr[i]
            }
        }
        return max;
    }
}