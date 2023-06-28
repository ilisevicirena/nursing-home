import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef } from '@nebular/theme';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';
import { PersonsService } from '../../../services/rest/persons.service';
import { ServicesManagementService } from '../../../services/rest/services-management.service';
import { CalculationService, ICalculationResult } from '../../../services/calculation.service';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { GeneratedInvoiceComponent } from '../generated-invoice/generated-invoice.component';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'sample-start-calculation',
  templateUrl: './start-calculation.component.html',
  styleUrls: ['./start-calculation.component.scss']
})
export class StartCalculationComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  private persons: any[] = [];
  private personIndex: number = 0;

  public getString = getString;
  public month: number = new Date().getMonth();
  public year: number = new Date().getFullYear();
  public months: ScheduleMonth[] = [];
  public years: number[] = [];
  public paymentDeadline: number = 3;
  public recalculate: number = 1;
  public calculationInProgress: boolean = false;
  public calculationPercent: number = 0;

  @ViewChild(GeneratedInvoiceComponent) invoice: GeneratedInvoiceComponent;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private ref: NbDialogRef<StartCalculationComponent>,
    private personsService: PersonsService,
    private servicesManagementService: ServicesManagementService,
    private calculationService: CalculationService,
    private calcService: CalculationApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.months = this.getMonthNames(this.locale);
    this.years = this.getYearsInRange();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  private getMonthNames(locale: string): ScheduleMonth[] {
    var baseDate = new Date(Date.UTC(this.year, 0, 1));
    var months: ScheduleMonth[] = [];

    for (var i = 0; i < 12; i++) {
      months.push({ name: baseDate.toLocaleDateString(locale, { month: 'long' }), key: baseDate.getMonth(), shortName: baseDate.toLocaleDateString(locale, { month: 'short' }) });
      baseDate.setMonth(baseDate.getMonth() + 1);
    }

    return months;
  }

  private getYearsInRange(): number[] {
    var arr: number[] = [];
    var startYear = new Date().getFullYear() - 50;
    var endYear = new Date().getFullYear() + 50;
    for (let index = startYear; index <= endYear; index++) {
      arr.push(index);
    }

    return arr;
  }

  public startCalculation() {
    this.calculationInProgress = true;
    // get active persons first
    this.subs.push(
      this.personsService.getData(true).subscribe(data => {
        this.persons = data;
        this.personIndex = 0;
        this.startPersonCalculation(this.personIndex);
      })
    );
  }

  private startPersonCalculation(personIndex: number): void {
    const person = this.persons[personIndex];
    this.subs.push(
      // get packages and services for person
      this.servicesManagementService.getPackagesAndServicesForPerson(person.Id).subscribe(data => {
        person.ServicesManagement = data;
        // calculate packages and services prices

        // calculate price foreach package
        person.ServicesManagement.Packages.forEach(pack => {
          var services = person.ServicesManagement.PackagesServices.filter(x => x.PackageId == pack.Id);
          var result: ICalculationResult = this.calculationService.calculatePackagePrice(pack, services, pack.MeasureUnitCode);
          pack.Services = result.services;
          pack.Price = result.price;
          pack.TotalPrice = result.priceRounded;
          pack.PriceRounded = result.priceRounded;
        });

        // calculate price foreach additional service
        person.ServicesManagement.Services.forEach(service => {
          var result: ICalculationResult = this.calculationService.calculateServicePriceByMeasureUnit(service, person.ServicesManagement.OfferMeasureUnit[0]?.MeasureUnitCode);
          service.Price = result.price;
          service.PriceRounded = result.priceRounded;
          service.TotalPrice = result.priceRounded;
          service.PackageId = null;
        });

        // calculate offer price
        var result: ICalculationResult = this.calculationService.calculateOfferPrice(person.ServicesManagement.Packages, person.ServicesManagement.Services, person.ServicesManagement.Discounts);
        person.CalculationTotalPrice = result.price;
        person.CalculationTotalPriceRounded = result.priceRounded;

        this.saveCalculation(person, personIndex);
      })
    );
  }

  private saveCalculation(person: any, index: number) {
    var firstDay = new Date(this.year, this.month, 1);
    var lastDay = new Date(this.year, this.month + 1, 0);

    var objectToSave: any = {
      CalculationDate: new Date(),
      PersonFirstName: person.FirstName,
      PersonLastName: person.LastName,
      PersonJMBG: person.JMBG,
      Month: this.month + 1,
      Year: this.year,
      PersonId: person.Id,
      SystemPrice: person.CalculationTotalPriceRounded,
      DateFrom: firstDay.toISOString(),
      DateTo: lastDay.toISOString(),
      PaymentDaysDeadline: this.paymentDeadline,
      PriceUnitId: 2, //needs fixing
      MeasureUnitId: person.ServicesManagement.OfferMeasureUnit[0]?.MeasureUnitId,
      Packages: person.ServicesManagement.Packages,
      Services: person.ServicesManagement.Services,
      Discounts: person.ServicesManagement.Discounts
    }

    this.subs.push(
      // save calculation
      this.calcService.add(objectToSave).subscribe(data => {
        person.CalculationId = data.CalculationId;
        var monthName = this.months.find(x => x.key == this.month).name;
        // create invoice and save it
        this.invoice.createPdf(objectToSave, monthName, this.year).then(data => {
          var documentModel = {
            Id: 0,
            PersonId: person.Id,
            Name: person.JMBG + '-' + monthName,
            Extension: 'pdf',
            FileType: 'data:application/pdf;base64',
            CalculationId: person.CalculationId,
            Base64: data
          };

          this.subs.push(
            this.calcService.saveDocument(documentModel).subscribe(() => {

              // continue to next person
              this.calculationPercent = ((index + 1) / this.persons.length) * 100;
              this.personIndex++;

              if (this.personIndex > this.persons.length - 1) {
                this.toastrService.showToast('success', getString('calculationSuccess'));
                this.calculationInProgress = false;
                this.close(true);
              } else this.startPersonCalculation(this.personIndex);
            })
          );
        })
      })
    );


  }

}
