import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NbDialogRef, NbMenuItem } from "@nebular/theme";
import { CalculationApiService } from "../../../services/rest/calculation-api.service";
import { ToastrService } from "../../../services/toastr.service";
import { DocumentsService } from "../../../services/rest/documents.service";
import { fileDownload, previewFile } from "shared-components";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { UploadDocumentComponent } from "../../documents/upload-document/upload-document.component";
import { AuthService, UserRole } from "../../../services/auth.service";

@Component({
    selector: "sample-calculation-documents",
    templateUrl: "./calculation-documents.component.html",
    styleUrls: ["./calculation-documents.component.scss"],
    standalone: false
})
export class CalculationDocumentsComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private _changes: boolean = false;

  public getString = getString;
  public id: number;
  public personId: number;
  public documents: any[] = [];

  constructor(
    private _ref: NbDialogRef<CalculationDocumentsComponent>,
    private _calcService: CalculationApiService,
    private _toastrService: ToastrService,
    private _documentsService: DocumentsService,
    private _dialogService: DialogService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getDocuments();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this._ref.close(this._changes ?? result);
  }

  private getDocuments(): void {
    this._subs.push(
      this._calcService.getCalculationDocuments(this.id).subscribe((data) => {
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
            notesMode: true,
            selectedType: 3,
            personId: this.personId,
          },
        })
        .onClose.subscribe((result) => {
          if (result.saved) {
            result.document.CalculationId = this.id;
            this._subs.push(
              this._calcService.saveDocument(result.document).subscribe(() => {
                this.getDocuments();
                this._changes = true;
              })
            );
          }
        })
    );
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
              (err) => {
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
              (err) => {
                this._toastrService.showToast(
                  "danger",
                  getString("fileNotFound")
                );
              }
            )
        );

        break;

      case "delete":
        this._subs.push(
          this._calcService
            .deleteDocumentFromCalculation(item.data.file.id, this.id)
            .subscribe(() => {
              this.getDocuments();
              this._changes = true;
            })
        );

        break;
    }
  }

  public checkUserHasAdminPermission(): boolean {
    return this._authService.checkUserHasRole(UserRole.ADMIN);
  }
}
