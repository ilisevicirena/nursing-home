import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteExportComponent } from './note-export.component';

describe('NoteExportComponent', () => {
  let component: NoteExportComponent;
  let fixture: ComponentFixture<NoteExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
