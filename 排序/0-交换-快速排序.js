/****
 * 快速排序
 * 每一轮比较 选择一个数组元素作为基准数
 * 
 * 每轮比较交换后 确定一个元素 归到正确位置
 * 同时! 还会 以基准为 分割，将数组元素排列为 [比基准值小的数,基准值.比基准值大的数]
 * 
 * 代码实现:
 * 1、分治的思想，以为基准为分割 不断地将数组规模变小
 * 2、以基准值为界划分数组:
 *      两个骑士向中间靠拢
 *      Lomuto划分
 * 
 * 
 */
const swap = require('./swap');
let arr = [6,3,5,9,1,4];
console.log(quickSort(arr));

function quickSort(arr){
    if(arr==null || arr.length<1) return [];
    quickSortCal(0,arr.length-1);
    return arr;

    function quickSortCal(lIndex,rIndex){
        if(lIndex>=rIndex) return ;
        let p = partition(lIndex,rIndex);
        quickSortCal(lIndex,p-1);
        quickSortCal(p+1,rIndex);
    }

    // 基准归位两个哨兵法-类二分
    function partition1(l,r){
        if(r<l) return;
        let i = l,
            j = r,
            pivot = arr[l];
        
        while(i!=j){
            // j 先行
            while(arr[j]>=pivot&&i<j){
                j--;
            }

            while(arr[i]<=pivot&&i<j){
                i++;
            }

            if(i<j){
                // 交换 j 、i
                swap(arr,i,j);
            }
        }
        // 基准值归位
        swap(arr,l,i);
        return i;
    }   

    // 基准归位扩大边界法-Lomuto划分
    function partition(l,r){
        if(l>r) return;
        let pivot = arr[r],
            bounder = l-1;
        
        for(let i=l;i<=r;i++){
            if(arr[i]<=pivot){
                bounder++;
                swap(arr,bounder,i);
            }
        }
        return bounder;
    }
}