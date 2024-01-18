# Problem

[207. Course Schedule](https://leetcode.com/problems/course-schedule/)

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where **prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.** [ai, bi]: bi -> ai

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.
Example 1:

输入：numCourses = 2, prerequisites = `[[1,0]]`
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

Example 2:
输入：numCourses = 2, prerequisites = `[[1,0],[0,1]]`
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成 ​ 课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。

# Clarify

preArr 里的节点个数 是等于 numCourses 的

# Think out loud

numCourse 表示节点个数
preArr 表示节点与节点之间的边： 有向连接关系
所以就是构建一个有向图，判断这个图是否存在环

判断图是否存在环，就是做拓扑排序，那么需要构建入度

1. 先要构建节点的入度关系

2. 如何遍历图得到图每个节点的入度关系?
   inDeg[index] = count;

3. 怎么判断图是否存在环？

   - way1: 先序 BFS：是否所有节点能够出队 （记录出队的节点个数，是否等于总节点个数 n
   - way2: 后序 DFS: 是否状态点被重复处理（重复访问了

4. 根据 preArr 建立有向图：二维邻接矩阵
   如果 x->y, 表示 y 对 x 依赖，x 向 y 扩展
   `graph[x] = []`
   `graph[x].push(y,z,a,b,c)` // 表示 x 向外扩展为 y，z，a，b

# Solution

- Way1: pre+bfs

  - `./pre_bfs.ts`

- Way2: pre+dfs
  - `./pre_dfs.ts`
