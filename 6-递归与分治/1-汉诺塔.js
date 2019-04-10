/****
 * 汉诺塔问题
 * 
 * 已知有三个柱子， 
 *      __|__   __|__    __|__
 *      left    medium   right
 * 
 * 最左边的柱子上有n个盘子，柱子从上到下盘子直径越来越大，呈金字塔形状
 * 现在要将左边的盘子全部移动到最右边的柱子上,移动过程遵循规则如下:
 * 1、每次只能移动一个盘子
 * 2、柱子上放的盘子必须遵守金字塔形状，即大的盘子不能放在小盘子上面
 * 
 * 求：最优的移动策略使得移动步骤最少
 * 友情提示:可以借助中间的柱子"缓存"
 */

/****
 * 思路:
 * n=1: get NO.1 left -> right
 * n=2: 
 *      1.get NO.1 left -> medium
 *      2.get NO.2 left -> right
 *      3.get NO.1 medium -> right
 * n=i:
 *      1.get NO.1 ~ NO.i-1 left -> medium
 *      2.get NO.i          left -> right
 *      3.get NO.1 ~ NO.i~1 medium -> right 
 */

hanoi(3)
function hanoi(n){
    if(n==null || n<0) return;
    hanoiCall(n,'left','medium','right');

    /**
     * @param {*} n 当前考虑柱子上有几个盘子
     * @param {*} from 从哪根柱子离开
     * @param {*} mid 缓存柱子
     * @param {*} to 降落在哪根柱子
     */
    function hanoiCall(n,from,mid,to){
        if(n==1){
            console.log(`get NO.${n} ${from} -> ${to}`);
        }else{
            hanoiCall(n-1,from,to,mid);
            console.log(`get NO.${n} ${from} -> ${to}`);
            hanoiCall(n-1,mid,from,to);
        }
    }
}