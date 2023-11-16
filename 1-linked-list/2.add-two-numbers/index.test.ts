import { buildLinkedList, expectListAs } from '@utils';
import { addTwoNumbers as addTwoNumbers_dfs } from './dfs';
import { addTwoNumbers as addTwoNumbers_iterator } from './iterator';

const TEST_DATA = [
  {
    l1: [9, 9, 9, 9, 9, 9, 9],
    l2: [9, 9, 9, 9],
    expected: [8, 9, 9, 9, 0, 0, 0, 1],
  },
  {
    l1: [2, 4, 3],
    l2: [5, 6, 4],
    expected: [7, 0, 8],
  },
  {
    l1: [0],
    l2: [0],
    expected: [0],
  },
];

describe('addTwoNumbers_dfs should work', () => {
  TEST_DATA.forEach((testData, index) => {
    test(`test ${index}`, () => {
      const l1 = buildLinkedList(testData.l1);
      const l2 = buildLinkedList(testData.l2);
      const l3 = addTwoNumbers_dfs(l1, l2);
      expect(expectListAs(l3, testData.expected)).toBeTruthy();
    });
  });
});

describe('addTwoNumbers_iterator should work', () => {
  TEST_DATA.forEach((testData, index) => {
    test(`test ${index}`, () => {
      const l1 = buildLinkedList(testData.l1);
      const l2 = buildLinkedList(testData.l2);
      const l3 = addTwoNumbers_iterator(l1, l2);
      expect(expectListAs(l3, testData.expected)).toBeTruthy();
    });
  });
});
