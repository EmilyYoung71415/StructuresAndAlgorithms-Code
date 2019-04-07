/*****
 * 归并排序:
 * 思路:
 *    将数组不断对半拆分，直至子问题规模为1 -- 拆分的过程类二分
 *    从规模为1的数组到n/2,陆续归并 已经排好序的两个数组 (有序数组合并)
 *    
 * 递推方程: W(n) = 2W(n/2) + n-1  
 * 时间复杂度：最优O(N*logN)  最差O(N*logN)  平均O(N*logN) 
 * 空间  O(N+logN)// 临时数组 + 递归栈
 */

let arr = [6,3,5,9,1,4];
console.log(mergeSort(arr));

function mergeSort(arr){
    if(arr==null || arr.length<1) return [];
    mergeSortCal(arr,0,arr.length-1);
    return arr;

    function mergeSortCal(arr,left,right){
        if(left==right) return;

        let mid = left + ((right-left)>>1); 
        // 不断拆分
        mergeSortCal(arr,left,mid);
        mergeSortCal(arr,mid+1,right);
        // 两个相近规模的数组 合并
        merge(arr,left,mid,right);
    }

    /**
     * 两个有序数组的合并
     * arr1:[left,...,mid]
     * arr2:[mid+1,..,right]
     */
    function merge(arr,left,mid,right){
        let help = [],
            i = 0,
            p1 = left,
            p2 = mid+1;
        
        while(p1<=mid&&p2<=right){
            help[i++] = arr[p1]<arr[p2]?arr[p1++]:arr[p2++];
        }

        while(p1<=mid){
            help[i++] = arr[p1++];
        }

        while(p2<=right){
            help[i++] = arr[p2++];
        }

        // 回归到原数组
        for(let k=0;k<help.length;k++){
            arr[left + k] = help[k]; 
        }
    }   
}