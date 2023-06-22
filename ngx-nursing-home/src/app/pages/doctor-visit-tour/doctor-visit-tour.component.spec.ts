import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVisitTourComponent } from './doctor-visit-tour.component';

describe('DoctorVisitTourComponent', () => {
  let component: DoctorVisitTourComponent;
  let fixture: ComponentFixture<DoctorVisitTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorVisitTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorVisitTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
