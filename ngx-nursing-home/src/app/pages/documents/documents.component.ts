import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DocumentsService } from "../../services/rest/documents.service";
import { Subscription } from "rxjs";
import { NbMenuItem, NbTabComponent } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { fileDownload, previewFile } from "shared-components";
import { ToastrService } from "../../services/toastr.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { UploadDocumentComponent } from "./upload-document/upload-document.component";
import { AuthService, UserRole } from "../../services/auth.service";

@Component({
  selector: "sample-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  @Input() personId: number = 0;

  public documentTypes: any[] = [];
  public documents: any[] = [];
  public getString = getString;
  public searchTerm: string = "";
  public currentView: string = "row";
  public currentDocumentTypeId: number = 0;

  private _subs: Subscription[] = [];
  private _loadedData: boolean = false;

  constructor(
    private _documentsService: DocumentsService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getDocumentTypes(): void {
    this._subs.push(
      this._documentsService
        .getDocumentTypesForPerson(this.personId)
        .subscribe((data) => {
          this.documentTypes = data;
          if (!this._loadedData && this.documentTypes.length > 0)
            this.getDocumentsForType(this.documentTypes[0].Id);
        })
    );
  }

  public onTabChange(tab: NbTabComponent): void {
    this.getDocumentsForType(tab.tabId as any);
  }

  private getDocumentsForType(typeId: number): void {
    this._subs.push(
      this._documentsService
        .getDocumentsForPersonByType(this.personId, typeId)
        .subscribe((data) => {
          this.documents = data;
          this._loadedData = true;
          this.currentDocumentTypeId = typeId;
        })
    );
  }

  public viewChange(event: string[]): void {
    if (event.length > 0) this.currentView = event[0];
  }

  public async onFileMenuItemClick(item: NbMenuItem): Promise<any> {
    switch (item.data.code) {
      case "download":
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
              () => {
                this._toastrService.showToast(
                  "danger",
                  getString("fileNotFound")
                );
              }
            )
        );
        break;

      case "preview":
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
              () => {
                this._toastrService.showToast(
                  "danger",
                  getString("fileNotFound")
                );
              }
            )
        );
        break;

      case "delete":
        const res = await this._dialogService.openYesNoDialog(
          getString("areYouSure"),
          getString("wantToDelete")
        );
        if (res) {
          this._subs.push(
            this._documentsService
              .delete({ Id: item.data.file.id })
              .subscribe(() => {
                this._toastrService.showToast(
                  "success",
                  getString("saveSuccess")
                );
                this.getDocumentTypes();
                this.getDocumentsForType(this.currentDocumentTypeId);
              })
          );
        }
        break;
    }
  }

  public addNewDocument(): void {
    this._dialogService
      .open(UploadDocumentComponent, {
        autoFocus: false,
        closeOnBackdropClick: false,
        closeOnEsc: false,
        context: {
          selectedType: this.currentDocumentTypeId,
          personId: this.personId,
        },
      })
      .onClose.subscribe((result: boolean) => {
        if (result) {
          this.getDocumentTypes();
          this.getDocumentsForType(this.currentDocumentTypeId);
        }
      });
  }

  public checkUserHasAdminPermission(): boolean {
    return this._authService.checkUserHasRole(UserRole.ADMIN);
  }
}
