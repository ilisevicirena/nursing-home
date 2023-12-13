import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVisitDetailsComponent } from './doctor-visit-details.component';

describe('DoctorVisitDetailsComponent', () => {
  let component: DoctorVisitDetailsComponent;
  let fixture: ComponentFixture<DoctorVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorVisitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
