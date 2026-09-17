import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditMedicationComponent } from './add-edit-medication.component';

describe('AddEditMedicationComponent', () => {
  let component: AddEditMedicationComponent;
  let fixture: ComponentFixture<AddEditMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMedicationComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
