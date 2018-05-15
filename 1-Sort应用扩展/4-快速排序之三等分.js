/**********************************************************************************
 *  @desc 荷兰国旗问题
 *  给出一组数 实现 [小于基准数，等于基准数，大于基准数]的三等分划分
 *     
 *  重在修改partition 环节
 *  @example 
 *     小于] 0 4 5 4 3 6 4  [大于
 *     流程：
 *          初始化： 默认以数组最后一个数作为划分值，并将其划到大于区域(最后在修正回来，节约一个变量)
 *                ===>      ]0 4 5 4 3 6 [4
 *          小于基准： swap(arr,++less,i)
 *                   // 与左边区域边界值的下一位交换，并less++扩大小于区，同时下标继续右移
 *          等于基准： 不管，继续遍历
 *          大于基准：
 *                  swap(arr, --more, l);         
 *                  // 当前值与右边区域的前一个值交换，
 *                  ===> 0 ] 4 (6) 4 3 5 [4
 *                  // 同时 --more 扩大大于区域
 *                  ===> 0 ] 4 (6) 4 3 [5 4
 *                  // 遍历下标仍为当前值
 *          最后：
 *              当 遍历下标与右边区域边界值相撞时
 *                  swap(arr, more, r);
 *                  // 将在右边区域的基准值和 大于区域的边界值交换
 *                  before： 0 3] 4 (4) [6 5 4
 *                  ===>   0 3] 4 (4) [4 5 6
 * 
 * 补充：
 *      随机快速排序--- 基准值是随机的
 *************************************************************************************/ 
// let arr = [2, 5, 6, 1, 20]
// quickSort(arr)
// console.log(arr)
function quickSort(arr){
    if(arr===null||arr.length<2){
        return;
    }
    quickSortCal(arr,0,arr.length-1);
}


function quickSortCal(arr,left,right){
    if(left<right){
        // 随机取 基准值 提高划分结果大影响范围
        swap(arr, left + Math.floor(Math.random() * (right - left + 1)), right);
        let p  = partition(arr,left,right);
        quickSortCal(arr,left,p[0]-1);
        quickSortCal(arr,p[1]+1,right);
    }
}

function partition(arr,left,right){
    let 
        less = left - 1,
        more = right;
    // less ++ more--
    // left为遍历指针 
    while(left<more){
        // 当前值小于基准值
        if(arr[left]<arr[right]){
            // 小于区域扩大，遍历指针右移
            swap(arr,++less,left++)
        }else if(arr[left]>arr[right]){
            // 大于区域扩大，遍历指针不动
            swap(arr,--more,left)
        }else{
            // 等于情况，不做处理，遍历指针右移
            left++;
        }
    }
    // 最后 将基准值移入中间区域
    swap(arr,more,right)
    // 返回当前 左右指针 即 中间等于区域的范围
    return [less+1,more];
}



function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}