import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../resources/strings';
import { CalculationApiService } from '../../services/rest/calculation-api.service';
import { CalculationService } from '../../services/calculation.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { ServicesManagementService } from '../../services/rest/services-management.service';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';
import { getMonthNames, getYearsInRange } from '../../resources/functions';
import { DateType, DatepickerFilter, SelectFilter, SmartTableColumn, SmartTableComponent, TagType } from 'shared-components';
import { EChartsOption } from 'echarts';
import { DEFAULT_THEME, NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { StartCalculationComponent } from './start-calculation/start-calculation.component';
declare const echarts: any;
@Component({
  selector: 'sample-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private value = 0;

  public options: any;
  public summary: any;
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
    new SmartTableColumn(getString('status')).Property('StatusObj').SpecialType(new TagType()).Width('13%').SpecialFilter(new SelectFilter("Id", "StringKey")
      .ServerSource(true).ServerEndpoint(this.calculationService.apiRoute + '/getCalculationStatuses'))
      .FilterFunction((cell?: any, search?: string) => {
        if (search.length > 0) {
          return cell.id == search;
        }
      }),
    new SmartTableColumn(getString('systemPrice')).Property('SystemPrice'),
    new SmartTableColumn(getString('realPrice')).Property('RealPrice'),
    new SmartTableColumn(getString('paidPrice')).Property('PaidPrice'),
    new SmartTableColumn(getString('paidDate')).Property('DatePaid').SpecialType(new DateType().Format('dd.MM.yyyy.')).SpecialFilter(new DatepickerFilter())
  ];

  @ViewChild(SmartTableComponent) table: SmartTableComponent;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calculationService: CalculationApiService,
    private calcService: CalculationService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private servicesManagementService: ServicesManagementService,
    private theme: NbThemeService
  ) { }

  ngOnInit(): void {
    this.months = getMonthNames(this.locale);
    this.years = getYearsInRange();
    this.refreshData();
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
    this.getCalculationSummary();
  }

  private getCalculationSummary(): void {
    this.subs.push(
      this.calculationService.getCalculationSummary(this.month + 1, this.year).subscribe(data => {
        console.log(data)
        if (data.length > 0) {
          this.summary = data[0];
          this.value = Math.trunc((this.summary.CalculatedForPersons / this.summary.Persons) * 100);
          this.configureChart();
        }
      })
    );
  }

  public newCalculationClick(): void {
    this.subs.push(
      this.dialogService.open(
        StartCalculationComponent,
        {
          autoFocus: false,
          closeOnEsc: false,
          closeOnBackdropClick: false
        }
      ).onClose.subscribe(result => {
        if (result) this.refreshData();
      })
    );
  }

  public recalculateSelectedClick(): void {
    var selected = this.table.getSelectedRows().map(x => x.PersonId);
    if (selected.length > 0) {
      this.subs.push(
        this.dialogService.open(
          StartCalculationComponent,
          {
            autoFocus: false,
            closeOnBackdropClick: false,
            closeOnEsc: false,
            context: {
              personsIds: selected,
              disableInputs: true,
              recalculate: 1,
              month: this.month,
              year: this.year,
            }
          }
        ).onClose.subscribe(result => {
          if (result) this.refreshData();
        })
      );
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }

  public async markRealPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToMarkRealPrice'));
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this.subs.push(
            this.calculationService.calculationRealPriceSave({ Id: element.Id, RealPrice: element.SystemPrice.replace(',', '') }).subscribe(() => {
              if (index == selected.length - 1) {
                this.toastrService.showToast('success', getString('saveSuccess'));
                this.refreshData();
              }
            })
          );
        }
      }
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }

  public async markPaidPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToMarkPaid'));
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          if (!element.RealPrice) {
            this.subs.push(
              this.calculationService.calculationRealPriceSave({ Id: element.Id, RealPrice: element.SystemPrice.replace(',', '') }).subscribe()
            );
          }

          this.subs.push(
            this.calculationService.calculationPaid({ Id: element.Id, PaidPrice: element.RealPrice ? element.RealPrice.replace(',', '') : element.SystemPrice.replace(',', ''), PaidDate: new Date().toISOString() }).subscribe(() => {
              if (index == selected.length - 1) {
                this.toastrService.showToast('success', getString('saveSuccess'));
                this.refreshData();
              }
            })
          );
        }
      }
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }

  public async cancelCalculationClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToCancelSelected'));
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this.subs.push(
            this.calculationService.cancelCalculation({ Id: element.Id }).subscribe(() => {
              if (index == selected.length - 1) {
                this.toastrService.showToast('success', getString('saveSuccess'));
                this.refreshData();
              }
            })
          );
        }
      }
    } else this.toastrService.showToast('warning', getString('nothingSelected'));
  }

  private configureChart(): void {
    this.subs.push(
      this.theme.getJsTheme().pipe().subscribe(config => {
        this.options = Object.assign({}, {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: getString('chartCalculated'),
              clockwise: true,
              emphasis: { scale: true },
              type: 'pie',
              center: ['45%', '50%'],
              radius: ['80%', '90%'],
              data: [
                {
                  value: this.value,
                  name: getString('chartCalculated'),
                  label: {
                    position: 'center',
                    formatter: '{d}%',
                    fontSize: '22',
                    fontFamily: config.variables.fontSecondary,
                    fontWeight: '600',
                    color: config.variables.fgHeading,
                  },
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#33B9BF',
                      },
                      {
                        offset: 1,
                        color: '#33B9BF',
                      },
                    ]),
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                  },
                  emphasis: { scale: false },
                },
                {
                  value: 100 - this.value,
                  name: ' ',
                  tooltip: {
                    show: false,
                  },
                  label: {
                    position: 'inner',
                  },
                  itemStyle: {
                    color: DEFAULT_THEME.variables.bg2,
                  },
                },
              ],
            },
            {
              name: ' ',
              clockwise: true,
              emphasis: { scale: false },
              type: 'pie',
              center: ['45%', '50%'],
              radius: ['80%', '90%'],
              data: [
                {
                  value: this.value,
                  name: ' ',
                  label: {
                    position: 'inner',
                    show: false,
                  },
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#33B9BF',
                      },
                      {
                        offset: 1,
                        color: '#33B9BF',
                      },
                    ]),
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowBlur: 7,
                  },
                  emphasis: { scale: false },
                },
                {
                  value: 100 - this.value,
                  name: ' ',
                  tooltip: {
                    show: false,
                  },
                  label: {
                    position: 'inner',
                  },
                  itemStyle: {
                    color: 'none',
                  },
                },
              ],
            },
          ],
        });
      })
    );
  }
}
