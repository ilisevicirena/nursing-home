import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureStatusesComponent } from './furniture-statuses.component';

describe('FurnitureStatusesComponent', () => {
  let component: FurnitureStatusesComponent;
  let fixture: ComponentFixture<FurnitureStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnitureStatusesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnitureStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
