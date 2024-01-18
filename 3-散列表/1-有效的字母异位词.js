/****
 * leetcode:242
 * 两个字符串除了字符顺序不一样，其余都一致
 *  Input: s = "anagram", t = "nagaram"
    Output: true
 * 
 * 思路:
 *  1、排序。 n*logn
 *  2、计数：map映射
 */
let s = 'abv',
  t = 'ba';
console.log(isAnagram(t, s));
function isAnagram1(str_s, str_t) {
  let map = new Map();
  if (str_s.length !== str_t.length) return false;
  // 遍历s
  for (let s of str_s) {
    // 优化下
    let count = (map.get(s) || 0) + 1;
    map.set(s, count);
    // if(!map.has(s)){
    //     map.set(s,1);
    // }else{
    //     let count = map.get(s)+1;
    //     // map.set(s,count++);// 不支持这样写？
    //     map.set(s,count)
    // }
  }
  // 遍历t
  for (let t of str_t) {
    if (!map.has(t) || map.get(t) <= 0) {
      return false;
    }
    let count = map.get(t) - 1;
    // map.set(t,count--);
    map.set(t, count);
  }
  return true;
}

// ===> 不能  ❗ 错误代码
// 这是判断两者的内存地址是否相同，那么有没有可能判断浅相等呢?
// _.isEqual(obj1, obj2)
function isAnagram(str_s, str_t) {
  let map1 = new Map(),
    map2 = new Map();
  for (let s of str_s) {
    let count = (map1.get(s) || 0) + 1;
    map1.set(s, count);
  }

  for (let t of str_t) {
    let count = (map2.get(t) || 0) + 1;
    map2.set(t, count);
  }
  return map1 == map2;
}

// 排序
function isAnagram2(str_s, str_t) {
  return str_s.split('').sort().join('') == str_t.split('').sort().join('');
}
