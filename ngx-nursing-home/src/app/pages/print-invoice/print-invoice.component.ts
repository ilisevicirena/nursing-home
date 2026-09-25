import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
declare var require: any;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = (pdfFonts as any).vfs || pdfFonts;
const htmlToPdfmake = require("html-to-pdfmake");
import { getString } from "../../resources/strings";
import { environment } from "../../../environments/environment";
import { ToastrService } from "../../services/toastr.service";
import { getBase64ImageFromUrl } from "../../resources/functions";

@Component({
  selector: "sample-print-invoice",
  templateUrl: "./print-invoice.component.html",
  styleUrls: ["./print-invoice.component.scss"],
})
export class PrintInvoiceComponent implements OnInit, AfterViewInit {
  constructor(private _toastrService: ToastrService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    getBase64ImageFromUrl("../../../assets/images/logo.png")
      .then((result) => {
        this.logoImg.nativeElement.src = result;
      })
      .catch((err) => console.error(err));

    getBase64ImageFromUrl("../../../assets/images/marker.png")
      .then((result) => {
        this.markerImg.nativeElement.src = result;
      })
      .catch((err) => console.error(err));

    getBase64ImageFromUrl("../../../assets/images/envelope.png")
      .then((result) => {
        this.envelopeImg.nativeElement.src = result;
      })
      .catch((err) => console.error(err));

    getBase64ImageFromUrl("../../../assets/images/phone.png")
      .then((result) => {
        this.phoneImg.nativeElement.src = result;
      })
      .catch((err) => console.error(err));

    getBase64ImageFromUrl("../../../assets/images/mobile.png")
      .then((result) => {
        this.mobileImg.nativeElement.src = result;
      })
      .catch((err) => console.error(err));
  }

  @Input() selectedPackages: any[] = [];
  @Input() selectedServices: any[] = [];
  @Input() selectedDiscounts: any[] = [];
  @Input() offerPrice: string = "0.00";
  @Input() measureUnits: any[] = [];
  @Input() selectedMeasureUnit: string = "";

  public offerMeasureUnitName: string = "";
  public getString = getString;
  public offerDate = new Date();
  public freeSpace = "600px";
  public brand = environment.brand;

  @ViewChild("logo") logoImg: ElementRef;
  @ViewChild("marker") markerImg: ElementRef;
  @ViewChild("envelope") envelopeImg: ElementRef;
  @ViewChild("phone") phoneImg: ElementRef;
  @ViewChild("mobile") mobileImg: ElementRef;
  @ViewChild("pdfTable") pdfTable: ElementRef;

  @ViewChildren("headerTable") headerTable: QueryList<any>;
  @ViewChildren("packagesDiv") packagesDiv: QueryList<any>;
  @ViewChildren("servicesDiv") servicesDiv: QueryList<any>;

  //PDF genrate button click function
  public downloadAsPDF(): void {
    if (this.selectedPackages.length == 0 && this.selectedServices.length == 0)
      this._toastrService.showToast("warning", getString("nothingToPrint"));
    else {
      this.freeSpace = this.calculateHeight();
      this.offerMeasureUnitName = this.measureUnits.find(
        (x) => x.Code == this.selectedMeasureUnit
      )?.Name;
      if (this.offerMeasureUnitName)
        this.offerMeasureUnitName = this.offerMeasureUnitName.toLowerCase();

      setTimeout(() => {
        const pdfTable = this.pdfTable.nativeElement;
        var html = htmlToPdfmake(pdfTable.innerHTML, {
          tableAutoSize: true,
        });
        const documentDefinition = { content: html, pageMargins: [0, 0, 0, 0] };
        pdfMake.createPdf(documentDefinition as any).open();
      }, 500);
    }
  }

  public calculateHeight(): string {
    var allHeight = 650;
    var headerHeight = this.headerTable
      ? this.headerTable?.first.nativeElement.offsetHeight
      : 0;
    var packagesHeight = this.packagesDiv
      ? this.packagesDiv?.first.nativeElement.offsetHeight
      : 0;
    var servicesHeight = this.servicesDiv
      ? this.servicesDiv?.first.nativeElement.offsetHeight
      : 0;
    var height = allHeight - headerHeight - packagesHeight - servicesHeight;

    return height + "px";
  }
}
