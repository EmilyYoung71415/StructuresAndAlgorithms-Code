/******************************************

括号匹配
'(', ')', '{', '}', '[' and ']'
一串字符里有如上6种字符，判断他们的括号是否匹配
example:
    () true
    ()[]{} true
    (] false
    {[]} true
    {[}] false
匹配判定原则：
    1、括号 相同种类成双出现
    2、左括号与右括号出现的位置顺序正确
******************************************/


/******
 * time:45-43 one hour
 * 思路1：
 *      []{}()分别是-1 1 -2 2 -3 3 如果括号匹配那么加起来肯定等于0
 *      ===-> 括号种类的问题
 *      括号顺序：
 *      只要出现了 ) } ] 就判断前面的数加起来是否为0 不是则退出循环
 *      ====-> 不成立 {[]} 当]时
 *      fix: {[} 括号内不能只单只出现 单个括号 
 *      ===-> 不成立 { [{ } ]}  即{[{} 时是不符合的 但实际上是符合的
 * 思路2:
 *      栈
 *      每次遇见一个右括号 就在栈里判断栈顶元素是否是他的左括号 
 *          是： 将栈顶元素弹出
 *          不是： return false
 *      遇见左括号：
 *          进栈
 *      当遍历结束
 *          栈是否为空
 *      如果一开始就是 右括号？return false
 */
const str = "{[}]"
console.log(isValid(str));
function isValid1(str){// wrong 
    let map = {
        '{':-1,
        '[':-2,
        '(':-3,
        '}':1,
        ']':2,
        ')':3,
    }
    let sum =0;
    for(let i=0;i<str.length;i++){
        sum += map[str[i]];
        if(map[str[i]]>0&&sum!==0){
            return false;
        }
    }
    return true;
}


function isValid2(str){// right
    let stack = [];
    let map = {
        '{':-1,
        '[':-2,
        '(':-3,
        '}':1,
        ']':2,
        ')':3,
    }
    for(let i=0;i<str.length;i++){
        if(map[str[i]]>0){
            if(!stack.length){//此时栈为空
                return false;
            }
            if(map[stack.pop()]+map[str[i]]!=0){
                /// 如果不配 return false
                return false;
            }
        }else{
            // 左括号的情况
            stack.push(str[i]);
        }
    }
    // 遍历完毕之后 判断栈
    if(stack.length>0){
        return false;
    }
    return true;
}

function isValid2_better(){ 
    let stack = [];
    let map = {
        '{':-1,
        '[':-2,
        '(':-3,
        '}':1,
        ']':2,
        ')':3,
    }
    for(let i=0;i<str.length;i++){
        if(map[str[i]]>0){
            if(!stack.length||!(map[stack.pop()]+map[str[i]])){
                return false;
            }
        }else{
            // 左括号的情况
            stack.push(str[i]);
        }
    }
    // 遍历完毕之后 判断栈
    if(stack.length>0){
        return false;
    }
    return true;
}
