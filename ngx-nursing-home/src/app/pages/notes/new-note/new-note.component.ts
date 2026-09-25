import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { getString } from "../../../resources/strings";
import { Subscription } from "rxjs";
import { NotesService } from "../../../services/rest/notes.service";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { NoteTagsComponent } from "../note-tags/note-tags.component";
import { NoteDocumentsComponent } from "../note-documents/note-documents.component";
import { hexToRgbA } from "../../../resources/functions";

@Component({
    selector: "sample-new-note",
    templateUrl: "./new-note.component.html",
    styleUrls: ["./new-note.component.scss"],
    standalone: false
})
export class NewNoteComponent implements OnInit, OnDestroy {
  constructor(
    private _notesService: NotesService,
    private _dialogService: DialogService
  ) {}

  @Input() selectedNote: any;
  @Input() personId: number;

  @Output() saved: EventEmitter<number> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();

  public getString = getString;
  public hexToRgbA = hexToRgbA;
  public config: any = {
    placeholder: getString("typeText"),
    height: "350px",
    toolbar: [
      ["misc", ["codeview", "undo", "redo"]],
      [
        "font",
        [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "superscript",
          "subscript",
          "clear",
        ],
      ],
      ["fontsize", ["fontsize", "color"]],
      ["para", ["style", "ul", "ol", "paragraph", "height"]],
      ["insert", ["table", "link", "hr"]],
    ],
    fontNames: ["Open Sans"],
  };

  private _subs: Subscription[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public saveNote(): void {
    if (this.selectedNote.Id == 0) {
      this.selectedNote.Tags = this.selectedNote.Tags.map((x) => x.Id);
      this._subs.push(
        this._notesService.add(this.selectedNote).subscribe((data) => {
          if (data.NoteId) {
            //save documents if any
            if (this.selectedNote.Documents.length > 0) {
              for (
                let index = 0;
                index < this.selectedNote.Documents.length;
                index++
              ) {
                const element = this.selectedNote.Documents[index];
                element.NoteId = data.NoteId;
                this._subs.push(
                  this._notesService
                    .addDocumentToNote(element)
                    .subscribe(() => {
                      if (index == this.selectedNote.Documents.length - 1)
                        this.saved.emit(data.NoteId);
                    })
                );
              }
            } else this.saved.emit(data.NoteId);
          }
        })
      );
    } else {
      this._subs.push(
        this._notesService.update(this.selectedNote).subscribe(() => {
          this.saved.emit(this.selectedNote.Id);
        })
      );
    }
  }

  public cancelSave(): void {
    this.canceled.emit(true);
  }

  public openTagsDialog(): void {
    this._subs.push(
      this._dialogService
        .open(NoteTagsComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: 0,
            selectedTags: this.selectedNote.Tags,
          },
        })
        .onClose.subscribe((result) => {
          if (result.changes) this.selectedNote.Tags = result.selectedTags;
        })
    );
  }

  public openDocumentsDialog(): void {
    this._subs.push(
      this._dialogService
        .open(NoteDocumentsComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            noteId: this.selectedNote.Id,
            showUploadBtn: true,
            personId: this.personId,
            documents: this.selectedNote.Documents,
          },
        })
        .onClose.subscribe((result) => {
          if (result.changes) this.selectedNote.Documents = result.documents;
        })
    );
  }
}
