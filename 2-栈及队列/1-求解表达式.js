/****
 * Leetcode:227基本计算器II
 * 求解表达式
 * 1+2+3*5-18(只有四则运算加减乘除、不含括号)
 * 准备两个栈，操作符栈(左)与操作数栈(右)
 * 遍历表达式，如果遇到操作符，则进入左栈、操作数进入右栈
 * 当操作符进栈的时候需满足规则如下：
 *  栈顶到栈底的操作符优先级逐渐下降，栈顶最高
 * 1、当前遍历操作符优先级 > 栈顶操作符，直接入栈
 * 2、否则(< or =)，操作符栈弹出栈顶，操作数弹出两个数a、b，
 *  计算 b 操作符 a，将计算结果push到右栈
 * 直至左栈为空
 */

let str = ' 3+5 / 2 ';
let str1 = '12';
console.log(calculate_mini(str));
// 字符只有符号 + - * / 和 数字
// console.log(isNaN(1*'1'));false
// console.log(isNaN(1*'+'));true
function calculate_mini(str){
    function getRes(){
        if(!stack_l.length||!stack_r.length){
            return 
        }
         // 先弹出左栈栈顶元素 
         let pFisrt = stack_r.pop();
         let pSecond = stack_r.pop();
         let operate = stack_l.pop();
         if(operate=='+'){
            res = Number(pSecond)+Number(pFisrt)
         }
         else if(operate =='-'){
            res = Number(pSecond)-Number(pFisrt)
         }
         else if(operate =='*'){
            res = Number(pSecond)*Number(pFisrt)
         }
         else if(operate =='/'){
            res = ~~(Number(pSecond)/Number(pFisrt))
         }
         stack_r.push(res);
        //  let res = pSecond + operate + pFisrt;
        //  stack_r.push(eval(res));//eval 将字符串转为数字计算
    }
    let stack_l = [],// 存放操作符的左栈
        stack_r = [];// 存放操作数的右栈
    let map = {'+':1,'-':1,'*':2,'/':2}
    for(let i = 0;i<str.length;i++){
        let s = str[i];
        if(s==' ') continue;// 空格pass
        // 如果遇上了操作数
        if(!isNaN(1*s)){
            // 如果是18这种要一直遍历下去..
            let ss = s;
            for(let j=i+1;j<str.length&&!isNaN(1*str[j]);j++,i++){
                ss += str[j]
            }
            stack_r.push(ss)
        }
        else{
            // 当前s优先级高
            while(stack_l.length&&map[s]<=map[stack_l[stack_l.length-1]]){
                getRes()
            }
            stack_l.push(s)
        }
    }
    // 遍历完开始腾空左栈进行计算
    while(stack_l.length){
        getRes()
    }
    return 1*stack_r.pop();// 字符转为数字
}
/*****
 * 注意的点：
 * 1、操作符优先级 <= 栈顶元素的时候，
 *      · 等弹到栈顶元素优先级满足要求的时候，当前操作符也要进操作符栈的哦
 *        所以是while 而不是 if
 * 2、getRes的时候 可能栈为空哦 进行判空处理
 * 3、输入的字符串，进行数字与操作符判断可以 isNaN
 *      但是！有可能出现18等两位数的情况，却被当做了 1、8两个字符哦
 * 4、可能只输入字符，返回也要是数字
 * 5、计算字符串 '1' '+' '2'的时候 使用了eval 函数 
 *    怎么将字符 +*—/ 转为 操作符呢
 *  ==> 按运算符匹配
 */

 /*****
  * 但是不支持括号
  * ===> 转为后缀表达式
  */