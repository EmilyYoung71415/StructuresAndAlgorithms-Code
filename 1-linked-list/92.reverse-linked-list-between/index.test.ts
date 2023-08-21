import { buildLinkedList, expectListAs } from '../_util';
import { reverseBetween } from './index';

test.skip('reverseBetween should work', () => {
  const input = [1, 2, 3, 4, 5];
  const expected = [1, 4, 3, 2, 5];
  const head = buildLinkedList(input);
  const reverseListNode = reverseBetween(head, 2, 4);
  expect(expectListAs(reverseListNode, expected)).toBeTruthy();
});
