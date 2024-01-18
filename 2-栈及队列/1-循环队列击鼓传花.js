/* 
* 击鼓传花问题：// 即约瑟夫问题
*      一群孩子围成一个圈，某一个时刻传花停止，花落谁手，谁就出局。
*      直至只剩一个孩子
* 输入
*  name:[xx1,xx2,xx3,xx4...]
*  count:xx //如每次数7次
* 输出：
*  最后胜利者name
  思路：
    1、因为是围着一个圈坐，传花的逻辑是，每次跳过你之后你就是接下来的
       最安全的人
       所以想到 循环队列
    [A,B,C,D]. 每个元素不停的入队出队，当倒计时停下的时候
    队首的元素就是淘汰的元素
    注意：数数
         A
        / \
       B — C 假如花在A手上 顺时针传的话，计数1应该是从C开始
*/

let arr = ['A','B','C','D','E'],count = 7;
console.log(hotPotato(arr,count));
function hotPotato(arr,count){
    while(arr.length>1){
        let n = count;
        while(n--){
            arr.push(arr.shift())
        }
        arr.shift()// 淘汰队首元素
    }
    return arr.shift()
}