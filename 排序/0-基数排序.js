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
let arr = [329,457,657,839,436,720,355];
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
        let count = new Array(10).fill(0);// 生成10个桶 
        
        for(let i=0;i<len;i++){
            // 取得当前比较位比如456在第2趟比较的是5
            // count[5]++
            let j = ~~(arr[i]/exp)%10
            count[j]++;
        }
        for(let i=1;i<10;i++){// count[i]表示第i个桶的右边界索引
            count[i] += count[i-1]
        }

        // 将数据依次装入桶中 从右到左 保证排序稳定性
        for (let i = len-1; i >= 0; i--){ 
            // 放入对应的桶中，count[j]-1是第j个桶的右边界索引
            let j = ~~(arr[i]/exp)%10;// 数值第exp位上的数字
            output[count[j] - 1] = arr[i]; 
            count[j]--; 
        } 
        // 再把分配好的倒出来
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