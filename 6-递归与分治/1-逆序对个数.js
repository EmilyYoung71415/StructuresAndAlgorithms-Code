/****
 * @desc 逆序对
 *       已知数列 1 6 3 7 2 4 9，
 *       如果数列中的两个数满足a[i]>a[j] && i<j,那么我们就说这两个数构成了逆序
 *       在一个数列中逆序对的总共个数是逆序数。求逆序对个数
 * 
 * exp
 *      1 6 3 7 2 4 9
 *      ===> [6 3] [6 2] [6 4]
 *           [3 2] 
 *           [7 2] [7 4]
 *      return 6 
 * 
 *  思路：
 *      1. 蛮力法，内层遍历得到当前元素之后的每个小于它的元素
 *      2. 逆序反义词就是正序，即在正序中那些不合理的元素个数
 *         那么逆序元素就是调整顺序时需要交换的元素的个数 
 *      而借助于归并排序的稳定性，可以在合并过程中得到
 */

let arr = [1,6,3,7,2,4,9];
console.log(mergeNum(arr));

function mergeNum(arr){
    if(arr==null || arr.length<1) return 0;
    return mergeNumCal(arr,0,arr.length-1);

    function mergeNumCal(arr,left,right){
        if(left==right){
            return 0;
        }
        let mid = left + ((right-left)>>1);
        return mergeNumCal(arr,left,mid)+mergeNumCal(arr,mid+1,right)+merge(arr,left,mid,right);
    }

    function merge(arr,left,mid,right){
        let num = [],
            i = 0,
            p1 = left,
            p2 = mid+1,
            count = 0;
        
        while(p1<=mid&&p2<=right){
            count += arr[p1]>arr[p2]?mid-p1+1:0;
            num[i++] = arr[p1]<arr[p2]?arr[p1++]:arr[p2++];
        }

        while(p1<=mid){
            num[i++] = arr[p1++];
        }

        while(p2<=right){
            num[i++] = arr[p2++];
        }

        for(let j=0;j<num.length;j++){
            arr[left+j] = num[j];
        }
        return count;
    }
}