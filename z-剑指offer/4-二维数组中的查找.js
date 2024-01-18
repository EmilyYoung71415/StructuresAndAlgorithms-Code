/***
 * https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
 * leetcode:240
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * 
 */
// [
//     [1,   4,  7, 11, 15],
//     [2,   5,  8, 12, 19],
//     [3,   6,  9, 16, 22],
//     [10, 13, 14, 17, 24],
//     [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

/***
 * way1:   不考虑矩阵特点，按部就班的遍历 时间复杂度：n*m
 * way2:   二分 + 分治 lognm
 * way3:   从右上角开始遍历，cur > taget : 左走， cur < taget: 下走：  时间复杂度O(n +m)
 * 
 * 注意：输入空的时候判断
 */

// way1
function findNumberIn2DArray(matrix, target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return false;
    }

    let colLen = matrix[0].length;
    let rowLen = matrix.length;
    
    for (let i = 0; i < rowLen; i++) {
        for(let j = 0; j < colLen; j++) {
            let cur =  matrix[i][j];
            if (cur === target) return true;
        }
    }

    return false;
}

// way3
function findNumberIn2DArray(matrix, target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return false;
    }

    let colLen = matrix[0].length;
    let rowLen = matrix.length;
    let row = 0;
    let col = colLen-1;
    
    while(row < rowLen && col >= 0) {
        let cur =  matrix[row][col];
        if (cur === target) return true;
        cur > target ? col-- : row++;
    }

    return false;
}

// way2
function findNumberIn2DArray(matrix, target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
        return false;
    }

    return findNumberIn2DArrayCall(matrix, target, 0, 0, matrix[0].length-1, matrix.length-1);

    function findNumberIn2DArrayCall(matrix, target, startX, startY, endX, endY) {
        let midX =  startX + Math.floor((endX-startX)/2);
        let midY =  startY + Math.floor((endY-startY)/2);

        if (startX > endX || startY > endY) return false;
        else if (matrix[midY][midX] == target) return true;
        else if ( matrix[midY][midX] > target) {
            let zone1 = findNumberIn2DArrayCall(matrix, target, startX, startY, midX-1, midY-1);
            let zone2 = findNumberIn2DArrayCall(matrix, target, midX, startY, endX, midY-1);
            let zone3 = findNumberIn2DArrayCall(matrix, target, startX, midY, midX-1, endY);
            return zone1 || zone2 || zone3;
        }
        else {
            let zone1 = findNumberIn2DArrayCall(matrix, target, midX+1, startY, endX, midY);
            let zone2 = findNumberIn2DArrayCall(matrix, target, midX+1, midY+1, endX, endY);
            let zone3 = findNumberIn2DArrayCall(matrix, target, startX, midY+1, midX, endY);
            return zone1 || zone2 || zone3;
        }
    }
}