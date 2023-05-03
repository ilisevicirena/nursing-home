import { TestBed } from '@angular/core/testing';

import { PriceUnitsService } from './price-units.service';

describe('PriceUnitsService', () => {
  let service: PriceUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
