import { mergeNumAndPrintf, mergeConsecutive } from './index';

test('mergeAndPrintfNum should work', () => {
  const input = '12223333752';
  const expected = [1, 8, 12, 7, 5];
  const result = mergeNumAndPrintf(input);
  expect(result).toStrictEqual(expected);
});

test('merge consecutive should work', () => {
  const input = '12223333752';
  const expected = [1, 6, 12, 7, 5, 2];
  const result = mergeConsecutive(input);
  expect(result).toStrictEqual(expected);
});
