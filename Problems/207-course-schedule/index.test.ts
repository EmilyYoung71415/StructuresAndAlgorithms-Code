import { canFinish as canFinish_BFS } from './pre_bfs';
import { canFinish as canFinish_DFS } from './pre_dfs';

test('course-schedule canFinish_BFS should work', () => {
  // numCourses = 2, prerequisites = [[1,0]]
  const output1 = canFinish_BFS(2, [[1, 0]]);
  expect(output1).toBe(true);

  // numCourses = 2, prerequisites = [[1,0],[0,1]]
  const output2 = canFinish_BFS(2, [
    [1, 0],
    [0, 1],
  ]);
  expect(output2).toBe(false);
});

test.only('course-schedule canFinish_DFS should work', () => {
  // numCourses = 2, prerequisites = [[1,0]]
  const output1 = canFinish_DFS(2, [[1, 0]]);
  expect(output1).toBe(true);

  // numCourses = 2, prerequisites = [[1,0],[0,1]]
  const output2 = canFinish_DFS(2, [
    [1, 0],
    [0, 1],
  ]);
  expect(output2).toBe(false);
});
