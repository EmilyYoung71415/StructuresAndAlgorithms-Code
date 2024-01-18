/****
    Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
    Output: [3,3,5,5,6,7] 
    Explanation: 

    Window position                Max
    ---------------               -----
    [1  3  -1] -3  5  3  6  7      3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7
 * 
 */
let nums = [1,3,-1,-3,5,3,6,7], k = 3
let res = maxSlidingWindow(nums,k)
console.log(res)
function maxSlidingWindow(nums, k){
    if(!nums||!nums.length) return [];
    let window = [],
        res = [];
    nums.forEach((item,index)=>{
        // 新来的元素和队尾元素比较
        while(window.length&&item>=nums[window[window.length-1]]){
            window.pop()
        }
        // 如果当前的队首下标超出遍历可覆盖范围了 弹出队首
        if(window.length&&window[0]+k<=index){
            window.shift()
        }
        // 当前元素入队列 ，无论是比队首大与否，都归于了他的位置上去
        window.push(index)
        index>=k-1&&res.push(nums[window[0]])
    });
    return res;
}