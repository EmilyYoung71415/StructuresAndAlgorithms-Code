/******************************************

字符串解码
exp:
s = "3[a]2[bc]", return "aaabcbc".
s = "3[a2[c]]", return "accaccacc".
s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

k[encoded_string]表示重复k次
不会出现3a、3[4]等输入
******************************************/
/****
 * 思路：
 *      因为存在类似打开括号的功能，所以第一反应是与栈有关
 *     每次遇到[] 就栈push 当弹出一个 []的时候 就处理他前面的数字拼凑成一个str 
 * 60%
 */
let str = "3[a]2[bc]";
console.log(decodeString(str))
function decodeString1(s){
    let stack = [];
    for(let i=0;i<s.length;i++){
        if(s[i]==']'){
            // 往回遍历直到遇到最近的一个[ 并得到[之前的数字
            // 将k[str] 通过规则转换为 某字符串
            // 再push进入栈 最后返回 arr.join("") 数组转字符串
            let str = '';
            while(stack.length>0&&stack[stack.length-1]!='['){
                str = stack.pop() + str;// bc 变成了cb了
            }
            // str = str.split('').reverse().join('');//字符串反转
            stack.pop();// pop出[
            // 怎么判断数字里的字符串是数值？*1再判断是否为数值
            let curNum = 0;
            let n = 0;   
            while(!isNaN(stack[stack.length-1]*1)){
                let stackTopNum = stack.pop()*1;
                curNum+= stackTopNum * Math.pow(10,n++);  
            }
            // 计算 curNum * str 
            let sumStr = [];
            while(curNum--){
                sumStr.push(str)
            }
            stack.push(sumStr.join(""));
        }else{
            stack.push(s[i]);
        }
    }
    return stack.join("");
}

/*****
 * 社区:
 *  思路差不多但是 是字符串维度上的改变
 *  而我是数组再转字符串
 * 
 */
function decodeString2(str){
    let 
        stack = [],
        curNum = 0,
        curStr = '';
    
    for(let c of str){
        if(c==']'){
            let num = stack.pop()
            let prevString = stack.pop()
            // 字符串的repeat方法
            curString = prevString + curString.repeat(parseInt(num))
        }
        else if(c=='['){
            stack.push(curStr);
            stack.push(curNum);
            curNum = 0;
            curStr = '';
        }
        // 判断数值
        // 非数值型字符转换后为 NaN
        else if(parseInt(c)||c=='0'){
            curNum = curNum*10 + parseInt(c)
        }
        else{
            curStr += c;
        }
    }
    return curStr;
}