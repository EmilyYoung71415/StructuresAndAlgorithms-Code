/***
 * https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分
 */

/***
 * 思路：
 *      很像快排的partition有木有！
 *      所以安排两个哨兵走起~
 */
// 如果要保持相对顺序，则两个指针需要同时从左侧开始
function exchange(array) {
    if (array==null || array.length==0) return [];

    let start = 0;
    let end = array.length - 1;
    while (start < end) {
        while (array[start] % 2 === 1) {
            start++;
        }
        while (array[end] % 2 === 0) {
            end--;
        }
        if (start < end) {
            [array[start], array[end]] = [array[end], array[start]]
        }
    }
    return array;
}
