import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef } from '@nebular/theme';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';
import { PersonsService } from '../../../services/rest/persons.service';
import { ServicesManagementService } from '../../../services/rest/services-management.service';
import { CalculationService, ICalculationResult } from '../../../services/calculation.service';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';

@Component({
  selector: 'sample-start-calculation',
  templateUrl: './start-calculation.component.html',
  styleUrls: ['./start-calculation.component.scss']
})
export class StartCalculationComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];
  private persons: any[] = [];
  private calculationTotalPrice: string;

  public getString = getString;
  public month: number = new Date().getMonth();
  public year: number = new Date().getFullYear();
  public months: ScheduleMonth[] = [];
  public years: number[] = [];
  public paymentDeadline: number = 3;
  public recalculate: number = 1;
  public calculationInProgress: boolean = false;
  public calculationPercent: number = 50;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private ref: NbDialogRef<StartCalculationComponent>,
    private personsService: PersonsService,
    private servicesManagementService: ServicesManagementService,
    private calculationService: CalculationService,
    private calcService: CalculationApiService
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

        for (let index = 0; index < this.persons.length; index++) {
          const element = this.persons[index];
          this.subs.push(
            this.servicesManagementService.getPackagesAndServicesForPerson(element.Id).subscribe(data => {
              element.ServicesManagement = data;
              if (index == this.persons.length - 1) this.calculatePackageAndServices();
            })
          );
        }
      })
    );
  }

  private calculatePackageAndServices(): void {
    // for each person calculate result and save calculation
    for (let index = 0; index < this.persons.length; index++) {
      const element = this.persons[index];

      if (element.ServicesManagement) {
        // calculate price foreach package
        for (let j = 0; j < element.ServicesManagement.Packages.length; j++) {
          const pack = element.ServicesManagement.Packages[j];
          var services = element.ServicesManagement.PackagesServices.filter(x => x.PackageId == pack.Id);
          var result: ICalculationResult = this.calculationService.calculatePackagePrice(pack, services, pack.MeasureUnitCode);
          pack.Services = result.services;
          pack.Price = result.price;
          pack.TotalPrice = result.priceRounded;
          pack.PriceRounded = result.priceRounded;
        }

        // calculate price foreach additional service
        for (let k = 0; k < element.ServicesManagement.Services.length; k++) {
          const service = element.ServicesManagement.Services[k];
          var result: ICalculationResult = this.calculationService.calculateServicePriceByMeasureUnit(service, element.ServicesManagement.OfferMeasureUnit[0]?.MeasureUnitCode);
          service.Price = result.price;
          service.PriceRounded = result.priceRounded;
          service.TotalPrice = result.priceRounded;
          service.PackageId = null;
        }

        var result: ICalculationResult = this.calculationService.calculateOfferPrice(element.ServicesManagement.Packages, element.ServicesManagement.Services, element.ServicesManagement.Discounts);
        element.CalculationTotalPrice = result.price;
        element.CalculationTotalPriceRounded = result.priceRounded;

        this.saveCalculation(element, index);
      }
    }
  }

  private saveCalculation(person: any, index: number) {
    var firstDay = new Date(this.year, this.month, 1);
    var lastDay = new Date(this.year, this.month + 1, 0);

    var objectToSave: any = {
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
      this.calcService.add(objectToSave).subscribe(data => {
        console.log(data);
        this.calculationPercent = ((index + 1) / this.persons.length) * 100;
        if (this.calculationPercent == 100) this.calculationInProgress = false;
        this.close(true);
      })
    );
  }

}
