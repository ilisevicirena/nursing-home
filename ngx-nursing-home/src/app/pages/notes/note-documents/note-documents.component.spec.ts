import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDocumentsComponent } from './note-documents.component';

describe('NoteDocumentsComponent', () => {
  let component: NoteDocumentsComponent;
  let fixture: ComponentFixture<NoteDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
