import { TestBed } from '@angular/core/testing';

import { CalculationApiService } from './calculation-api.service';

describe('CalculationApiService', () => {
  let service: CalculationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
