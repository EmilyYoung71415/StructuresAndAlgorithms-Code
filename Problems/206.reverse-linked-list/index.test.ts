import { buildLinkedList, expectListAs } from '@utils';
import { reverseList as reverseList_dummy } from './dummy';
import { reverseList as reverseList_dfs } from './dfs';

test('reverseList_dummy should work', () => {
  const arr = [1, 2, 3, 4, 5];
  const head = buildLinkedList(arr);
  const last = reverseList_dummy(head);
  const shouldWork = expectListAs(last, arr.slice().reverse());
  expect(shouldWork).toBeTruthy();
});

test('reverseList_dfs should work', () => {
  const arr = [1, 2, 3, 4, 5];
  const head = buildLinkedList(arr);
  const last = reverseList_dfs(head);
  const shouldWork = expectListAs(last, arr.slice().reverse());
  expect(shouldWork).toBeTruthy();
});
