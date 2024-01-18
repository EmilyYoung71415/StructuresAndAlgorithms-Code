/**
 *   在0-1背包问题中，只能向背包里装入完整的物品，
 *   而在分数背包问题中，我们可以装入分数的物品
 * 
 *  物品  重量  价值
 *   1     2    3 
 *   2     3    4
 *   3     4    5
 * 
 *  当容量为6时候，我们选择: 物品1、物品2、1/4的物品3
 * 
 *  策略：优先选择性价比最高的物品，选择完之后再按比例拆分
 */
let values = [3,4,5];
let weight = [2,3,4];
let capacity = 5;
console.log(knapSack(capacity,values,weight));
function knapSack(capacity,V,W){
    // 将物品按照性价比排序后的序号 
    let shopList = [];
    for(let i=0;i<V.length;i++){
        shopList.push({
            value:V[i],
            weight:W[i],
            index:i
        })
    }
    shopList.sort(function(a,b){
        let index1 = ~~(a.value/a.weight);
        let index2 = ~~(b.value/b.weight);
        return index1>index2?-1:1;
    })

    let load = 0;//当前已装容量
    let curVal = 0;// 当前价值
    for(let i=0;i<shopList.length;i++){
        const {weight,value,index} = shopList[i];
        if(load>=capacity){
            break;
        }
        if(weight<=(capacity-load)){
            curVal += value;
            load += weight;
            console.log(`使用了物品${index}`);
        }
        else{// 当物品不能撑够时
            let radio = ((capacity-load)/weight).toFixed(2);
            curVal += value*radio;
            load += weight*radio;
            console.log(`使用了物品${index}的${radio}`);
        }
    }
    return curVal;//返回产生的总价值
}