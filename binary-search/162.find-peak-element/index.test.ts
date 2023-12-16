import { findPeakElement } from './index';

test('findPeakElement should work', () => {
  expect(findPeakElement([1, 2, 3, 1])).toBe(2);

  const output = findPeakElement([1, 2, 1, 3, 5, 6, 4]);
  expect([1, 5].includes(output)).toBeTruthy();
});
