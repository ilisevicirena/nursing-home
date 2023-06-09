import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../../resources/strings';
import { Subscription } from 'rxjs';
import { NotesService } from '../../../services/rest/notes.service';
import { NbDialogRef, NbMenuItem } from '@nebular/theme';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { UploadDocumentComponent } from '../../documents/upload-document/upload-document.component';
import { DocumentsService } from '../../../services/rest/documents.service';
import { ToastrService } from '../../../services/toastr.service';
import { fileDownload, makeId, previewFile } from 'shared-components';

@Component({
  selector: 'sample-note-documents',
  templateUrl: './note-documents.component.html',
  styleUrls: ['./note-documents.component.scss']
})
export class NoteDocumentsComponent implements OnInit, OnDestroy {

  public getString = getString;
  public noteId: number = 0;
  public documents: any[] = [];
  public personId: number;
  public showUploadBtn: boolean;

  private subs: Subscription[] = [];
  private changes: boolean = false;

  constructor(
    private ref: NbDialogRef<NoteDocumentsComponent>,
    private notesService: NotesService,
    private dialogService: DialogService,
    private documentsService: DocumentsService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.noteId > 0) this.getNoteDocuments();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getNoteDocuments(): void {
    this.subs.push(
      this.notesService.getNoteDocuments(this.noteId).subscribe(data => {
        this.documents = data;
      })
    );
  }

  public openUploadDocumentDialog(): void {
    this.subs.push(
      this.dialogService.open(UploadDocumentComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            personId: this.personId,
            notesMode: true,
            selectedType: 5
          }
        }
      ).onClose.subscribe(data => {
        if (data.saved) {
          this.changes = true;

          if (this.noteId > 0) {
            data.document.NoteId = this.noteId;
            this.subs.push(
              this.notesService.addDocumentToNote(data.document).subscribe(() => {
                this.getNoteDocuments();
              })
            );
          }
          else {
            data.document.Id = makeId(15);
            this.documents.push(data.document);
          }

        }
      })
    );
  }

  public close(result): void {
    this.ref.close({ changes: this.changes, documents: this.documents });
  }

  public async onFileMenuItemClick(item: NbMenuItem): Promise<any> {
    switch (item.data.code) {
      case "download":
        if (this.noteId > 0) {
          this.subs.push(
            this.documentsService.getDocumentContent(item.data.file.id).subscribe(data => {
              if (data) {
                this.toastrService.showToastWithCustumIcon('info', getString('downloadStartSoon'), '', 'download-outline');
                fileDownload(data.content, data.document.Name + "." + data.document.Extension);
              }
            }, err => {
              this.toastrService.showToast('danger', getString('fileNotFound'));
            })
          );
        } else {
          var doc = this.documents.find(x => x.Id == item.data.file.id);
          fileDownload(doc.Base64, doc.Name + "." + doc.Extension);
        }
        break;
      case "preview":
        if (this.noteId > 0) {
          this.subs.push(
            this.documentsService.getDocumentContent(item.data.file.id).subscribe(data => {
              if (data) previewFile(data.content, data.document.Extension, data.document.Name + "." + data.document.Extesion);
            }, err => {
              this.toastrService.showToast('danger', getString('fileNotFound'));
            })
          );
        }
        else {
          var doc = this.documents.find(x => x.Id == item.data.file.id);
          previewFile(doc.Base64, doc.Extension, doc.Name + "." + doc.Extension);
        }
        break;
      case "delete":
        this.changes = true;

        if (this.noteId > 0) {
          this.subs.push(
            this.notesService.deleteDocumentFromNote(item.data.file.id, this.noteId).subscribe(() => {
              this.getNoteDocuments();
            })
          );
        } else {
          this.documents.splice(this.documents.findIndex(y => y.Id == item.data.file.id), 1);
        }

        break;
    }
  }
}
