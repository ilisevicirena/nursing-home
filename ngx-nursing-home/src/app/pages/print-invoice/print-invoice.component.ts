import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
declare var require: any;
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
const htmlToPdfmake = require("html-to-pdfmake");
import { getString } from '../../resources/strings';
import { environment } from '../../../environments/environment';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'sample-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit, AfterViewInit {

  constructor(
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getBase64ImageFromUrl('../../../assets/images/logo.png')
      .then(result => {
        this.logoImg.nativeElement.src = result
      })
      .catch(err => console.error(err));

    this.getBase64ImageFromUrl('../../../assets/images/marker.png')
      .then(result => {
        this.markerImg.nativeElement.src = result
      })
      .catch(err => console.error(err));

    this.getBase64ImageFromUrl('../../../assets/images/envelope.png')
      .then(result => {
        this.envelopeImg.nativeElement.src = result
      })
      .catch(err => console.error(err));

    this.getBase64ImageFromUrl('../../../assets/images/phone.png')
      .then(result => {
        this.phoneImg.nativeElement.src = result
      })
      .catch(err => console.error(err));

    this.getBase64ImageFromUrl('../../../assets/images/mobile.png')
      .then(result => {
        this.mobileImg.nativeElement.src = result
      })
      .catch(err => console.error(err));
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
  public freeSpace = '600px';
  public brand = environment.brand;

  @ViewChild('logo') logoImg: ElementRef;
  @ViewChild('marker') markerImg: ElementRef;
  @ViewChild('envelope') envelopeImg: ElementRef;
  @ViewChild('phone') phoneImg: ElementRef;
  @ViewChild('mobile') mobileImg: ElementRef;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChildren('headerTable') headerTable: QueryList<any>;
  @ViewChildren('packagesDiv') packagesDiv: QueryList<any>;
  @ViewChildren('servicesDiv') servicesDiv: QueryList<any>;

  //PDF genrate button click function
  public downloadAsPDF() {
    if (this.selectedPackages.length == 0 && this.selectedServices.length == 0) {
      this.toastrService.showToast('warning', getString('nothingToPrint'));
    } else {
      this.freeSpace = this.calculateHeight();
      this.offerMeasureUnitName = this.measureUnits.find(x => x.Code == this.selectedMeasureUnit)?.Name;
      if (this.offerMeasureUnitName) this.offerMeasureUnitName = this.offerMeasureUnitName.toLowerCase();

      setTimeout(() => {
        const doc = new jsPDF();
        //get table html
        const pdfTable = this.pdfTable.nativeElement;

        //html to pdf format
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
    var headerHeight = this.headerTable ? this.headerTable?.first.nativeElement.offsetHeight : 0;
    var packagesHeight = this.packagesDiv ? this.packagesDiv?.first.nativeElement.offsetHeight : 0;
    var servicesHeight = this.servicesDiv ? this.servicesDiv?.first.nativeElement.offsetHeight : 0
    var height = allHeight - headerHeight - packagesHeight - servicesHeight;
    return height + 'px';
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
