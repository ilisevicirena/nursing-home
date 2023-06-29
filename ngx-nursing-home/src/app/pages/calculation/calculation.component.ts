import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../resources/strings';
import { CalculationApiService } from '../../services/rest/calculation-api.service';
import { CalculationService } from '../../services/calculation.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { ServicesManagementService } from '../../services/rest/services-management.service';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';
import { getMonthNames, getYearsInRange } from '../../resources/functions';
import { DateType, DatepickerFilter, SelectFilter, SmartTableColumn, TagType } from 'shared-components';

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
  public columns: SmartTableColumn[] = [
    new SmartTableColumn(getString('firstName')).Property('PersonFirstName'),
    new SmartTableColumn(getString('lastName')).Property('PersonLastName'),
    new SmartTableColumn(getString('jmbg')).Property('PersonJMBG'),
    new SmartTableColumn(getString('calculationDate')).Property('CalculationDate').SpecialType(new DateType().Format('dd.MM.yyyy. HH:mm')).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('status')).Property('StatusObj').SpecialType(new TagType()).SpecialFilter(new SelectFilter("Id", "StringKey")
      .ServerSource(true).ServerEndpoint(this.calculationService.apiRoute + '/getCalculationStatuses'))
      .FilterFunction((cell?: any, search?: string) => {
        if (search.length > 0) {
          return cell.id == search;
        }
      }),
    new SmartTableColumn(getString('systemPrice')).Property('SystemPrice'),
    new SmartTableColumn(getString('realPrice')).Property('RealPrice'),
    new SmartTableColumn(getString('paidPrice')).Property('PaidPrice'),
    new SmartTableColumn(getString('paidDate')).Property('DatePaod').SpecialType(new DateType().Format('dd.MM.yyyy.')).SpecialFilter(new DatepickerFilter())
  ];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calculationService: CalculationApiService,
    private calcService: CalculationService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private servicesManagementService: ServicesManagementService
  ) { }

  ngOnInit(): void {
    this.months = getMonthNames(this.locale);
    this.years = getYearsInRange();
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
        this.calculations.map(x => x.StatusObj = { status: x.StatusColor, text: getString(x.StatusStringKey), id: x.StatusId });
      })
    );
  }

  public refreshData(): void {
    this.getCalculations();
  }
}
