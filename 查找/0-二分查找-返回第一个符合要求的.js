/**
 * Q1:
 * 查找目标元素为 >= target，且返回第一个符合要求的元素下标
 * int[] a = {1,2,2,2,4,8,10}，
 *      查找2，返回4的下标4；查找3，返回4的下标4；查找4，返回8的下标5。
 *      如果没有大于key的元素，返回-1
 * 
 * Q2:
 * 查找目标元素为 = target，且返回第一个符合要求的元素下标
 */

// 1.1 =target 下标任意版
// function binarySearch_base(arr, target) {
//     let start = 0;
//     let end = arr.length - 1;

//     while (start <= end) {
//         const mid = start + ((end - start) >> 1);
//         if (target === arr[mid]) {
//             return mid;
//         }
//         else if (target < arr[mid]) {
//              end = mid - 1;
//         }
//         else {
//             start = mid + 1;
//         }
//     }

//     return -1;
// }

// 1.2 >=target的 最小下标版
const arr = [1,2,2,2,4,8,10];
console.log(binarySearch_2(arr, 2))
function binarySearch_2(arr, target) {
    const len = arr.length;
    let start = 0;
    let end = len - 1;

    while (start <= end) {
        const mid = start + ((end - start) >> 1);
        // if (arr[mid] === target) {
        //     return mid;
        // }
        // < 改为 <=
        // =某个数，可能前面还有等于某个数的数，所以需要指针向前走
        if (target <= arr[mid]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    // return -1;
    return start < len - 1 ? start : -1;
}

// 1.3 >target的  最小下标版
function binarySearch_3(arr, target) {
    const len = arr.length;
    let start = 0;
    let end = len - 1;

    while (start <= end) {
        const mid = start + ((end - start) >> 1);
        // if (arr[mid] === target) {
        //     return mid;
        // }
        // 大于时，指针往前走
        if (target < arr[mid]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    return start < len - 1 ? start : -1;
}

// 1.4 =target的 最小下标
// 1.2：>=target的最小下标，的扩展
function binarySearch_4(arr, target) {
    const len = arr.length;
    let start = 0;
    let end = len - 1;

    while (start <= end) {
        const mid = start + ((end - start) >> 1);
        if (target <= arr[mid]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    // return start < len - 1 ? start : -1;
    if (start < len - 1 && arr[start] == target) return start;
    return -1;
}

// 1.5 =target的 最大下标
// 1.3 > target的 最小下标版 扩展

function binarySearch_5(arr, target) {
    const len = arr.length;
    let start = 0;
    let end = len - 1;

    while (start <= end) {
        const mid = start + ((end - start) >> 1);
        // 大于时，指针往前走
        if (target < arr[mid]) {
            end = mid - 1;
        }
        else {
            start = mid + 1;
        }
    }
    // return start < len - 1 ? start : -1;
    // 找的是 >target的 最小下标
    // 那么此时start左边的那个就是 最可能是 =target的 最大下标的
    if (start - 1 >= 0 && arr[start - 1] === target) {
        return start - 1;
    }
    return -1;
}