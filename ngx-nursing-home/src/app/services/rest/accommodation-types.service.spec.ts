import { TestBed } from '@angular/core/testing';

import { AccommodationTypesService } from './accommodation-types.service';

describe('AccommodationTypesService', () => {
  let service: AccommodationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
