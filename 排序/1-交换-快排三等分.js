/***
 * 给出一组数 实现 [小于基准数，等于基准数，大于基准数]的三等分划分
 * 荷兰国旗问题的本质:编写O(n)算法使得条块按照 红 白 蓝 顺序排好
 * 思路:
 *  基本思想：小于基准的移到左边，大于基准的移到右边，不用考虑等于基准的
 *           遍历完一遍自然就划分好了
 * 
 *  用处：解决近乎有序的数组和有大量重复数组的元素排序问题
 */
/******
 * 三路快排
 * 
 * 小于] 0 4 5 4 3 6 4  [大于
 * 初始化:默认以数组最后一个数作为划分值，并将其划到大于区域
 *      ===>      ]0 4 5 4 3 6 [4
 * 小于基准： swap(arr,++less,i)
 * 等于基准： 不管，继续遍历
 * 大于基准：
 *     swap(arr, --more, l);         
 * 最后：当遍历下标与右边区域边界值相撞时
 *     swap(arr, more, r);// 将在右边区域的基准值和 大于区域的边界值交换
 *     before： 0 3] 4 (4) [6 5 4
 *      ===>   0 3] 4 (4) [4 5 6
 * 
 * 所以 let p = partion(xxx)// 这里的p 应该存有 右边界和左边界
 * 
 */

const swap = require('./swap');
let nums = [2,1,2,0,1,0,1]
console.log(quickSort(nums));
function quickSort(nums){
    if(nums==null || nums.length<2) return;
    quickSortCall(nums,0,nums.length-1);
    return nums;
    function quickSortCall(arr,left,right){
        if(left>right) return ;
        let p  = partition(arr,left,right);
        quickSortCall(arr,left,p[0]-1);
        quickSortCall(arr,p[1]+1,right);
    }

    function partition(arr,left,right){
        let 
            pivot = arr[right],
            less = left - 1,
            more = right;// 以arr[right]为基准值


        for(let i=left;i<more;i++){
            if(arr[i]<pivot){
                swap(arr,++less,i);
            }
            else if(arr[i]>pivot){
                // 大于区域扩大，遍历指针不动
                swap(arr,--more,i--);
            }
            // 等于情况 不管
        }

        // 最后 将基准值移入中间区域
        swap(arr,more,right)

        return [less+1,more];
    }
}
