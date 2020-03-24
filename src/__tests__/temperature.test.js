import { toC, toF } from 'util/temperature';

describe('temperature', () => {
  test('toC', () => {
    expect(toC(273.15)).toBe(0);
  });

  test('toF', () => {
    expect(Number(toF(100).toFixed(2))).toBe(-279.67);
  });
});
