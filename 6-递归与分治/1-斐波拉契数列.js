/****
 * 原型: f(n) = f(n-1) + f(n-2)
 * 变形：
 * 1、爬楼梯,每次只能走2或者1步
 * ===> 见爬楼梯
 * 2、农场奶牛母牛每年生一头小母牛，永远不会死。第一年农场一只成熟的母牛
 *    第二年开始，母牛开始生小母牛。每只小母牛3年之后可以生小小母牛。
 *    求n年之后的牛数量(咳咳不考虑是否存在公牛交配的问题)
 */

 /*****
  * 奶牛:
  * 1:1
  * 2:1+1=2
  * 3:2+1=3
  * 4:3+1=4 = 3+1 
  * 5:4+1+1=6 = 4+2
  * 6:6+1+1+1=9 = 6+3
  * f(n) = f(n-1) + f(n-3)
  */
console.log(getCow(6))
function getCow1(n){
    if(n<1) return 0;
    if(n<=3) return n;
    return getCow(n-1) + getCow(n-3);
}


function getCow(n){
    if(n<1) return 0;
    if(n<=3) return n;
    
    let pppres = 1,
        ppres = 2,
        pres = 3,
        res = 0;
    for(let i=4;i<=n;i++){
        res = pppres + pres;
        pppres = ppres;
        ppres = pres;
        pres = res;
    }
    return res;
}