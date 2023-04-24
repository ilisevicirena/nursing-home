import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationManagementComponent } from './accomodation-management.component';

describe('AccomodationManagementComponent', () => {
  let component: AccomodationManagementComponent;
  let fixture: ComponentFixture<AccomodationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccomodationManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
