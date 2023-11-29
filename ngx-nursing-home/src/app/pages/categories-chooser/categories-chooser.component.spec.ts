import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesChooserComponent } from './categories-chooser.component';

describe('CategoriesChooserComponent', () => {
  let component: CategoriesChooserComponent;
  let fixture: ComponentFixture<CategoriesChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
