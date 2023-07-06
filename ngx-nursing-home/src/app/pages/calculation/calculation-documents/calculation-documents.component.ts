import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef, NbMenuItem } from '@nebular/theme';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { ToastrService } from '../../../services/toastr.service';
import { DocumentsService } from '../../../services/rest/documents.service';
import { fileDownload, previewFile } from 'shared-components';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { UploadDocumentComponent } from '../../documents/upload-document/upload-document.component';

@Component({
  selector: 'sample-calculation-documents',
  templateUrl: './calculation-documents.component.html',
  styleUrls: ['./calculation-documents.component.scss']
})
export class CalculationDocumentsComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public id: number;
  public personId: number;
  public documents: any[] = [];

  private changes: boolean = false;

  constructor(
    private ref: NbDialogRef<CalculationDocumentsComponent>,
    private calcService: CalculationApiService,
    private toastrService: ToastrService,
    private documentsService: DocumentsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(this.changes ?? result);
  }

  private getDocuments(): void {
    this.subs.push(
      this.calcService.getCalculationDocuments(this.id).subscribe(data => {
        this.documents = data;
      })
    );
  }

  public openUploadDocumentDialog() {
    this.subs.push(
      this.dialogService.open(
        UploadDocumentComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            notesMode: true,
            selectedType: 3,
            personId: this.personId
          }
        }
      ).onClose.subscribe(result => {
        if (result.saved) {
          result.document.CalculationId = this.id;
          this.subs.push(
            this.calcService.saveDocument(result.document).subscribe(() => {
              this.getDocuments();
              this.changes = true;
            })
          );
        }
      })
    );
  }

  public async onFileMenuItemClick(item: NbMenuItem): Promise<any> {
    switch (item.data.code) {
      case "download":
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

        break;

      case "preview":
        this.subs.push(
          this.documentsService.getDocumentContent(item.data.file.id).subscribe(data => {
            if (data) previewFile(data.content, data.document.Extension, data.document.Name + "." + data.document.Extesion);
          }, err => {
            this.toastrService.showToast('danger', getString('fileNotFound'));
          })
        );

        break;

      case "delete":
        this.subs.push(
          this.calcService.deleteDocumentFromCalculation(item.data.file.id, this.id).subscribe(() => {
            this.getDocuments();
            this.changes = true;
          })
        );

        break;
    }
  }

}
