import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import {
  DocumentsService,
  IDocument,
} from "../../../services/rest/documents.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-upload-document",
  templateUrl: "./upload-document.component.html",
  styleUrls: ["./upload-document.component.scss"],
})
export class UploadDocumentComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public documentTypes: any[] = [];
  public getString = getString;
  public notesMode: boolean = false;
  public currentDate: Date = new Date();
  public selectedType: number;
  public personId: number;
  public documentData: IDocument = {
    Id: 0,
    Name: undefined,
    Extension: undefined,
    FileType: undefined,
    Base64: undefined,
  };

  constructor(
    private _ref: NbDialogRef<UploadDocumentComponent>,
    private _documentsService: DocumentsService,
    private _toastrService: ToastrService
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
      this._documentsService.getDocumentTypes().subscribe((data) => {
        this.documentTypes = data;
      })
    );
  }

  public close(result: any): void {
    this._ref.close(result);
  }

  public onFileUploaded(files: File[]): void {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        var base64 = reader.result.toString().split(",");
        this.documentData.Base64 = base64[1];
        this.documentData.Name = files[0].name.split(".")[0];
        this.documentData.FileType = base64[0];
        this.documentData.Extension = files[0].name.split(".")[1];
      };
    } else {
      this.documentData.Name = undefined;
      this.documentData.Base64 = undefined;
      this.documentData.FileType = undefined;
      this.documentData.Extension = undefined;
    }
  }

  public onSaveClick(): void {
    this.documentData.PersonId = this.personId;
    this.documentData.DocumentTypeId = this.selectedType;

    if (!this.notesMode) {
      this._subs.push(
        this._documentsService.add(this.documentData).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.close(true);
        })
      );
    } else this.close({ saved: true, document: this.documentData });
  }
}
