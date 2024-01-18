/**
 * @desc 选择排序---扑克牌
 * 基本思想：
 *     每次循环在待排序的数据中选择最小的元素，排在已排序的最后
 *     关于基准值:每次排序队列中的最后一个元素，
 *            1、记录下一轮 循环的起始
 *            2、怎么找到 未排序列中的最小元素？
 *                假定基准为最小的 依次与他比较
 *      
 * 总结：
 *      选择排序相当于在两个空间进行，每次从未排序的旧空间选择最新的值放到新的空间
 * 时间复杂度   最优O(n^2)  最差O(n^2)  平均O(n^2) 
 * 空间  O(1)
 * 稳定  实现可以做到稳定
 */
 function selectSort(arr){
    if(arr===null||arr.length<2){
        return;
    }
    for(let i=0;i<arr.length;i++){
        let minIndex = i;
        // 寻找i之后元素级的最小元素
        for(let j=i+1;j<arr.length;j++){
            minIndex =  arr[j]<arr[minIndex]?j:minIndex;
        }
        swap(arr,i,minIndex);
    }
 }

 function swap(arr,i,j){
     let temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;
 }
