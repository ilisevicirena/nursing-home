import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsPickerComponent } from './discounts-picker.component';

describe('DiscountsPickerComponent', () => {
  let component: DiscountsPickerComponent;
  let fixture: ComponentFixture<DiscountsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
