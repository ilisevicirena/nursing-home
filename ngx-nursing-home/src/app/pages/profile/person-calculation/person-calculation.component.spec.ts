import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCalculationComponent } from './person-calculation.component';

describe('PersonCalculationComponent', () => {
  let component: PersonCalculationComponent;
  let fixture: ComponentFixture<PersonCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
