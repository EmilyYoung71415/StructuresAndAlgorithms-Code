import { meetingMaxValue as meetingMaxValue_for } from './preorder-for';
import { meetingMaxValue as meetingMaxValue_dfs } from './postorder-dfs';

const meetings: Array<[number, number]> = [
  [1, 3],
  [2, 4],
  [5, 8],
];
const values = [1, 3, 4]; // 7
const expected = 7;

test('meetingMaxValue_for should work', () => {
  const output = meetingMaxValue_for(meetings, values);
  expect(output).toBe(expected);
});

test('meetingMaxValue_dfs should work', () => {
  const output = meetingMaxValue_dfs(meetings, values);
  expect(output).toBe(expected);
});
