import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBasicDataComponent } from './employee-basic-data.component';

describe('EmployeeBasicDataComponent', () => {
  let component: EmployeeBasicDataComponent;
  let fixture: ComponentFixture<EmployeeBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBasicDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
