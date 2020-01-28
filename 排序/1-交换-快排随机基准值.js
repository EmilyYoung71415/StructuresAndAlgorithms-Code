/***
 * 改变快排的划分算法
 * 使得每次选取的基准值是随机的
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
        // 随机将 lIndex的值与 数组的其余元素交换
        swap(arr, lIndex, rIndex-(Math.random() * (rIndex - lIndex + 1))>>0);
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