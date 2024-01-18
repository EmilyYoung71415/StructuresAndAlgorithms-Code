import { buildLinkedList, expectListAs } from '@utils';
import { mergeTwoLists as mergeTwoLists_dfs } from './dfs';
import { mergeTwoLists as mergeTwoLists_iterator } from './iterator';

test('mergeTwoLists dfs should work', () => {
  const input1 = [1, 2, 4];
  const input2 = [1, 3, 4];
  const output = [1, 1, 2, 3, 4, 4];
  const link1 = buildLinkedList(input1);
  const link2 = buildLinkedList(input2);
  const link3 = mergeTwoLists_dfs(link1, link2);
  expect(expectListAs(link3, output)).toBeTruthy();
});

test('mergeTwoLists iterator should work', () => {
  const input1 = [1, 2, 4];
  const input2 = [1, 3, 4];
  const output = [1, 1, 2, 3, 4, 4];
  const link1 = buildLinkedList(input1);
  const link2 = buildLinkedList(input2);
  const link3 = mergeTwoLists_iterator(link1, link2);
  expect(expectListAs(link3, output)).toBeTruthy();
});
