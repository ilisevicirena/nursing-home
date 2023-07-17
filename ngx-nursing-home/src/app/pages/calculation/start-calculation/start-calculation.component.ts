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
import { getMonthNames, getYearsInRange } from '../../../resources/functions';

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
  public personsIds: number[] = [];
  public disableInputs: boolean = false;
  public profileMode: boolean = false;

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
    this.months = getMonthNames(this.locale);
    this.years = getYearsInRange();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public startCalculation() {
    this.calculationInProgress = true;
    // get active persons first
    this.subs.push(
      this.personsService.getData(true).subscribe(data => {
        if (this.personsIds.length > 0) this.persons = data.filter(x => this.personsIds.includes(x.Id));
        else this.persons = data;
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

        // if person doesn't have saved packages or services skip it
        if (data.Packages.length > 0 || data.Services.length > 0) {
          person.ServicesManagement = data;

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
        }
        else this.countinueToNextPerson(personIndex);
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

    // check calculation exists
    this.subs.push(
      this.calcService.checkCalculationExists({ PersonId: person.Id, Month: this.month + 1, Year: this.year, Delete: this.recalculate == 1 }).subscribe((data) => {
        if (this.recalculate == 1)
          this.saveCalculationToDb(objectToSave, person, index);
        else {
          if (data.result > 0) this.countinueToNextPerson(index);
          else this.saveCalculationToDb(objectToSave, person, index);
        }
      })
    );
  }

  private saveCalculationToDb(objectToSave, person, index): void {
    this.subs.push(
      // save calculation
      this.calcService.add(objectToSave).subscribe(data => {
        person.CalculationId = data.CalculationId;
        var monthName = this.months.find(x => x.key == this.month).name;

        // create invoice pdf and save it
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
              this.countinueToNextPerson(index);
            })
          );
        })
      })
    );
  }


  private countinueToNextPerson(index: number): void {
    // continue to next person
    this.calculationPercent = Math.trunc(((index + 1) / this.persons.length) * 100);
    this.personIndex++;

    if (this.personIndex > this.persons.length - 1) {
      this.toastrService.showToast('success', getString('calculationSuccess'));
      this.calculationInProgress = false;
      this.close(true);
    } else this.startPersonCalculation(this.personIndex);
  }
}