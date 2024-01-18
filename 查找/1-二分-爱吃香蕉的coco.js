/***
 * leetcode:875
 * https://leetcode-cn.com/problems/koko-eating-bananas/
 * piles = [3,6,7,11], H = 8
 * piles[i]表示第i堆香蕉，coco每次只能在一堆香蕉里吃东西，每小时可以吃count个
 * 求H小时内吃完所有的香蕉，每小时至少得吃多少个？
 * 注：
 *     coco 每小时最多吃一堆香蕉，如果吃不下的话留到下一小时再吃；
 *          如果吃完了这一堆还有胃口，也只会等到下一小时才会吃下一堆。
 */
// 输入: piles = [3,6,7,11], H = 8
// 输出: 4

// 输入: piles = [30,11,23,4,20], H = 5
// 输出: 30
 
/****
 * 思路：
 *      暴力：每小时最少吃1个，最多吃max(piles)
 *           所以从1遍历到max个，每次检测当前速度是否可以吃完
 *          n*w
 *      二分： nlogw （w为最大的香蕉堆的大小 二分查找-左边界
 */
console.log(minEatingSpeed([3,6,7,11], 8));
function minEatingSpeed(piles, h) {
    let max = Math.max.apply(null, piles);

    for (let i = 1; i < max; i++) {
        if (canFinish(piles, i, h)) {
            return i;
        }
    }

    return max;

    function canFinish(piles, speed, h) {
        let needH = piles.reduce((accum, curr) => {
            accum += Math.ceil(curr / speed);
            return accum;
        }, 0);

        return needH <= h;
    }
}


// way2： 二分法
function minEatingSpeed(piles, h) {
    let max = Math.max.apply(null, piles);

    // for (let i = 1; i < max; i++) {
    //     if (canFinish(piles, i, h)) {
    //         return i;
    //     }
    // }

    // return max;

    let start = 1;
    let end = max;

    while (start < end) {
        let mid = start + ((end - start) >> 1);

        if (canFinish(piles, mid, h)) {
            end = mid;
        }
        else {
            start = mid + 1;
        }
    }

    return start;

    function canFinish(piles, speed, h) {
        let needH = piles.reduce((accum, curr) => {
            accum += Math.ceil(curr / speed);
            return accum;
        }, 0);

        return needH <= h;
    }
}