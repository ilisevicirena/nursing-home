import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
declare var require: any;
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { environment } from "../../../../environments/environment";
import { getString } from "../../../resources/strings";
import { getBase64ImageFromUrl } from "../../../resources/functions";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
const htmlToPdfmake = require("html-to-pdfmake");

@Component({
  selector: "sample-generated-invoice",
  templateUrl: "./generated-invoice.component.html",
  styleUrls: ["./generated-invoice.component.scss"],
})
export class GeneratedInvoiceComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    getBase64ImageFromUrl("../../../assets/images/logo.png")
      .then((result) => {
        this.logoImg.nativeElement.src = result;
      })
      .catch((err) => console.error(err));
  }

  public calculation: any = {};
  public selectedPackages: any[] = [];
  public selectedServices: any[] = [];
  public selectedDiscounts: any[] = [];
  public month: string = "";
  public year: number = 0;
  public getString = getString;
  public brand = environment.brand;

  @ViewChild("logo") logoImg: ElementRef;
  @ViewChild("pdfTable") pdfTable: ElementRef;

  //PDF genrate function
  public createPdf(
    calculation: any,
    month: string,
    year: number
  ): Promise<any> {
    this.calculation = calculation;
    this.selectedPackages = calculation.Packages;
    this.selectedServices = calculation.Services;
    this.selectedDiscounts = calculation.Discounts;
    this.month = month;
    this.year = year;

    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const pdfTable = this.pdfTable.nativeElement;
        var html = htmlToPdfmake(pdfTable.innerHTML, {
          tableAutoSize: true,
        });

        const documentDefinition = { content: html, pageMargins: [0, 0, 0, 0] };
        const document = pdfMake.createPdf(documentDefinition as any);

        document.getBase64((data) => {
          resolve(data);
        });
      }, 500);
    });

    return promise;
  }
}
