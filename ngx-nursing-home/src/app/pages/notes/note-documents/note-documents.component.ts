import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../../resources/strings";
import { Subscription } from "rxjs";
import { NotesService } from "../../../services/rest/notes.service";
import { NbDialogRef, NbMenuItem } from "@nebular/theme";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { UploadDocumentComponent } from "../../documents/upload-document/upload-document.component";
import { DocumentsService } from "../../../services/rest/documents.service";
import { ToastrService } from "../../../services/toastr.service";
import { fileDownload, makeId, previewFile } from "shared-components";

@Component({
  selector: "sample-note-documents",
  templateUrl: "./note-documents.component.html",
  styleUrls: ["./note-documents.component.scss"],
})
export class NoteDocumentsComponent implements OnInit, OnDestroy {
  public getString = getString;
  public noteId: number = 0;
  public documents: any[] = [];
  public personId: number;
  public showUploadBtn: boolean;

  private _subs: Subscription[] = [];
  private _changes: boolean = false;

  constructor(
    private _ref: NbDialogRef<NoteDocumentsComponent>,
    private _notesService: NotesService,
    private _dialogService: DialogService,
    private _documentsService: DocumentsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.noteId > 0) this.getNoteDocuments();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getNoteDocuments(): void {
    this._subs.push(
      this._notesService.getNoteDocuments(this.noteId).subscribe((data) => {
        this.documents = data;
      })
    );
  }

  public openUploadDocumentDialog(): void {
    this._subs.push(
      this._dialogService
        .open(UploadDocumentComponent, {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            personId: this.personId,
            notesMode: true,
            selectedType: 5,
          },
        })
        .onClose.subscribe((data) => {
          if (data.saved) {
            this._changes = true;

            if (this.noteId > 0) {
              data.document.NoteId = this.noteId;
              this._subs.push(
                this._notesService
                  .addDocumentToNote(data.document)
                  .subscribe(() => {
                    this.getNoteDocuments();
                  })
              );
            } else {
              data.document.Id = makeId(15);
              this.documents.push(data.document);
            }
          }
        })
    );
  }

  public close(): void {
    this._ref.close({ changes: this._changes, documents: this.documents });
  }

  public async onFileMenuItemClick(item: NbMenuItem): Promise<any> {
    switch (item.data.code) {
      case "download":
        if (this.noteId > 0) {
          this._subs.push(
            this._documentsService
              .getDocumentContent(item.data.file.id)
              .subscribe(
                (data) => {
                  if (data) {
                    this._toastrService.showToastWithCustumIcon(
                      "info",
                      getString("downloadStartSoon"),
                      "",
                      "download-outline"
                    );
                    fileDownload(
                      data.content,
                      data.document.Name + "." + data.document.Extension
                    );
                  }
                },
                (err) => {
                  this._toastrService.showToast(
                    "danger",
                    getString("fileNotFound")
                  );
                }
              )
          );
        } else {
          var doc = this.documents.find((x) => x.Id == item.data.file.id);
          fileDownload(doc.Base64, doc.Name + "." + doc.Extension);
        }
        break;

      case "preview":
        if (this.noteId > 0) {
          this._subs.push(
            this._documentsService
              .getDocumentContent(item.data.file.id)
              .subscribe(
                (data) => {
                  if (data)
                    previewFile(
                      data.content,
                      data.document.Extension,
                      data.document.Name + "." + data.document.Extesion
                    );
                },
                (err) => {
                  this._toastrService.showToast(
                    "danger",
                    getString("fileNotFound")
                  );
                }
              )
          );
        } else {
          var doc = this.documents.find((x) => x.Id == item.data.file.id);
          previewFile(
            doc.Base64,
            doc.Extension,
            doc.Name + "." + doc.Extension
          );
        }
        break;

      case "delete":
        this._changes = true;

        if (this.noteId > 0) {
          this._subs.push(
            this._notesService
              .deleteDocumentFromNote(item.data.file.id, this.noteId)
              .subscribe(() => {
                this.getNoteDocuments();
              })
          );
        } else
          this.documents.splice(
            this.documents.findIndex((y) => y.Id == item.data.file.id),
            1
          );
        break;
    }
  }
}
