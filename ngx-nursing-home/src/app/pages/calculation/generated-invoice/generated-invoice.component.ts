import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
declare var require: any;
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { environment } from '../../../../environments/environment';
import { getString } from '../../../resources/strings';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
const htmlToPdfmake = require("html-to-pdfmake");

@Component({
  selector: 'sample-generated-invoice',
  templateUrl: './generated-invoice.component.html',
  styleUrls: ['./generated-invoice.component.scss']
})
export class GeneratedInvoiceComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getBase64ImageFromUrl('../../../assets/images/logo.png')
      .then(result => {
        this.logoImg.nativeElement.src = result
      })
      .catch(err => console.error(err));
  }

  public calculation: any = {};
  public selectedPackages: any[] = [];
  public selectedServices: any[] = [];
  public selectedDiscounts: any[] = [];
  public month: string = "";
  public year: number = 0;

  public getString = getString;
  public brand = environment.brand;

  @ViewChild('logo') logoImg: ElementRef;
  @ViewChild('pdfTable') pdfTable: ElementRef;

  //PDF genrate button click function
  public createPdf(calculation: any, month: string, year: number): Promise<any> {
    this.calculation = calculation;
    this.selectedPackages = calculation.Packages;
    this.selectedServices = calculation.Services;
    this.selectedDiscounts = calculation.Discounts;
    this.month = month;
    this.year = year;

    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const doc = new jsPDF();
        //get table html
        const pdfTable = this.pdfTable.nativeElement;

        //html to pdf format
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

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
}
