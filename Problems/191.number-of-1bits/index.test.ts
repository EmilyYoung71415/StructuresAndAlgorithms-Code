import { hammingWeight } from './index';

test('hammingWeight should work', () => {
  // Test case 1: Input is  11的二进制：0b00000000000000000000000000001011
  expect(hammingWeight(11)).toBe(3);

  // Test case 2: Input is 0b00000000000000000000000010000000
  expect(hammingWeight(128)).toBe(1);

  // Test case 3: Input is 0b11111111111111111111111111111101
  expect(hammingWeight(4294967293)).toBe(31);
});
