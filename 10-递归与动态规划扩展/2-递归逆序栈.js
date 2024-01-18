/**
 * 不能申请额外数据结构，使用递归函数逆序一个栈
 * 
 * ===》 
 *      fun1: 每次可返回栈底元素
 *      递归：不断返回栈底元素
 * 函数:
 *      1                
 *      2   ___F作用___   1
 *      3                 2 ===》3被弹出
 * 
 * 栈的方法： 弹出栈顶元素、push元素、返回栈顶元素
 * ==》 申请两个栈？no
 * 利用系统栈帮助记住每次的res = pop值，期望的last
 */

 function reverseStack(stack){
    if(stack.isEmpty()){
        return;
    }

    let i = g(stack);//获得栈底元素
    reverseStack(stack);// 用新栈去获取新栈底
    stack.push(i);// 依次Push栈底即是逆序输出了

    // 每次返回栈低元素，并弹出栈底元素
    function g(stack){
        let result = stack.pop();
        if(stack.isEmpty()){
            return result;
        }else{
            let last = g(stack);
            stack.push(result);
            return last;
        }
    }
 }
 /**
  * stack:[3,2,1]
 g函数调用过程：<=== 新栈[2,1]，新栈底元素3
    g1 = {result: 1,last: 期望返回值来自g2 <====3; stack.push(1)}
    g2 = {result: 2. last g3 <=== 3; stack.push(2) }
    g3 = {result: 3 }

怎么依据这个过程去反推表达式的？
    先定义g函数， 每次返回栈底且弹出栈底实现栈大小缩小
===》    自身含递归
        每次记录： pop的栈顶，便于push
        直到栈空，最近的result即是栈底
  */