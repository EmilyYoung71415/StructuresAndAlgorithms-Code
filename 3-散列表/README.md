# Hash

> 散列表即键值对的集合,js里常用{ }、new Map()表示

**知识点**

- 散列函数与散列表
- 处理冲突的方法
  - 开放地址法
  - 拉链法
- js里的Map、WeakMap

**经典题**

- 有效字母异位词
- two sum
- three sum

leetcode建议练习题号：

- [242、有效的字母异位词](https://leetcode.com/problems/valid-anagram)
- [1、two sum](https://leetcode.com/problems/two-sum)
- [15、3sum](https://leetcode.com/problems/3sum)
- [4、4sum](https://leetcode.com/problems/4sum)

**业界应用**

- 哈希算法应用:安全加密、数据校验、唯一标识、散列函数
- 哈希算法在分布式系统的应用:
- 打造工业级水平的散列表
- 散列表应用-布隆过滤器
- 散列表应用思考
  - word的单词拼写检查功能
  - 将10万条URL访问日志的数据按照访问次数排序
  - 两个字符串数组，每个数组10万条字符串，如何快速找出两个数组中相同的字符串
