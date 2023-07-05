import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidCalculationModalComponent } from './paid-calculation-modal.component';

describe('PaidCalculationModalComponent', () => {
  let component: PaidCalculationModalComponent;
  let fixture: ComponentFixture<PaidCalculationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidCalculationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidCalculationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
