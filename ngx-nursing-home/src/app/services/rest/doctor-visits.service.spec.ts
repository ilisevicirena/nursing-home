import { TestBed } from '@angular/core/testing';

import { DoctorVisitsService } from './doctor-visits.service';

describe('DoctorVisitsService', () => {
  let service: DoctorVisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorVisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
