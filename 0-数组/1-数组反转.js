/***
 * 将数组中所有元素逆置，空间复杂度为O(1)
 * 不得使用api
 */

/*****
 * 思路：
 * 使用两个指针，分别从两头出发往数组中间走，互相交换，直至指针相遇
 * 优化：变量j=len-i-1，扫描数组的前半部分，其对称元素data[len-i-1]
 */
reverse([1, 2, 3, 4, 5, 6, 7, 8]);
function reverse1(arr) {
  let i = 0;
  let j = arr.length - 1;

  while (i <= j) {
    // arr[i] arr[j] 数组交换
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }
  console.log(arr);
}

function reverse(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  console.log(arr);
}
