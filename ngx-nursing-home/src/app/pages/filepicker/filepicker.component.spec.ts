import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFilepickerComponent } from './filepicker.component';

describe('FilepickerComponent', () => {
  let component: NgxFilepickerComponent;
  let fixture: ComponentFixture<NgxFilepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxFilepickerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgxFilepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
