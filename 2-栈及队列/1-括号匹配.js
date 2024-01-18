/***
 * leetcode:20
 * 给定字符串查看左右括号是否匹配
 * {[}] => false
 * {[]} => true
 * 
 * 思路：
 *  遍历字符串，
 * 若是左括号，则入栈
 * 若是右括号，则pop栈顶元素，查看是否匹配
 * 技巧：判断是左右括号：{}对象键值
 *      查看右括号的匹配对象：'}':'{'
 */
let s_arr = ['()','()[]{}','(]','{[]}','{[}]',']'];
s_arr.forEach(s=>{
    console.log(isValid(s));
})
// 这里只可以解决顺序匹配的问题
// 
function isValid(s){
    // 建立map映射 且右括号作为键值
    let map = {')':'(',']':'[','}':'{'};
    let stack = [];
    for(let i=0;i<s.length;i++){
        if(!map[s[i]]){// 是左括号
            stack.push(s[i]);
        }
        else if(!stack.length||stack.pop()!=map[s[i]]){
            return false;
        }
    }
    // 最后遍历完全看是否栈为空
    return stack.length==0;
}