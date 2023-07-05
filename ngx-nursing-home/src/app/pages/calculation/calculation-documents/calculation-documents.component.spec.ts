import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationDocumentsComponent } from './calculation-documents.component';

describe('CalculationDocumentsComponent', () => {
  let component: CalculationDocumentsComponent;
  let fixture: ComponentFixture<CalculationDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
