import { isValid } from './index';

describe('isValid', () => {
  it('case 1', () => {
    expect(isValid('()')).toBe(true);
  });

  it('case 2', () => {
    expect(isValid('()[]{}')).toBe(true);
  });

  it('case 3', () => {
    expect(isValid('(]')).toBe(false);
  });

  it('case 4', () => {
    expect(isValid('[')).toBe(false);
  });
});
