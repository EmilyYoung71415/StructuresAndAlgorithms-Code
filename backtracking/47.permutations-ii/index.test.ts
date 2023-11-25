import { serializeMatrix } from '@utils';
import { permuteUnique } from './index';

test('permuteUnique should work', () => {
  const out = permuteUnique([1, 1, 2]);
  expect(serializeMatrix(out)).toBe(
    serializeMatrix([
      [1, 1, 2],
      [1, 2, 1],
      [2, 1, 1],
    ]),
  );
});

test('permuteUnique should work2', () => {
  const out = permuteUnique([1, 2, 3]);
  expect(serializeMatrix(out)).toBe(
    serializeMatrix([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]),
  );
});
