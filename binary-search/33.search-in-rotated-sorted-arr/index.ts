// arr is possibly rotated at an unknown pivot index k
// Input: (arr = [4, 5, 6, 7, 0, 1, 2]), (target = 0);
// Output: 4;

// 题解思路:
// arr变形的有序数组，在pivotIndex临界点数组被cut为两半，按段进行了扭转
// 导致的结果是, 遍历的时候不能顺序遍历就是一直增大的了
// 这个题归属于二分的: 条件二分
