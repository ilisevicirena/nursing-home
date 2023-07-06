import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TagsService } from '../../services/rest/tags.service';
import { NotesService } from '../../services/rest/notes.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { Subscription } from 'rxjs';
import { getString } from '../../resources/strings';
import { NoteTagsComponent } from './note-tags/note-tags.component';
import { NoteDocumentsComponent } from './note-documents/note-documents.component';
import { hexToRgbA } from '../../resources/functions';

@Component({
  selector: 'sample-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  @Input() personId: number = 0;
  @Input() personName: string = "";
  @Input() personLastName: string = "";

  public notes: any[] = [];
  public getString = getString;
  public hexToRgbA = hexToRgbA;
  public searchTerm: string = "";
  public allTags: any[] = [];
  public filters: any[] = [];
  public selectedNote: any;
  public editSelectedNote: any;
  public formMode: boolean = false;

  private subs: Subscription[] = [];
  private allNotes: any[] = [];

  constructor(
    private tagsService: TagsService,
    private notesService: NotesService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.personId > 0) this.getNotesForPerson();
    this.getTags();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getNotesForPerson(noteId = null): void {
    this.subs.push(
      this.notesService.getNotesForPerson(this.personId).subscribe(data => {
        if (data) {
          data.Notes.map(x => {
            x.Tags = data.Tags.filter(y => y.NoteId == x.Id)
            x.Documents = data.Documents.filter(z => z.NoteId == x.Id);
            return x;
          });

          this.notes = data.Notes;
          this.allNotes = data.Notes;

          if (noteId) {
            var note = this.notes.find(x => x.Id == noteId);
            if (note) this.selectNote(note);

            this.filterNotes();
          }
        }
      })
    );
  }

  private filterNotes(): void {
    if (this.filters.length === 0)
      this.notes = this.allNotes;
    else {
      this.notes = this.allNotes.filter((note) =>
        note.Tags.some((tag) => this.filters.some((filter) => filter.Id === tag.Id))
      );
    }
  }

  private getTags(): void {
    this.subs.push(
      this.tagsService.getData().subscribe(data => {
        this.allTags = data;
      })
    );
  }

  public toggleFavorite(note: any) {
    if (note.IsFavorite) {
      this.subs.push(
        this.notesService.removeNoteFromFavorites(note.Id).subscribe(() => {
          note.IsFavorite = false;
        })
      );
    } else {
      this.subs.push(
        this.notesService.markNoteAsFavorite(note.Id).subscribe(() => {
          note.IsFavorite = true;
        })
      );
    }
  }

  public selectNote(note: any): void {
    this.formMode = false;
    if (this.selectedNote) this.selectedNote.selected = false;
    note.selected = true;
    this.selectedNote = note;
    this.editSelectedNote = JSON.parse(JSON.stringify(this.selectedNote));
  }

  public onNoteTagRemoved(tag: any): void {
    this.subs.push(
      this.notesService.removeTagFromNote(this.selectedNote.Id, tag.Id).subscribe(() => {
        this.selectedNote.Tags.splice(this.selectedNote.Tags.findIndex(x => x.Id == tag.Id), 1);
      }));
  }

  public editNote(): void {
    this.formMode = true;
  }

  public newNote(): void {
    if (this.formMode) this.formMode = false;
    if (this.selectedNote) this.selectedNote.selected = false;
    this.selectedNote = { Id: 0, Title: undefined, Text: null, PersonFirstName: this.personName, LastModified: new Date(), PersonLastName: this.personLastName, PersonId: this.personId, Documents: [], Tags: [] };
    this.editSelectedNote = JSON.parse(JSON.stringify(this.selectedNote));
    this.formMode = true;
  }

  public onNoteSaved(noteId: number): void {
    this.formMode = false;
    this.getNotesForPerson(noteId);
  }

  public onCanceledFormSave(): void {
    this.editSelectedNote = JSON.parse(JSON.stringify(this.selectedNote));
    if (this.selectedNote.Id == 0) this.selectedNote = undefined;
    this.formMode = false;
  }

  public openTagsDialog(): void {
    this.subs.push(
      this.dialogService.open(
        NoteTagsComponent,
        {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: this.selectedNote.Id
          }
        }
      ).onClose.subscribe(result => {
        if (result.changes) {
          this.selectedNote.Tags = result.selectedTags;
        }
      })
    );
  }

  public openDocumentsDialog(noteId = null): void {
    this.subs.push(
      this.dialogService.open(
        NoteDocumentsComponent,
        {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: noteId ?? this.selectedNote.Id,
            showUploadBtn: noteId ? false : true,
            personId: this.personId
          }
        }
      ).onClose.subscribe(result => {
        if (result.changes) {
          this.selectedNote.Documents = result.documents;
        }
      })
    );
  }

  public filtersChanged(event: any): void {
    if (event.selected) this.filters.push(event);
    else this.filters.splice(this.filters.findIndex(x => x.Id == event.Id), 1);

    this.filterNotes();
  }

  public removeAllFilters(): void {
    this.allTags.map(t => t.selected = false);
    this.filters = [];
    this.filterNotes();
  }

  public async deleteNote(): Promise<void> {
    const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToDelete'));

    if (rez) {
      this.subs.push(
        this.notesService.delete(this.selectedNote).subscribe(() => {
          this.toastrService.showToast('success', getString('saveSuccess'));
          this.selectedNote = undefined;
          this.getNotesForPerson();
        })
      );
    }
  }
}
