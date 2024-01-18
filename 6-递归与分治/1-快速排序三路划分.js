/*****
 * leetcode:75
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，
 * 使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列
 * 使用整数 0、 1 和 2 分别表示红色、白色和蓝色
 * 
 * exp:
 *  输入: [2,0,2,1,1,0]
    输出: [0,0,1,1,2,2]
 * 
 * 类似题目:
 *      给出一组数 实现 [小于基准数，等于基准数，大于基准数]的三等分划分m
 *      荷兰国旗:
 *          要求对字符R、W、B构成的任意数组排序，要求所有R在最前面,W在最中间，B在最后面
 * 
 * 要求:
 * 1.对数组就地排序
 * 2.尽量使用常数空间
 */

/***
 * 思路:
 * way1.计数排序的思想，遍历一遍得到0.1.2的各有个数,按照个数重写数组
 * way2.快排划分思想
 *  快排的划分是选择一个基准值 使得每次划分过程形成 [小于基准数，基准数，大于基准数]
 * way3:快排的改进-三路快排
 *  基本思想：小于基准的移到左边，大于基准的移到右边，不用考虑等于基准的
 *           遍历完一遍自然就划分好了
 *  解决近乎有序的数组和有大量重复数组的元素排序问题
 */
let nums = [2,0,2,1,1,0]
sortColors(nums)
console.log(nums); 

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
// way3:三路快排 
function sortColors(nums){
    if(nums==null || nums.length<2) return;
    sortColorsCall(nums,0,nums.length-1);

    function sortColorsCall(arr,left,right){
        if(left>right) return ;
        let p  = partition(arr,left,right);
        sortColorsCall(arr,left,p[0]-1);
        sortColorsCall(arr,p[1]+1,right);
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
    
    function swap(arr,i,j){
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
}


function sortColors1(nums){
    if(nums==null || nums.length<2) return;
    let bucket = [];//存放0，1，2占的个数 bucket[3] = 1 表示元素3有1个
    
    nums.forEach(item => {
        bucket[item] = (bucket[item]||0) + 1;
    });

    let index = 0;
    for(let i=0;i<bucket.length;i++){
        if(bucket[i]==null) continue;
        while(bucket[i]--){
            nums[index++] = i;
        }
    }
}

// way2:二路快排
function sortColors2(nums){
    if(nums==null || nums.length<2) return;
    sortColorsCall(nums,0,nums.length-1);

    function sortColorsCall(nums,left,right){
        if(left>=right) return;
        let p = partition(nums,left,right);
        sortColorsCall(nums,left,p-1);
        sortColorsCall(nums,p+1,right);
    }

    function partition(arr,left,right){
        if(left>=right) return
        let bounder = left-1,
            pivot = arr[right];

        for(let i=left;i<=right;i++){
            if(arr[i]<=pivot){
                bounder++
                swap(arr,bounder,i);
            }
        }
        return bounder;
    }

    function swap(arr,i,j){
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
}
