// https://leetcode-cn.com/problems/compare-version-numbers/
// leetcode:165
// 1.01 > 1.001 ==> 1
// 1.0 = 1.0.0  ==> 0
// 7.5.2.4 < 7.5.3 ==> -1

// 1.01 === 1.001 忽略前导0

// 两个指针
// 这个不是合并链表的变种么。。
const res = compareVersion('1.0', '1.0.0');
// const res = compareVersion('7.5.2.4', '7.5.3');
// const res = compareVersion('1.01', '1.001');

console.log(res);
function compareVersion1(version1 = '', version2 = '') {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  let i = (j = 0);
  const len1 = v1.length;
  const len2 = v2.length;
  while (i < len1 && j < len2) {
    if (+v1[i] === +v2[j]) {
      i++;
      j++;
    } else if (+v1[i] < +v2[j]) {
      return -1;
    } else {
      return 1;
    }
  }

  // len1 > len2
  while (i < len1) {
    if (+v1[i] === 0) {
      i++;
    } else {
      return 1;
    }
  }

  while (j < len2) {
    if (+v2[j] === 0) {
      j++;
    } else {
      return -1;
    }
  }

  return 0;
}

// 优化
// 分割+两次遍历
function compareVersion2(version1, version2) {
  const arr1 = version1.split('.');
  const arr2 = version2.split('.');
  const len1 = arr1.length;
  const len2 = arr2.length;
  const len = Math.max(len1, len2);
  for (let i = 0; i < len; i++) {
    const data1 = +arr1[i] || 0;
    const data2 = +arr2[i] || 0;
    if (data1 > data2) {
      return 1;
    }
    if (data1 < data2) {
      return -1;
    }
  }
  return 0;
}

// 双指针：
// 时间复杂度：O(max(m,n))
// 空间复杂度：O(1)

function compareVersion(v1, v2) {
  const len1 = v1.length;
  const len2 = v2.length;
  let i = (j = 0);

  while (i < len1 || j < len2) {
    let curV1 = (curV2 = '');
    // v1的分断数字大小
    while (i < len1 && v1[i] !== '.') {
      curV1 += v1[i++];
    }

    while (j < len2 && v2[j] !== '.') {
      curV2 += v2[j++];
    }
    curV1 = Number(curV1);
    curV2 = Number(curV2);
    if (curV1 > curV2) return 1;
    if (curV1 < curV2) return -1;
    i++;
    j++;
  }
  return 0;
}
