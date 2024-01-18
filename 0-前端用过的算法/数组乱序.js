/**
 * 数组乱序
 * 
 *      demo1:Math.random() - 0.5;
 *          var values = [1, 2, 3, 4, 5];

            values.sort(function(){
                return Math.random() - 0.5;
            });

            console.log(values)
 * 
 *      Fisher–Yates
 *          原理：遍历数组，将当前元素与随机元素进行交换
 *          使用生产器？
 */

function shuffle(arr) {
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
    return arr;
}


/**
 * 
 * 使用生成器实现洗牌与抽奖算法
 * 
 * 
 * 
 */


function* $numbers() {
    for (let i = 0; i < Infinity; i++) {
        yield i
    }
}

function* $limit(iterator, max = 1) {
    for (let i = 0; i < max; i++) {
        const result = iterator.next()
        if (!result.done) {
            yield result.value
        }
    }
}
// shuffle
function* $pickCard(...cards) {
    for (let i = cards.length - 1; i >= 0; i--) {
        const pickedIndex = Math.floor(Math.random() * i)
        const tmp = cards[pickedIndex]
        cards[pickedIndex] = cards[i]
        cards[i] = tmp
        yield cards[i]
    }
}

const cards = $limit($numbers(), 52)
const pickCard = $pickCard(...cards)// 打乱
//console.log([...pickCard])

const pickTen = $limit(pickCard, 10)// 从打乱的牌里选10张
console.log([...pickTen])