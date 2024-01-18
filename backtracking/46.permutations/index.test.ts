import { serializeMatrix } from '@utils';
import { permute } from './index';

test('permute should work1', () => {
  const output = permute([1, 2, 3]);
  expect(serializeMatrix(output)).toBe(
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

test('permute should work2', () => {
  const output = permute([0, 1]);
  expect(serializeMatrix(output)).toBe(
    serializeMatrix([
      [0, 1],
      [1, 0],
    ]),
  );
});

test('permute should work3', () => {
  const output = permute([1]);
  expect(serializeMatrix(output)).toBe(serializeMatrix([[1]]));
});
