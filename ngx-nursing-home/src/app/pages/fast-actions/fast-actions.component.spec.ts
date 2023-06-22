import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastActionsComponent } from './fast-actions.component';

describe('FastActionsComponent', () => {
  let component: FastActionsComponent;
  let fixture: ComponentFixture<FastActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
