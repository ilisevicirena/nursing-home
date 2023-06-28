import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCalculationComponent } from './start-calculation.component';

describe('StartCalculationComponent', () => {
  let component: StartCalculationComponent;
  let fixture: ComponentFixture<StartCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
