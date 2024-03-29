import { fib_pre_for } from './preorder-FOR';
import { fib_pre_bfs } from './preorder-BFS';
import { fib_pre_dfs } from './preorder-DFS';
import { fib as fibPreOrderDFS_Stack_Mock } from './dfs-preorder-stack-mock';
import { fib as fibPostOrderDFS_Stack_Mock } from './dfs-postorder-stack-mock';
import { fib_post_dfs } from './postorder-DFS';

const inputs = [0, 1, 2, 3, 4, 5, 6, 7];
const outputs = [0, 1, 1, 2, 3, 5, 8, 13];

test('fibPreOrderFor should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    expect(fib_pre_for(input)).toBe(expected);
  });
});

test('fibPreOrderBFS should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    expect(fib_pre_bfs(input)).toBe(expected);
  });
});

test('fibPreOrderDFS should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    const res = fib_pre_dfs(input);
    expect(res).toBe(expected);
  });
});

test('fibPreOrderDFS_Stack_Mock should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    const res = fibPreOrderDFS_Stack_Mock(input);
    expect(res).toBe(expected);
  });
});

test('fibPostOrderDFS should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    const res = fib_post_dfs(input);
    expect(res).toBe(expected);
  });
});

test('fibPostOrderDFS_Stack_Mock should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    const res = fibPostOrderDFS_Stack_Mock(input);
    expect(res).toBe(expected);
  });
});
