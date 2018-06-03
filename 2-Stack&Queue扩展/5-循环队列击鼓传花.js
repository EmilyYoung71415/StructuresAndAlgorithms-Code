/**
 * @desc 循环队列扩展
 *  ===》 js的任务队列
 * 当我们在浏览器中打开新标签时，就会创建一个任务队列。
 * 这是因为每个标签都是单线程处 理所有的任务，它被称为事件循环
 * 
 * 浏览器要负责多个任务，如渲染HTML，执行JavaScript代码， 
 * 处理用户交互（用户输人、鼠标点击等），执行和处理异步请求
 * 
 * 击鼓传花问题：// 即约瑟夫问题
 *      一群孩子围成一个圈，某一个时刻传花停止，花落谁手，谁就出局。
 *      直至只剩一个孩子
 * 输入
 *  name:[xx1,xx2,xx3,xx4...]
 *  count:xx //如每次数7次
 * 输出：
 *  最后胜利者name
 * 
 * 思路:
 *  关键在于怎么确定循环的指针，即每次去掉一个元素后，准确控制当前指针
 *  直至传到最后一个元素
 * ===》
 *  1.index 
 *      7%arr.len 知道从下个元素在一个圈里数 这么多次即是淘汰的人
 *      index 遍历到尾部之后，跳到第一个元素
 *  2.队列
 *      与其改变指针，为什么不尝试改变结构？
 *      重大思维转变：
 *          每次传花之后，当前元素就弹出然后push到最后，
 *          即当花刚传给你你转手给下一人时,这时你从最危险的状态变为了最安全的
 *      当index = num 时，直接弹出数组的第一个
 * 
 *      即循环队列处理思想
 */
 let names = ['xx1', 'xx2', 'xx3', 'xx4'];
let res = hotPotato(names,7);
console.log(res);
function hotPotato(nameList,num){
    // 将数组当队列用
    // push shift()
    while(nameList.length>1){
        for(let i=0;i<num;i++){
            nameList.push(nameList.shift());
        }
        // 等于num
        let out = nameList.shift();
        console.log(`本轮${out}被淘汰`)
    }
    return nameList.shift();
 }


// 解法2

//n个人围成一个圈，每个人分别标注为1、2、...、n
// 输入n 和报数k
function test2(n,k){
    let index = 0;
    // 从第2个数开始
    for(let i=2;i<=n;i++){
        index = (index+k)%i;
    }   
    return index+1;
}
//let res = test2(4,7) // 1
//console.log(res);