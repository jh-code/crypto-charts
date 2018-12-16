import { PriceStringPipe } from './price-string.pipe';

describe('PriceStringPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceStringPipe();
    expect(pipe).toBeTruthy();
  });
});
