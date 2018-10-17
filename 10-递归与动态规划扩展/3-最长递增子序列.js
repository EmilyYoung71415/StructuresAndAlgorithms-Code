/**
 * [2,1,5,3,6,4,8,9,7]
 * 返回 [1,3,4,8,9]
 * 
 * 思路：
 *    遍历每个数
 *    以2开始收集，遍历2之后的 arr[j]>arr[j-1]
 *         2、5、6、8、9  []
 *    1
 *      1、3、4、8、9
 *    5
 *      5\6\8\9
 *    3
 *      3\4\8\9
 *  .... 越往后希望越低
 * 难点： 怎么实现数组更新？
 *    比较的是长度 
 * 
 * 复杂度分析：
 *     双重循环 n * n
 *     空间复杂度：2
 * 重复的多余的地方：
 *      3\5等之后的遍历 如果后面的要入选那么前面的包含了这个数的更长的肯定也要选
 *  
 */

// let arr = [2,1,5,3,6,4,8,9,7]
// let res = getMaxLenArr(arr)
// console.log(res)
function getMaxLenArr(arr){
    let maxArr = [];
    let len = arr.length;
    for(let i=0;i<len;i++){
        let curIndex = i;
        let tempArr = [];
        tempArr.push(arr[i]);
        for(let j=i+1;j<len;j++){
            if(arr[j]>arr[curIndex]){
                tempArr.push(arr[j]);
                curIndex = j;
            }
        }
        maxArr = tempArr.length>maxArr.length?tempArr:maxArr;
    }
    return maxArr;
}


/****
 * dp一下：
 *      [2,1,5,3,6,4,8,9,7]
 * 先想一下 递归式
 *  如果2 
 *        那么 最长的子序列是在[1,5,3,6,4,8,9,7]里产生
 * 
 */
getMaxLenArr([2,1,5,3,6,4,8,9,7])
 function getMaxLenArr(arr){
    let dp = getdp(arr);
    return getLIS(arr,dp)
 }

 function getdp(arr){
     let dp = [];// [2,1,5,3,6,4,8,9,7]
     for(let i=0;i<arr.length;i++){
         dp[i] = 1;
        for(let j=0;j<i;j++){
            // 在arr[0...i-1]中所有比arr[i]小的都可以作为 最大递增序列的倒数第二个数
            // 以哪个数结尾的递增子序列最大 就选择哪个数
            // dp[i] = max{dp[j]+1,(0<j<=i,arr[j]<arr[i])}
            // dp[i]表示以i结尾
            if(arr[j]<arr[i]){
                dp[i] = Math.max(dp[i],dp[j]+1);
            }
        }
     }
     return dp;
 }

//dp: [1,1,2,2,3,3,4,5,4 ]
//    [2,1,5,3,6,4,8,9,7]
// 最大的数： 5 index下标：7 即 最大递增序列是以7结尾
// 逆序遍历 
// 只要发生了增加的都代表要选择这个元素
 function getLIS(arr,dp){
    // 求dp的最大值 以及其对应的下标
    let maxIndex = 0;
    let outArr = [];
    for(let i=1;i<arr.length;i++){
        maxIndex = arr[i]>arr[maxIndex]?i:maxIndex;
    }
    outArr.push(arr[maxIndex]);
    
    // 从maxIndex 开始逆序遍历
    for(let i=maxIndex-1;i>=0;i--){
        if(dp[i]<maxIndex){
            outArr.unshift(arr[i]);
            maxIndex = dp[i];
        }
    }
    return outArr;
 }