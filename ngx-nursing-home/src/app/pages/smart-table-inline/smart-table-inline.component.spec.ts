import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableInlineComponent } from './smart-table-inline.component';

describe('SmartTableComponent', () => {
  let component: SmartTableInlineComponent;
  let fixture: ComponentFixture<SmartTableInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartTableInlineComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SmartTableInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
