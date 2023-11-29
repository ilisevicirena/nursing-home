import { TestBed } from '@angular/core/testing';

import { AccommodationPdfRequestService } from './accommodation-pdf-request.service';

describe('AccommodationPdfRequestService', () => {
  let service: AccommodationPdfRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationPdfRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
