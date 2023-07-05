import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPriceModalComponent } from './real-price-modal.component';

describe('RealPriceModalComponent', () => {
  let component: RealPriceModalComponent;
  let fixture: ComponentFixture<RealPriceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealPriceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealPriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
