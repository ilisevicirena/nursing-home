import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVacationStatusComponent } from './change-vacation-status.component';

describe('ChangeVacationStatusComponent', () => {
  let component: ChangeVacationStatusComponent;
  let fixture: ComponentFixture<ChangeVacationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeVacationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeVacationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
