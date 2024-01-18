/******************************************

任务调度器
tasks = ["A","A","A","B","B","B"], n = 2
两个相同种类的任务之间必须有长度为 n 的冷却时间
计算完成所有任务所需要的最短时间


exp:
执行顺序: A -> B -> (待命) -> A -> B -> (待命) -> A -> B.
out:8

******************************************/
/*************
 * 思考：
 *      题意： 为什么 BA还要待命？他们又不是相同任务
 *             按理时间应该是 6才对啊
 *      ===-> 因为 第一个A与紧接着出现的第二个A之间必须要满足n的冷却时间
 *            之前我以为要紧邻出现相同的才要算冷却时间
 * 
 * 
 *      思考：
 *          遍历，统计词频，找出出现次数最多的字母然后其他字母依次插入其中
 *          
 *      在demo中找规律：
 *          比如当存在多个相同频率的
 *          AAABBBCC? n=1时  
 *          ABABAB CC (CC)是否一定连续出现在末尾？  
 *                  不是，虽然n=1但是并不意味着AA之间只能1，
 *          ABCABCAB
 *       疑问就是： 有没有可能出现，空隙用完了 队末还存在相同两个元素不得不使用空隙隔开的情况？
 *      有： 当ABABABB 时B由于比插入的空隙数大所以被漏出来了。
 *          但是不成立，此时应当是 B为最大词频元素
 *          即应该这样： BABABAB
 * 
 *      所以最多可能出现的遗漏情况是：有多个相同的最大频率数
 *          导致他们相互间隔排出来
 *      ABCABCABCA[BC] 
 *      所以此时的公式是：
 *         A_A_A[BC] 假如现在词频最大的是A 有count[A]个
 *                  那么 空隙时间： (count[A]-1)*n
 *                       除去最后一个A以外的A占用时间: count[A]-1  
 *                       末尾多个相同最大词频多出来的部分（包括A在内）
 *                              sameCount(最多词频字母个数)
 *      最好情况：
 *          刚好必须的空隙填满了所有元素，此时时间为数组长度
 */
console.log(leastInterval(["A","A","A","B","B","B",'C','D','E','F','E'],2))
 function leastInterval1 (tasks,n){
/****
 * 代码思路：
 *      先找到词频最大的字母对应出现频率，
 *      再遍历整个频率集找到个最大频率相同的字母个数
 *      return Math.max(task.length,公式)
 * 128ms 62%
 */
    // 频率计数
    let hash = {};
    tasks.forEach(item => {
        hash[item] = hash[item]&&hash[item]+1||1;
    });
    let charCountSorted = Object.values(hash)
                          //.sort((a,b)=>hash[b]-hash[a]);
                          .sort((a,b)=>b-a);
    let maxCount = charCountSorted[0];
    let maxSameCount = 1;
    
    for(let i=1;i<charCountSorted.length;i++){
        if(charCountSorted[i]!=maxCount){
            break;
        }
        maxSameCount++;
    }
    return Math.max(tasks.length,(maxCount-1)*(n+1)+maxSameCount);
}

/****
 * 思考：
 *      js 不能通过 arr['B'-'A']的方式统计字母词频吗
 *      生成一个长为26的数组
 * 80ms 98.51%
 */

function leastInterval (tasks,n){
     // 一个26长的数组对应26个字母，记录其出现的次数
    // 再排序，从大到小，找到第一个不与最大个数相同的数组下标即得到相同最大词频字母个数
    
    // 频率计数
    let charCount = new Array(26).fill(0);
    for(let i=0;i<tasks.length;i++){
        // charCount[tasks[i]-'A']++;
        // charCodeAt(index) index指字符串中的下标得到字符的unicode编码
        charCount[tasks[i].charCodeAt(0)-'A'.charCodeAt(0)]++;
    }
    let charCountSorted = charCount.sort((a,b)=>b-a);//倒序
    let maxCount = charCountSorted[0];
    let maxSameCount = 0;
    
    // for(let i=1;i<charCountSorted.length;i++){
    //     if(charCountSorted[i]!=maxCount){
    //         break;
    //     }
    //     maxSameCount++;
    // }
    // 这种居然快点？可以100%？
    for(let i=0;i<charCountSorted.length;i++){
        if(charCountSorted[i]==maxCount){
            maxSameCount++;
        }
    }
    return Math.max(tasks.length,(maxCount-1)*(n+1)+maxSameCount);
}    