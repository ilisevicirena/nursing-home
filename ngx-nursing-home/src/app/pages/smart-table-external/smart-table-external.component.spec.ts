import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableExternalComponent } from './smart-table-external.component';

describe('SmartTableExternalComponent', () => {
  let component: SmartTableExternalComponent;
  let fixture: ComponentFixture<SmartTableExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTableExternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
