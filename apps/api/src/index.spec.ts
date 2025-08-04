import { describe, it, expect } from 'vitest';

import { sum } from './index.js';

describe('sum', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
