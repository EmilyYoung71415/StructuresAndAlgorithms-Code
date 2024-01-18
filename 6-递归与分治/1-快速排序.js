/****
 * 快排思想：
 * 每次遍历以基准值为参考，将数组分为 [...小于基准值的,基准值,...大于基准值的]
 * 然后小于基准值的arrL 与 大于基准值的arrR 作为输入，又进行这样的划分
 * 
 * 每轮将输入数组调整为以基准值为划分的新数组，实际做的有用功:
 * 1、每轮基准值回到了正确位置，即每轮归位一个元素
 * 2、归为基准值的过程顺便 打包遇见的所有元素，将他们划分到相应区域
 * 
 * 需要的状态量:
 * 1、基准值归位后的位置 ==> 用于划分两个子数组
 * 2、每轮比较的开始下标 和 结束下标 (因为是不断划分的过程，参照二分)
 * 
 * 具体的基准值归位执行步骤：
 * 1、选择数组左边第一个数作为 基准值
 * 2、i,j两个标记分别从数组左右两头向中间探测，
 *    i = left, j = right
 *    j先行，在往左走的过程中遇到的第一个 < 基准数的元素 停下来
 *    i再行, 在往右...................  > 基准数的元素 停下
 * 3、交换i、j所指的两个元素
 * 4、重复2-3
 * 5、停止条件:i、j相遇
 * 6、相遇之后: 相遇的位置即基准值归位的位置
 * 
 * ------------------------------------------------
 * 基准值归位方法2:
 * 基准值为数组最右的数
 * 遇到一个<基准的就扩大小于范围的边界,
 * 遇到>于基准的不管 i继续++，一旦又遇到<基准的 ，小于范围边界扩大 并把小于基准的数纳入麾下
 * 
 */

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

    function swap(arr,i,j){
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
}