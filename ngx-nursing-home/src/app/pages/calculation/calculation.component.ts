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
import { EChartsOption } from 'echarts';
import { DEFAULT_THEME, NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
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
    private servicesManagementService: ServicesManagementService,
    private theme: NbThemeService
  ) { }

  ngOnInit(): void {
    this.configureChart();
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
          console.log(this.value)
          this.options.series[0].data[0].value = this.value;
          this.options.series[0].data[1].value = 100 - this.value;
          this.options.series[1].data[0].value = this.value;
          this.options.series[1].data[1].value = 100 - this.value;
        }
      })
    );
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
              name: ' ',
              clockWise: true,
              hoverAnimation: true,
              type: 'pie',
              center: ['45%', '50%'],
              radius: ['80%', '90%'],
              data: [
                {
                  value: this.value,
                  name: getString('charCalculated'),
                  label: {
                    normal: {
                      position: 'center',
                      formatter: '{d}%',
                      textStyle: {
                        fontSize: '22',
                        fontFamily: config.variables.fontSecondary,
                        fontWeight: '600',
                        color: config.variables.fgHeading,
                      },
                    },
                  },
                  tooltip: {
                    show: true,
                    position: ['50%', '50%']
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: DEFAULT_THEME.variables.primary,
                        },
                        {
                          offset: 1,
                          color: DEFAULT_THEME.variables.primary,
                        },
                      ]),
                      shadowColor: 'rgba(0, 0, 0, 0)',
                      shadowBlur: 0,
                      shadowOffsetX: 0,
                      shadowOffsetY: 3,
                    },
                  },
                  hoverAnimation: false,
                },
                {
                  value: 100 - this.value,
                  name: ' ',
                  tooltip: {
                    show: false,
                  },
                  label: {
                    normal: {
                      position: 'inner',
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: DEFAULT_THEME.variables.bg2,
                    },
                  },
                },
              ],
            },
            {
              name: ' ',
              clockWise: true,
              hoverAnimation: false,
              type: 'pie',
              center: ['45%', '50%'],
              radius: ['80%', '90%'],
              data: [
                {
                  value: this.value,
                  name: ' ',
                  label: {
                    normal: {
                      position: 'inner',
                      show: false,
                    },
                  },
                  tooltip: {
                    show: false,
                  },
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: DEFAULT_THEME.variables.primary,
                        },
                        {
                          offset: 1,
                          color: DEFAULT_THEME.variables.primary,
                        },
                      ]),
                      shadowColor: 'rgba(0, 0, 0, 0)',
                      shadowBlur: 7,
                    },
                  },
                  hoverAnimation: false,
                },
                {
                  value: 100 - this.value,
                  name: ' ',
                  tooltip: {
                    show: false,
                  },
                  label: {
                    normal: {
                      position: 'inner',
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: 'none',
                    },
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
