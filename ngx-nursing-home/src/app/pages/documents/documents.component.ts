import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/rest/documents.service';
import { Subscription } from 'rxjs';
import { NbMenuItem, NbTabComponent } from '@nebular/theme';
import { getString } from '../../resources/strings';
import { fileDownload, previewFile } from 'shared-components'
import { ToastrService } from '../../services/toastr.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

@Component({
  selector: 'sample-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  @Input() personId: number = 0;

  public documentTypes: any[] = [];
  public documents: any[] = [];
  public getString = getString;
  public searchTerm: string = "";
  public currentView: string = "row";
  public currentDocumentTypeId: number = 0;

  private subs: Subscription[] = [];
  private loadedData: boolean = false;

  constructor(
    private documentsService: DocumentsService,
    private toastrService: ToastrService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getDocumentTypes(): void {
    this.subs.push(
      this.documentsService.getDocumentTypesForPerson(this.personId).subscribe(data => {
        this.documentTypes = data;
        if (!this.loadedData && this.documentTypes.length > 0) this.getDocumentsForType(this.documentTypes[0].Id);
      })
    );
  }

  public onTabChange(tab: NbTabComponent): void {
    this.getDocumentsForType(tab.tabId as any);
  }

  private getDocumentsForType(typeId: number) {
    this.subs.push(
      this.documentsService.getDocumentsForPersonByType(this.personId, typeId).subscribe(data => {
        this.documents = data;
        this.loadedData = true;
        this.currentDocumentTypeId = typeId;
      })
    );
  }

  public viewChange(event: string[]) {
    if (event.length > 0) this.currentView = event[0];
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
        const res = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToDelete'));
        if (res) {
          this.subs.push(
            this.documentsService.delete({ Id: item.data.file.id }).subscribe(() => {
              this.toastrService.showToast('success', getString('saveSuccess'));
              this.getDocumentTypes();
              this.getDocumentsForType(this.currentDocumentTypeId);
            })
          );
        }
        break;
    }
  }

  public addNewDocument(): void {
    this.dialogService.open(
      UploadDocumentComponent,
      {
        autoFocus: false,
        closeOnBackdropClick: false,
        closeOnEsc: false,
        context: {
          selectedType: this.currentDocumentTypeId,
          personId: this.personId
        }
      }
    ).onClose.subscribe((result: boolean) => {
      if (result) {
        this.getDocumentTypes();
        this.getDocumentsForType(this.currentDocumentTypeId)
      };
    })
  }

}
