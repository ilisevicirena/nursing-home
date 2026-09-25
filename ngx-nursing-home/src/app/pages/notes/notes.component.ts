import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { TagsService } from "../../services/rest/tags.service";
import { NotesService } from "../../services/rest/notes.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { NoteTagsComponent } from "./note-tags/note-tags.component";
import { NoteDocumentsComponent } from "./note-documents/note-documents.component";
import { hexToRgbA } from "../../resources/functions";
import { NoteExportComponent } from "./note-export/note-export.component";
import { AuthService, UserRole } from "../../services/auth.service";

@Component({
    selector: "sample-notes",
    templateUrl: "./notes.component.html",
    styleUrls: ["./notes.component.scss"],
    standalone: false
})
export class NotesComponent implements OnInit, OnDestroy {
  @Input() personId: number = 0;
  @Input() personName: string = "";
  @Input() personLastName: string = "";

  @ViewChild(NoteExportComponent) noteExport: NoteExportComponent;

  public notes: any[] = [];
  public getString = getString;
  public hexToRgbA = hexToRgbA;
  public searchTerm: string = "";
  public allTags: any[] = [];
  public filters: any[] = [];
  public selectedNote: any;
  public editSelectedNote: any;
  public formMode: boolean = false;

  private _subs: Subscription[] = [];
  private _allNotes: any[] = [];

  constructor(
    private _tagsService: TagsService,
    private _notesService: NotesService,
    private _dialogService: DialogService,
    private _toastrService: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.personId > 0) this.getNotesForPerson();
    this.getTags();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getNotesForPerson(noteId = null): void {
    this._subs.push(
      this._notesService.getNotesForPerson(this.personId).subscribe((data) => {
        if (data) {
          data.Notes.map((x) => {
            x.Tags = data.Tags.filter((y) => y.NoteId == x.Id);
            x.Documents = data.Documents.filter((z) => z.NoteId == x.Id);
            return x;
          });

          this.notes = data.Notes;
          this._allNotes = data.Notes;

          if (noteId) {
            var note = this.notes.find((x) => x.Id == noteId);
            if (note) this.selectNote(note);

            this.filterNotes();
          }
        }
      })
    );
  }

  private filterNotes(): void {
    if (this.filters.length === 0) this.notes = this._allNotes;
    else {
      this.notes = this._allNotes.filter((note) =>
        note.Tags.some((tag) =>
          this.filters.some((filter) => filter.Id === tag.Id)
        )
      );
    }
  }

  private getTags(): void {
    this._subs.push(
      this._tagsService.getData().subscribe((data) => {
        this.allTags = data;
      })
    );
  }

  public toggleFavorite(note: any): void {
    if (note.IsFavorite) {
      this._subs.push(
        this._notesService.removeNoteFromFavorites(note.Id).subscribe(() => {
          note.IsFavorite = false;
        })
      );
    } else {
      this._subs.push(
        this._notesService.markNoteAsFavorite(note.Id).subscribe(() => {
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
    this._subs.push(
      this._notesService
        .removeTagFromNote(this.selectedNote.Id, tag.Id)
        .subscribe(() => {
          this.selectedNote.Tags.splice(
            this.selectedNote.Tags.findIndex((x) => x.Id == tag.Id),
            1
          );
        })
    );
  }

  public editNote(): void {
    this.formMode = true;
  }

  public newNote(): void {
    if (this.formMode) this.formMode = false;
    if (this.selectedNote) this.selectedNote.selected = false;
    this.selectedNote = {
      Id: 0,
      Title: undefined,
      Text: null,
      PersonFirstName: this.personName,
      LastModified: new Date(),
      PersonLastName: this.personLastName,
      PersonId: this.personId,
      UserId: this._authService.getUserId(),
      Documents: [],
      Tags: [],
    };
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
    this._subs.push(
      this._dialogService
        .open(NoteTagsComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: this.selectedNote.Id,
          },
        })
        .onClose.subscribe((result) => {
          if (result.changes) {
            this.selectedNote.Tags = result.selectedTags;
          }
        })
    );
  }

  public openDocumentsDialog(noteId = null): void {
    this._subs.push(
      this._dialogService
        .open(NoteDocumentsComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: noteId ?? this.selectedNote.Id,
            showUploadBtn: noteId ? false : true,
            personId: this.personId,
          },
        })
        .onClose.subscribe((result) => {
          if (result.changes) {
            this.selectedNote.Documents = result.documents;
          }
        })
    );
  }

  public filtersChanged(event: any): void {
    if (event.selected) this.filters.push(event);
    else
      this.filters.splice(
        this.filters.findIndex((x) => x.Id == event.Id),
        1
      );

    this.filterNotes();
  }

  public removeAllFilters(): void {
    this.allTags.map((t) => (t.selected = false));
    this.filters = [];
    this.filterNotes();
  }

  public async deleteNote(): Promise<void> {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete")
    );

    if (rez) {
      this._subs.push(
        this._notesService.delete(this.selectedNote).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.selectedNote = undefined;
          this.getNotesForPerson();
        })
      );
    }
  }

  public downloadNote(all: boolean = false): void {
    if (all) this.noteExport.downloadAsPDF(this.notes);
    else {
      if (this.selectedNote) this.noteExport.downloadAsPDF([this.selectedNote]);
    }
  }

  public checkUserHasPermission(): boolean {
    var isUser = this._authService.checkUserHasRole(UserRole.USER);
    return !isUser;
  }
}
