/***
 * leetcode: 1011
 * https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/
 * weights = [1,2,3,4,5,6,7,8,9,10], D = 5
 * 第i个货物重weight[i],需要将所有的货物在D次运输完
 * 求每次的最少运载量
 * 注意：货物的运输顺序不能打乱
 */

// 输入：weights = [1,2,3,4,5,6,7,8,9,10], D = 5
// 输出：15

// [1, 2, 3, 4, 5] [6, 7] [8] [9] [10] 即5天
// 而不是(2, 3, 4, 5), (1, 6, 7) 等顺序

/****
 * 思路：
 *      和吃香蕉的一致
 *      暴力遍历：最少运min(weight), 最多运sum(weight)
 *      二分优化：左边界
 */
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
function shipWithinDays(weight, days) {
    let min = Math.min.apply(null, weight);
    let max = weight.reduce((acc, cur) => acc + cur);

    let start = min;
    let end = max;

    while (start < end) {
        let mid = start + ((end - start) >> 1);

        if (canFinish(weight, mid, days)) {
            end = mid;
        }
        else {
            start = mid + 1;
        }
    }

    return start;

    function canFinish(weight, cap, days) {
        let cur = cap; // 当前船还可以承受的重量
        for (let wItem of weight) {
            if (wItem > cap) return false; // 当前物件 > 船的总承重
            if (wItem > cur) {
                cur = cap;
                days--;
            }
            cur -= wItem;
        }

        return days > 0;
    }
    
}