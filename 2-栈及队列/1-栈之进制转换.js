/**
 * 进制转换知识：
 *   10 <=> 2
 *   10 <=> 8
 *   10 <=> 16
 *  
 * 从左到右：
 *  10进制的数xxx一次 xxx/2直至商为0.
 *  每次所得余数，遵循先来后出的规律，所以使用栈十分合适  
 * 
 * 扩展：
 *  2 <=> 8
 *  2 <=> 16
 * 
 * 1. 2 <=> 8
 *  2 > 8 
 *    将二进制的数从左到右三个为一组，最高组不足三位，零补足
 *    然后在组里的数求和 8 4 1 
 *  8 >2
 *     8进制的数每一位 除以2，像十进制转换2进制一样，所得二进制数即为余数大集合
 * 
 * 2 > 16 同理，只是4位一分组。 16 8 4 1
 *      超过9的数由ABCDEF表示
 *      即 0123456789ABCDEF ==> 0~16 
 * 测试数据
 *      10  2   8   16
 *          110101100   226 96
 */
//console.log(divideBy2(42)) //[0 1 0 1 0 1]
function divideBy2(num){
    let stack = [],
        res = '';
    // 求余入栈
    while(num>0){
        let temp = num%2;
        stack.push(temp);
        num = ~~(num/2);
    }
    // 出栈  弹出最后一个元素
    while(stack.length>0){
        res += stack.pop().toString();
    } 
    return res;
 }

 console.log(divideByType(150,8))
 function divideByType(num,type){
    let stack = [],
        res = '',
        convert = '0123456789ABCDEF';
    // 求余入栈
    while(num>0){
        let temp = num%type;
        stack.push(temp);
        num = ~~(num/type);
    }
    // 出栈  弹出最后一个元素
    while(stack.length>0){
       // res += stack.pop().toString();
       res+= convert[stack.pop()];
    } 
    return res;
 }