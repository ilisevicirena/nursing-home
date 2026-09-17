import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAllergenComponent } from './add-edit-allergen.component';

describe('AddEditAllergenComponent', () => {
  let component: AddEditAllergenComponent;
  let fixture: ComponentFixture<AddEditAllergenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAllergenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAllergenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
