import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { getString } from '../../resources/strings';
import { settings } from 'cluster';

@Component({
  selector: 'sample-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() selectedPackages: any[] = [];
  @Input() selectedServices: any[] = [];
  @Input() selectedDiscounts: any[] = [];
  @Input() offerPrice: string = "0.00";

  public getString = getString;
  public offerDate = new Date();
  public freeSpace = '600px';

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChildren('headerTable') headerTable: QueryList<any>;
  @ViewChildren('packagesDiv') packagesDiv: QueryList<any>;
  @ViewChildren('servicesDiv') servicesDiv: QueryList<any>;

  //PDF genrate button click function
  public downloadAsPDF() {
    this.freeSpace = this.calculateHeight();

    setTimeout(() => {
      const doc = new jsPDF();
      //get table html
      const pdfTable = this.pdfTable.nativeElement;

      //html to pdf format
      var html = htmlToPdfmake(pdfTable.innerHTML, {
        "tableAutoSize": true
      });

      const documentDefinition = { content: html, pageMargins: [0, 0, 0, 0] };

      pdfMake.createPdf(documentDefinition).open();
    }, 500);

  }

  public calculateHeight(): string {
    var allHeight = 650;
    var headerHeight = this.headerTable ? this.headerTable?.first.nativeElement.offsetHeight : 0;
    var packagesHeight = this.packagesDiv ? this.packagesDiv?.first.nativeElement.offsetHeight : 0;
    var servicesHeight = this.servicesDiv ? this.servicesDiv?.first.nativeElement.offsetHeight : 0
    var height = allHeight - headerHeight - packagesHeight - servicesHeight;
    return height + 'px';
  }
}
