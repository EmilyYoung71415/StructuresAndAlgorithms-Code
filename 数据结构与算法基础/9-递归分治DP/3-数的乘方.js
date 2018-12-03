/**
 * 求一个整数的乘方
 * @param num 要乘方的数字
 * @param power 多少次方
 * @return
 */
console.log(getPower(2,13))

function getPower(num, power) {
    if (power == 1) {
        return num;
    }
    // 当次方为偶时可看成 两个x 从而能分解
    if (power % 2 == 0) {
        return getPower(num, power / 2) * getPower(num, power / 2);
    } else {
        return num * getPower(num, ~~(power/2)) * getPower(num, ~~(power/2));
    }
}