import { TestBed } from '@angular/core/testing';

import { CoinbaseProService } from './coinbase-pro.service';

describe('CoinbaseProService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoinbaseProService = TestBed.get(CoinbaseProService);
    expect(service).toBeTruthy();
  });
});
