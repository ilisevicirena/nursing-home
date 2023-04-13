import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarSpinnerComponent } from './progressbar-spinner.component';

describe('ProgressbarSpinnerComponent', () => {
  let component: ProgressbarSpinnerComponent;
  let fixture: ComponentFixture<ProgressbarSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressbarSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressbarSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
