import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTablePopupComponent } from './smart-table-popup.component';

describe('SmartTablePopupComponent', () => {
  let component: SmartTablePopupComponent;
  let fixture: ComponentFixture<SmartTablePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTablePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
