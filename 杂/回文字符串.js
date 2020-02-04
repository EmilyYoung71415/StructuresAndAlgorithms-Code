/***
 * leetcode 125
 * 验证字符串是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写
 * "A man, a plan, a canal: Panama" ——> true
 * "race a car" ——> false
 */
// 处理字符串：过滤出有效字符，处理大小写
console.log(isPalindrome('A man, a plan, a canal: Panama'))

function isPalindrome1(s) {
    // 正则判断小写
    let i = 0;
    let j = s.length - 1;
    // s[i] = s[i].toLowerCase(); s[i]并不会改变
    while (i <= j) {
        let head = s[i].toLowerCase();
        let tail = s[j].toLowerCase();
        if (/^[0-9a-z]+$/.test(head) && /^[0-9a-z]+$/.test(tail)) {
            if (head === tail) {
                i++;
                j--;
            } else {
                return false;
            }
        } else if (/^[0-9a-z]+$/.test(head)) {
            j--;
        } else if (/^[0-9a-z]+$/.test(tail)) {
            i++;
        } else {
            i++;
            j--;
        }
    }
    return true;
}

// 优化
// 1. 直接替换字符串，而不是字符单独判断
function isPalindrome (str) {
    if (str === '' || str.length === 1) return true;
    str = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    let i = 0;
    let j = str.length - 1;
    while (i < j) {
        if (str[i] === str[j]) {
            i++;
            j--;
        } else {
            return false;
        }
    }
    return true;
};
