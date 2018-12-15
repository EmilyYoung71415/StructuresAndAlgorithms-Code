/******************************************
 
只能有一次交易权限(买一次、卖一次)
算出 买卖股票的最佳时间下 获得的最大利润(如一直亏损 可以不买)

10-

exp:
    [7,1,5,3,6,4]
    7-1
    记录最大差值就行了 进来一个 更新一下。

    
    buy at day2     1
    sell at day     6
    profit  5
    
    [7,6,4,3,1]
    不买 
    profit:0
******************************************/
/****
 * 思路
 *      只记录 差值
 *  这个和 股票最大收益 的差别？
 *  股票收益：（给出的收益差值点）
 *  [-2,1,-3,4,-1,2,1,-5,4]
 *  
 *  而这道题是给出的股价。让自己算收益
 *  区间值也只有一个
 *  [7,1,5,3,6,4]
 *  -6,4,-2,3,-2
 *  4,-2,3 = 5
 * 
 * 思路1:
 *      将原数据 处理成 差值。然后调用之前的函数
 * 思路2
 *      寻找谷底元素，默认是第一个元素
 *      如果当前元素 < min ; min = 当前元素
 *      如果 当前元素 - min >maxprofit  那么 profit 就被取替                  
 */

const arr =  [7,1,5,3,6,4]
console.log(maxProfit(arr))
function maxProfit1(prices){
    let arr = [];
    for(let i=1;i<prices.length;i++){
        arr.push(prices[i]-prices[i-1])
    }

    let curSum = 0;
    let maxSum = 0;
    for(let i=0;i<arr.length;i++){
        curSum = Math.max(curSum+arr[i],arr[i]);
        maxSum = Math.max(curSum,maxSum);
    }   
    return maxSum;
}

function maxProfit(prices){
    let min  = prices[0];
    let maxProfit = 0;
    for(let i=1;i<prices.length;i++){
        if(prices[i]<min){// 跌价 直接从最小值买
            min = prices[i];
        }else if(prices[i]-min>maxProfit){
            maxProfit = prices[i] - min;
        }
    }
    return maxProfit;
}