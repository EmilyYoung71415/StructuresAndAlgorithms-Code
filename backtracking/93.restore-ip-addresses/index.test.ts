import { restoreIpAddresses } from './index';

test('restoreIpAddresses should work1', () => {
  const output = restoreIpAddresses('25525511135');
  expect(output.sort()).toStrictEqual(['255.255.11.135', '255.255.111.35'].sort());
});

test('restoreIpAddresses should work2', () => {
  const output = restoreIpAddresses('0000');
  expect(output.sort()).toStrictEqual(['0.0.0.0'].sort());
});

test('restoreIpAddresses should work3', () => {
  const output = restoreIpAddresses('101023');
  expect(output.sort()).toStrictEqual(
    ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3'].sort(),
  );
});
