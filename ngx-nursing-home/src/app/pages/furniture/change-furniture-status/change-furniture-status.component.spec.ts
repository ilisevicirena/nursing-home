import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFurnitureStatusComponent } from './change-furniture-status.component';

describe('ChangeFurnitureStatusComponent', () => {
  let component: ChangeFurnitureStatusComponent;
  let fixture: ComponentFixture<ChangeFurnitureStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFurnitureStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeFurnitureStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
