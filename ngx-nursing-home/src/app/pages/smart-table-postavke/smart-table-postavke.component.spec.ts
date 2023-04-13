import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTablePostavkeComponent } from './smart-table-postavke.component';

describe('SmartTablePostavkeComponent', () => {
  let component: SmartTablePostavkeComponent;
  let fixture: ComponentFixture<SmartTablePostavkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTablePostavkeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTablePostavkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
