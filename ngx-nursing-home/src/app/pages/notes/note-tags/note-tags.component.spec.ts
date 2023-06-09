import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTagsComponent } from './note-tags.component';

describe('NoteTagsComponent', () => {
  let component: NoteTagsComponent;
  let fixture: ComponentFixture<NoteTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
