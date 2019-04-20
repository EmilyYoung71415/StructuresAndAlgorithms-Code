/****
 * leetcode:136、137
 * [136]:其他数出现了2次
 * [137]:其他数出现了3次
 * 
 * 在其他数都出现了k次的数组中找到只出现一次的数
 * 
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 * 
 */


/***
 * 思路:
 * 
 * 1、indexOf(item)==lastindexOf(item) 就是唯一的=>[通用]
 * 时间复杂度:n^2
 * 
 * 2、使用额外空间吗，hash or 桶数组 找到标记不为k的元素[通用]
 * 
 * 3、排序，找到arr[i]与arr[i+1]相比较 [通用]
 * 
 * 4、位运算:
 * 4.1 leetcode:136 其余元素2次 利用异或 两个相同元素异或抵消
 *      运用异或性质:相同为0，不同为1.且 0^n=n
 *      对于[136],其他数出现了2次，那么都是成对的，唯一的那个 0^n=n
 * 
 * 4.2 借鉴4.1的思路，我们设计一个运算使得 三个相同元素异或抵消
 *     即设计逻辑电路使得变化规律如右: 00->01->10->00
 *     ...
 * 解法2: 一个推广:k个相同的k进制数进行无相位相加，相加的结果一定是每位都是0的k进制数
 * ==>[通用]
 *      将nums的每个数都转换为k进制数，然后与 k进制000000(每位都是0)进行相加
 *      最终结果即是唯一数的k进制，再将其转换回来即可
 * 
 */
console.log(singleNumber([-2,-2,1,1,-3,1,-3,-3,-4,-2],3))

// way1
function singleNumber_136_137(nums){
    for(let data of nums){
        if(nums.indexOf(data)==nums.lastIndexOf(data)){
            return data;
        }
    }
}

// 额外空间
/***
 * 数有可能是非正..
 * ==>那就不能直接以数作为bucket的下标了,不能用数组
 * ===>用map
 */
function singleNumber_136_137(nums,k){
    let map = {};

    nums.forEach(data => {
        map[data] = (map[data]||0) + 1;
    });
    
    // 遍历map
    for(let key in map){
        if(map[key]!=k){
            return key;
        }
    }
}

// way3
function singleNumber(nums,k){
    nums.sort((a,b)=>a-b);
    for(let i=0;i<nums.length;i+=k){// 每次调k个 以免遇上[1,1,2] 1!=2的尴尬
        // 注意有可能 唯一元素在 数组末尾
        if((nums[i]!=nums[i+1])||i==nums.length-1){
            return nums[i]
        }
    }
}


// way4.1
function singleNumber_136(nums){
    let res = 0;

    for(let data of nums){
        res = res^data;
    }
    return res;
}

// way4.1 改进 一行解决
function singleNumber_136(nums){
    return nums.reduce((a,b)=>a^b);
}

/*****
 * ❌负数不支持
 * [x]错误过的案例:不支持负数T.T
 * 对于负数,ECMAScript 并不以二进制补码的形式显示，
 * 而是用数字绝对值的标准二进制代码前面加负号的形式输出
 * 本来
 * -18 的二进制表示即 1111 1111 1111 1111 1111 1111 1110 1110
 * 但是es里:-18 = -10010 即18前面加了个-
 * 
 */
function singleNumber(nums,k){
    let res = new Array(k).fill(0);
    // 转换为3进制数
    for(let i=0;i<nums.length;i++){
        nums[i] = nums[i].toString(k);//[ '11', '1', '2', '1', '2' ]
    }
    // 遍历nums 进行无进位相加
    for(let i=0;i<nums.length;i++){
       let num = nums[i].split('');// 11=>'1' '1'
       // 无进位相加 num=[1,2] 未占满 而res是占满了的
       // [1,2,3] [3,4] 从尾开始遍历 那么 3+4 相加 
       let count=k;
       if(num.length>k){
           count = num.length;
           let arrPlus = new Array(count-k).fill(0);
           res = arrPlus.concat(res);//在res之前补0
       }
       let p=count-1,q=num.length-1;// 两个遍历指针
       while(count--){
           num[q] =  q>=0?Number(num[q]):0;
           res[p] = res[p]||0;
           res[p] = (res[p]+num[q])%k; 
           p--;q--;
       }
    }
    res = res.join('')
    return (parseInt(String(res),k).toString(10))*1
}