import { LinkedListF } from '@utils';
import { hasCircle } from './index';

function createCircleLink(arr: number[], circleTail?: number, circleHead?: number) {
  const linkedList = new LinkedListF();
  const arr2 = arr.reverse();
  arr2.forEach(data => {
    linkedList.add(data);
  });

  if (circleTail && circleHead) {
    const tail = linkedList.getItem(circleTail);
    const targetNode = linkedList.getItem(circleHead);
    tail.next = targetNode;
  }

  return linkedList.head.next;
}

test('hasCircle should work', () => {
  const link = createCircleLink([3, 2, 0, -4], -4, 2);
  const output = hasCircle(link);
  expect(output).toBeFalsy();
});

test('hasCircle should work', () => {
  const link = createCircleLink([1, 2], 2, 1);
  const output = hasCircle(link);
  expect(output).toBeFalsy();
});
