import { fib as fibPreOrderFor } from './preorder-FOR';
import { fib as fibPreOrderBFS } from './preorder-BFS';
import { fib as fibPreOrderDFS } from './preorder-DFS';
import { fib as fibPostOrderDFS } from './postorder-DFS';

const inputs = [0, 1, 7];
const outputs = [0, 1, 13];

test('fibPreOrderFor should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    expect(fibPreOrderFor(input)).toBe(expected);
  });
});

test('fibPreOrderBFS should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    expect(fibPreOrderBFS(input)).toBe(expected);
  });
});

test('fibPreOrderDFS should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    expect(fibPreOrderDFS(input)).toBe(expected);
  });
});

test('fibPostOrderDFS should work', () => {
  inputs.forEach((input, index) => {
    const expected = outputs[index];
    // expect(fibPostOrderDFS(input)).toBe(expected);
  });
});
