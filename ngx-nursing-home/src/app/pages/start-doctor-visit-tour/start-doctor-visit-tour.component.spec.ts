import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDoctorVisitTourComponent } from './start-doctor-visit-tour.component';

describe('StartDoctorVisitTourComponent', () => {
  let component: StartDoctorVisitTourComponent;
  let fixture: ComponentFixture<StartDoctorVisitTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDoctorVisitTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartDoctorVisitTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
