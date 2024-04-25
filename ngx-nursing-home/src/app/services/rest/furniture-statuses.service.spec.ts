import { TestBed } from '@angular/core/testing';

import { FurnitureStatusesService } from './furniture-statuses.service';

describe('FurnitureStatusesService', () => {
  let service: FurnitureStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FurnitureStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
