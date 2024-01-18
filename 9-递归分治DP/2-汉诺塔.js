/***
 * 递归(/分治)解决汉诺塔
 * @param dish 盘子个数(也表示名称)
 * @param from 初始塔座
 * @param temp 中介塔座
 * @param to   目标塔座
 */

towerOfHanoi(3,"A","B","C");
function towerOfHanoi(dish,from,temp,to){
    if(dish===1){
        // 【2】 将初始塔座from上剩余的一个盘子放到目标塔座to上
        console.log(`将盘子${dish}从塔${from}移动到塔${to}：${from}->${to}`);
    }else{
        //【1】 先将n-1个盘子从from移到temp。
        towerOfHanoi(dish-1,from,to,temp);
        console.log(`将盘子${dish}从塔${from}移动到塔${to}：${from}->${to}`);
        // 【3】 将中介塔座temp上n-1个盘子移动到目标塔座to上
        // [temp拿着dish-1开始新一轮即temp又变成from了
        towerOfHanoi(dish-1,temp,from,to);
    }
}