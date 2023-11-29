import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonBasicDataComponent } from './person-basic-data.component';

describe('PersonBasicDataComponent', () => {
  let component: PersonBasicDataComponent;
  let fixture: ComponentFixture<PersonBasicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonBasicDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonBasicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
