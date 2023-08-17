import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../resources/strings';
import { CalculationApiService } from '../../services/rest/calculation-api.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';
import { getMonthNames, getYearsInRange, sortFloats } from '../../resources/functions';
import { ButtonsType, DateType, DatepickerFilter, SelectFilter, SmartTableColumn, SmartTableComponent, TagType } from 'shared-components';
import { DEFAULT_THEME, NbThemeService } from '@nebular/theme';
import { StartCalculationComponent } from './start-calculation/start-calculation.component';
import { CalculationSummaryComponent } from './calculation-summary/calculation-summary.component';
import { RealPriceModalComponent } from './real-price-modal/real-price-modal.component';
import { PaidCalculationModalComponent } from './paid-calculation-modal/paid-calculation-modal.component';
import { CalculationDocumentsComponent } from './calculation-documents/calculation-documents.component';
import { ExportDocSettings } from 'shared-components/lib/models/smart-table.model';
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
    new SmartTableColumn(getString('systemPrice')).Property('SystemPrice').CompareFunction(sortFloats),
    new SmartTableColumn(getString('realPrice')).Property('RealPrice').CompareFunction(sortFloats),
    new SmartTableColumn(getString('paidPrice')).Property('PaidPrice').CompareFunction(sortFloats),
    new SmartTableColumn(getString('paidDate')).Property('DatePaid').SpecialType(new DateType().Format('dd.MM.yyyy.')).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('actions')).SpecialType(new ButtonsType()).Property('Buttons').Width('17%').Sort(false).Filter(false).Export(false)
  ];
  public exportSettings: ExportDocSettings = {
    title: getString('calculationPage'),
    subtitle: getString('calculationFor') + ': ' + (this.month + 1) + '. ' + this.year,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: 'calculation',
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  @ViewChild(SmartTableComponent) table: SmartTableComponent;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calculationService: CalculationApiService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
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
        this.calculations.map(x => {
          x.StatusObj = { status: x.StatusColor, text: getString(x.StatusStringKey), id: x.StatusId };
          x.Buttons = [];

          switch (x.StatusId) {
            case 1:
              x.Buttons.push({ id: 'cancel', shape: 'round', icon: 'close-square-outline', ghost: true, status: 'warning', tooltip: getString('cancelCalculation') });
              break;
            case 2:
              x.Buttons.push(
                { id: 'realPrice', shape: 'round', icon: 'checkmark-square-2-outline', ghost: true, status: 'primary', tooltip: getString('enterRealPrice') },
                { id: 'paidPrice', shape: 'round', icon: 'checkmark-square-outline', ghost: true, status: 'primary', tooltip: getString('enterPaidPrice') },
                { id: 'cancel', shape: 'round', icon: 'close-square-outline', ghost: true, status: 'warning', tooltip: getString('cancelCalculation') }
              );
              break;
          }

          x.Buttons.push({ id: 'documents', shape: 'round', icon: 'attach-outline', ghost: true, status: 'primary', tooltip: getString('calculationDocuments'), text: x.Documents })

          return x;
        });
      })
    );
  }

  public refreshData(): void {
    this.getCalculations();
    this.getCalculationSummary();
    this.exportSettings.subtitle = getString('calculationFor') + ': ' + (this.month + 1) + '. ' + this.year;
  }

  private getCalculationSummary(): void {
    this.subs.push(
      this.calculationService.getCalculationSummary(this.month + 1, this.year).subscribe(data => {
        if (data.Summary) {
          this.summary = data.Summary;
          this.value = Math.trunc((this.summary.CalculatedForPersons / this.summary.Persons) * 100);
          this.configureChart();
        }
      })
    );
  }

  public calculationSummaryDetailsClick(): void {
    this.dialogService.open(
      CalculationSummaryComponent,
      {
        autoFocus: false,
        context: {
          month: this.month + 1,
          year: this.year
        }
      }
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

  public onButtonItemClicked(event: any): void {
    switch (event.button.id) {
      case 'realPrice':
        this.openRealPriceDialog(event.rowData);
        break;

      case 'paidPrice':
        this.openPaidPriceDialog(event.rowData);
        break;

      case 'cancel':
        this.cancelCalculation(event.rowData.Id);
        break;

      case 'documents':
        this.openDocumentsDialog(event.rowData);
        break;
    }
  }

  private openRealPriceDialog(calculation: any): void {
    this.subs.push(
      this.dialogService.open(
        RealPriceModalComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            realPrice: calculation.RealPrice ?? calculation.SystemPrice,
            id: calculation.Id
          }
        }

      ).onClose.subscribe(result => {
        if (result) this.refreshData();
      })
    );
  }

  private openPaidPriceDialog(calculation: any): void {
    this.subs.push(
      this.dialogService.open(
        PaidCalculationModalComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            realPrice: calculation.RealPrice ?? calculation.SystemPrice,
            paidPrice: calculation.RealPrice ?? calculation.SystemPrice,
            id: calculation.Id,
            personId: calculation.PersonId
          }
        }
      ).onClose.subscribe(result => {
        if (result) this.refreshData();
      })
    );
  }

  private openDocumentsDialog(calculation: any): void {
    this.subs.push(
      this.dialogService.open(
        CalculationDocumentsComponent,
        {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            id: calculation.Id,
            personId: calculation.PersonId
          }
        }
      ).onClose.subscribe(result => {
        if (result) this.refreshData();
      })
    );
  }

  private async cancelCalculation(id: number): Promise<void> {
    const rez = await this.dialogService.openYesNoDialog(getString('areYouSure'), getString('wantToCancelCalculation'));
    if (rez) {
      this.subs.push(
        this.calculationService.cancelCalculation({ Id: id }).subscribe(() => {
          this.toastrService.showToast('success', getString('saveSuccess'));
          this.refreshData();
        })
      );
    }
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
