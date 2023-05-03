import { TestBed } from '@angular/core/testing';

import { MeasureUnitsService } from './measure-units.service';

describe('MeasureUnitsService', () => {
  let service: MeasureUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
