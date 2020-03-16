/***
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 * https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/
 */
// 输入：s = "We are happy."
// 输出："We%20are%20happy."
function replaceSpace1(s) {
    s = s.replace(/\s/g, "%20");
    return s;
}

function replaceSpace(s) {
    s = s.split(' ').join('%20');
    return s;
}
