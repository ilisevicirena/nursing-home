import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
declare var require: any;
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ToastrService } from "../../../services/toastr.service";
import { getString } from "../../../resources/strings";
import { fileDownload } from "shared-components";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
const htmlToPdfmake = require("html-to-pdfmake");

@Component({
  selector: "sample-note-export",
  templateUrl: "./note-export.component.html",
  styleUrls: ["./note-export.component.scss"],
})
export class NoteExportComponent implements OnInit, OnDestroy {
  public notes: any[] = [];
  public getString = getString;

  @ViewChild("pdfTable") pdfTable: ElementRef;

  constructor(private _toastrService: ToastrService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  //PDF genrate button click function
  public downloadAsPDF(notes: any[]): void {
    if (notes.length == 0)
      this._toastrService.showToast("warning", getString("nothingToPrint"));
    else {
      this._toastrService.showToastWithCustumIcon(
        "info",
        getString("downloadStartSoon"),
        "",
        "download-outline"
      );
      this.notes = notes;

      setTimeout(() => {
        const pdfTable = this.pdfTable.nativeElement;
        var html = htmlToPdfmake(pdfTable.innerHTML, {
          tableAutoSize: true,
        });

        const documentDefinition = {
          content: html,
          pageMargins: [10, 10, 10, 10],
        };
        const document = pdfMake.createPdf(documentDefinition as any);

        document.getBase64((data) => {
          fileDownload(data, "notes-export.pdf");
        });
      }, 500);
    }
  }
}
