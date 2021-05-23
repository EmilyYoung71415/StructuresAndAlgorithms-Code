// {1,2,2,2,4,8,10} 元素10的出现次数：1
// 思路：结合二分查找的扩展
// (左下标) <= 数 <= (右下标)
// 左下标：>= target的最大下标
// 右下标：> target的最小下标

const arr = [1,2,2,2,4,8,8,9,10];
console.log(findTargetCount(arr, 8));
function findTargetCount(arr, tagrget) {
    const len = arr.length;
    const start = getFirstGreatOrEqual(arr, tagrget, len);
    const end = getFirstGreat(arr, tagrget, len);
    return end - start;
}

// >= target的某下标
function getFirstGreatOrEqual(arr, tagrget, len) {
    let start = 0;
    let end = len - 1;

    while(start <= end) {
        const mid =  start + ((end - start) >> 1);
        if (tagrget <= arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return start;
}

// >target的最小下标
function getFirstGreat(arr, tagrget, len) {
    let start = 0;
    let end = len - 1;

    while(start <= end) {
        const mid =  start + ((end - start) >> 1);
        if (tagrget < arr[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return start;
}