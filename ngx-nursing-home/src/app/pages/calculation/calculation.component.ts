import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../resources/strings';
import { CalculationApiService } from '../../services/rest/calculation-api.service';
import { CalculationService } from '../../services/calculation.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { ServicesManagementService } from '../../services/rest/services-management.service';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';

@Component({
  selector: 'sample-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public month: number = new Date().getMonth();
  public year: number = new Date().getFullYear();
  public calculations: any[] = [];
  public months: ScheduleMonth[] = [];
  public years: number[] = [];
  public calculation: any;
  public calculationMonth: string = 'lipanj';
  public calculationYear: string = '2023';
  public documentPackages: any[] = [{
    PersonId: 14,
    FirstName: 'Irena',
    LastName: 'Ilisevic',
    Jmbg: '0407997187973',
    RowId: 7,
    Id: 8,
    Name: 'Paket s jako dugačkim nazivom je ovo najdužim nazi',
    Description: 'nn',
    Quantity: 1,
    DefaultPackagePrice: null,
    PackagePriceCalculated: true,
    DefaultPackagePriceUnitId: 2,
    DefaultPackagePriceUnitName: 'konvertibilna marka',
    DefaultPackagePriceUnitTag: 'KM',
    StartDate: '2023-06-26T08:34:48.630Z',
    MeasureUnitId: 2,
    MeasureUnitName: 'Mjesec',
    MeasureUnitTag: 'mjesec',
    MeasureUnitCode: 'month',
    Services: [
      {
        PackageId: 8,
        PackageName: 'Paket s jako dugačkim nazivom je ovo najdužim nazi',
        ServiceId: 8,
        ServiceName: 'Dnevna prehrana (doručak, ručak, večera)',
        ServiceDescription: 'Dnevna količina prehrane, uključuje doručak, ručak i večeru.',
        MeasureUnitId: 1,
        MeasureUnitName: 'Dan',
        MeasureUnitTag: 'dan',
        MeasureUnitCode: 'day',
        CostPerUnit: '10.01',
        DefaultNumberOfUnits: 3,
        PriceUnitId: 2,
        PriceUnitName: 'konvertibilna marka',
        PriceUnitTag: 'KM',
        Quantity: 3,
        Price: 900.9000000000001,
        PriceRounded: '900.90'
      },
      {
        PackageId: 8,
        PackageName: 'Paket s jako dugačkim nazivom je ovo najdužim nazi',
        ServiceId: 10,
        ServiceName: 'Nabava lijekova',
        ServiceDescription: 'Odlazak i nabava lijekova propisanih od strane liječnika. Obuhvaća samo nabavu i dostavu (troškove lijekova snosi korisnik doma).',
        MeasureUnitId: 2,
        MeasureUnitName: 'Mjesec',
        MeasureUnitTag: 'mjesec',
        MeasureUnitCode: 'month',
        CostPerUnit: '20.00',
        DefaultNumberOfUnits: null,
        PriceUnitId: 2,
        PriceUnitName: 'konvertibilna marka',
        PriceUnitTag: 'KM',
        Quantity: 1,
        Price: 20,
        PriceRounded: '20.00'
      },
      {
        PackageId: 8,
        PackageName: 'Paket s jako dugačkim nazivom je ovo najdužim nazi',
        ServiceId: 19,
        ServiceName: 'Nova usluga',
        ServiceDescription: 'decimalni broj',
        MeasureUnitId: 4,
        MeasureUnitName: 'Komad',
        MeasureUnitTag: 'komad',
        MeasureUnitCode: 'unit',
        CostPerUnit: '1.52',
        DefaultNumberOfUnits: null,
        PriceUnitId: 2,
        PriceUnitName: 'konvertibilna marka',
        PriceUnitTag: 'KM',
        Quantity: 1,
        Price: 1.52,
        PriceRounded: '1.52'
      }
    ],
    Price: 922.4200000000001,
    TotalPrice: '922.42',
    PriceRounded: '922.42'
  }];
  public documentServices: any[] = [
    {
      RowId: 9,
      Id: 9,
      Name: 'Pranje rublja',
      Description: 'Jedinično pranje rublja. Obuhvaća pranje rublja na zahtjev.',
      MeasureUnitId: 4,
      MeasureUnitName: 'Komad',
      MeasureUnitTag: 'komad',
      MeasureUnitCode: 'unit',
      CostPerUnit: '5.00',
      DefaultNumberOfUnits: null,
      PriceUnitId: 2,
      PriceUnitName: 'konvertibilna marka',
      PriceUnitTag: 'KM',
      Quantity: 1,
      Price: 5,
      PriceRounded: '5.00',
      PackageId: null
    }
  ];
  public selectedDiscounts: any[] = [];
  public price: any;
  public measureUnits: any = [];
  public selectedMeasureUnit: any;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calculationService: CalculationApiService,
    private calcService: CalculationService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private servicesManagementService: ServicesManagementService
  ) { }

  ngOnInit(): void {
    this.months = this.getMonthNames(this.locale);
    this.years = this.getYearsInRange();
    this.getCalculations();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getCalculations(): void {
    this.subs.push(
      this.calculationService.getCalculations(this.month + 1, this.year).subscribe(data => {
        this.calculations = data;
        this.calculation = data[0];
        console.log(this.calculations);
      })
    );
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
}
