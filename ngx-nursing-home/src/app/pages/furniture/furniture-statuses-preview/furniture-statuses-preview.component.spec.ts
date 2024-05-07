import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureStatusesPreviewComponent } from './furniture-statuses-preview.component';

describe('FurnitureStatusesPreviewComponent', () => {
  let component: FurnitureStatusesPreviewComponent;
  let fixture: ComponentFixture<FurnitureStatusesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnitureStatusesPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnitureStatusesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
