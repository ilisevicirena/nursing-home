import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPopupWindowComponent } from './person-popup-window.component';

describe('PersonPopupWindowComponent', () => {
  let component: PersonPopupWindowComponent;
  let fixture: ComponentFixture<PersonPopupWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonPopupWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPopupWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
