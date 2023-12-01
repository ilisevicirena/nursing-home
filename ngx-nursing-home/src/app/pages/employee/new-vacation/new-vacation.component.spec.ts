import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVacationComponent } from './new-vacation.component';

describe('NewVacationComponent', () => {
  let component: NewVacationComponent;
  let fixture: ComponentFixture<NewVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVacationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
