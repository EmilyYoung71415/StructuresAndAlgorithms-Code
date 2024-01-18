import { buildLinkedList, expectListAs } from '@utils';
import { reverseKGroup } from './dfs';
import { reverseKGroup as reverseKGroup_dummy } from './dummy';

test('reverseKGroup should work', () => {
  const inputArr = [1, 2, 3, 4, 5];
  const k = 2;
  const expected = [2, 1, 4, 3, 5];
  const head = buildLinkedList(inputArr);
  const last = reverseKGroup(head, k);
  const shouldWork = expectListAs(last, expected);
  expect(shouldWork).toBeTruthy();
});

test('reverseKGroup_dummy should work', () => {
  const inputArr = [1, 2, 3, 4, 5];
  const k = 2;
  const expected = [2, 1, 4, 3, 5];
  const head = buildLinkedList(inputArr);
  const last = reverseKGroup_dummy(head, k);
  const shouldWork = expectListAs(last, expected);
  expect(shouldWork).toBeTruthy();
});
