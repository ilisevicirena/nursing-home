import {
  Component,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { CalculationApiService } from "../../services/rest/calculation-api.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { ScheduleMonth } from "shared-components/lib/models/schedule.model";
import { getMonthNames, getYearsInRange } from "../../resources/functions";
import {
  GRID_BUTTON_TYPE,
  GridButtonType,
  GridButtonsColumn,
  GridColumn,
  GridComponent,
  GridDateColumn,
  GridDateboxFilter,
  GridSelectFilter,
  GridTagColumn,
  IGridCellButton,
  IGridExportDocumentSettings,
} from "shared-components";
import { DEFAULT_THEME, NbThemeService } from "@nebular/theme";
import { StartCalculationComponent } from "./start-calculation/start-calculation.component";
import { CalculationSummaryComponent } from "./calculation-summary/calculation-summary.component";
import { RealPriceModalComponent } from "./real-price-modal/real-price-modal.component";
import { PaidCalculationModalComponent } from "./paid-calculation-modal/paid-calculation-modal.component";
import { CalculationDocumentsComponent } from "./calculation-documents/calculation-documents.component";

declare const echarts: any;
@Component({
  selector: "sample-calculation",
  templateUrl: "./calculation.component.html",
  styleUrls: ["./calculation.component.scss"],
})
export class CalculationComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private _value = 0;

  public options: any;
  public summary: any;
  public getString = getString;
  public month: number = new Date().getMonth();
  public year: number = new Date().getFullYear();
  public calculations: any[] = [];
  public months: ScheduleMonth[] = [];
  public years: number[] = [];
  public columns: GridColumn[] = [
    new GridColumn().Title(getString("firstName")).DataField("PersonFirstName"),
    new GridColumn().Title(getString("lastName")).DataField("PersonLastName"),
    new GridColumn().Title(getString("jmbg")).DataField("PersonJMBG"),
    new GridColumn()
      .Title(getString("calculationDate"))
      .DataField("CalculationDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy"))
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("status"))
      .DataField("StatusId")
      .Width("136px")
      .Type(
        new GridTagColumn()
          .ColorColumn("StatusColor")
          .LookupColumn("StatusName")
      )
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("Name")
          .ServerDataSource(true)
          .ServerEndpoint(
            this._calculationService.apiRoute + "/getCalculationStatuses"
          )
      ),
    new GridColumn()
      .Title(getString("systemPrice"))
      .DataField("SystemPrice")
      .Width("110px"),
    new GridColumn()
      .Title(getString("realPrice"))
      .DataField("RealPrice")
      .Width("110px"),
    new GridColumn()
      .Title(getString("paidPrice"))
      .DataField("PaidPrice")
      .Width("110px"),
    new GridColumn()
      .Title(getString("paidDate"))
      .DataField("DatePaid")
      .Type(new GridDateColumn().Format("dd.MM.yyyy."))
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("actions"))
      .Type(new GridButtonsColumn().ButtonsFromDataField("Buttons"))
      .DataField("Buttons")
      .Sortable(false)
      .Filter(false)
      .Export(false),
  ];
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("calculationPage"),
    subtitle:
      getString("calculationFor") + ": " + (this.month + 1) + ". " + this.year,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "calculation",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  @ViewChild(GridComponent) table: GridComponent;

  constructor(
    @Inject(LOCALE_ID) private _locale: string,
    private _calculationService: CalculationApiService,
    private _dialogService: DialogService,
    private _toastrService: ToastrService,
    private _theme: NbThemeService
  ) {}

  ngOnInit(): void {
    this.months = getMonthNames(this._locale);
    this.years = getYearsInRange();
    this.refreshData();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getCalculations(): void {
    this._subs.push(
      this._calculationService
        .getCalculations(this.month + 1, this.year)
        .subscribe((data) => {
          this.calculations = data;
          this.calculations.map((x) => {
            x.Buttons = [];

            switch (x.StatusId) {
              case 1:
                x.Buttons.push(
                  new GridButtonType()
                    .Type(GRID_BUTTON_TYPE.OTHER)
                    .Id("cancel")
                    .Ghost(true)
                    .Shape("round")
                    .Icon("close-square-outline")
                    .Status("warning")
                    .Tooltip(getString("cancelCalculation"))
                );
                break;
              case 2:
                x.Buttons.push(
                  new GridButtonType()
                    .Id("realPrice")
                    .Shape("round")
                    .Icon("checkmark-square-2-outline")
                    .Ghost(true)
                    .Status("primary")
                    .Tooltip(getString("enterRealPrice")),
                  new GridButtonType()
                    .Id("paidPrice")
                    .Shape("round")
                    .Icon("checkmark-square-outline")
                    .Ghost(true)
                    .Status("primary")
                    .Tooltip(getString("enterPaidPrice")),
                  new GridButtonType()
                    .Id("cancel")
                    .Shape("round")
                    .Icon("close-square-outline")
                    .Ghost(true)
                    .Status("warning")
                    .Tooltip(getString("cancelCalculation"))
                );
                break;
            }

            x.Buttons.push(
              new GridButtonType()
                .Id("documents")
                .Shape("round")
                .Icon("attach-outline")
                .Ghost(true)
                .Status("primary")
                .Tooltip(getString("calculationDocuments"))
                .Text(x.Documents)
            );
            return x;
          });
        })
    );
  }

  public refreshData(): void {
    this.getCalculations();
    this.getCalculationSummary();
    this.exportSettings.subtitle =
      getString("calculationFor") + ": " + (this.month + 1) + ". " + this.year;
  }

  private getCalculationSummary(): void {
    this._subs.push(
      this._calculationService
        .getCalculationSummary(this.month + 1, this.year)
        .subscribe((data) => {
          if (data.Summary) {
            this.summary = data.Summary;
            this._value = Math.trunc(
              (this.summary.CalculatedForPersons / this.summary.Persons) * 100
            );
            this.configureChart();
          }
        })
    );
  }

  public calculationSummaryDetailsClick(): void {
    this._dialogService.open(CalculationSummaryComponent, {
      autoFocus: false,
      context: {
        month: this.month + 1,
        year: this.year,
      },
    });
  }

  public newCalculationClick(): void {
    this._subs.push(
      this._dialogService
        .open(StartCalculationComponent, {
          autoFocus: false,
          closeOnEsc: false,
          closeOnBackdropClick: false,
        })
        .onClose.subscribe((result) => {
          if (result) this.refreshData();
        })
    );
  }

  public recalculateSelectedClick(): void {
    var selected = this.table.getSelectedRows().map((x) => x.PersonId);
    if (selected.length > 0) {
      this._subs.push(
        this._dialogService
          .open(StartCalculationComponent, {
            autoFocus: false,
            closeOnBackdropClick: false,
            closeOnEsc: false,
            context: {
              personsIds: selected,
              disableInputs: true,
              recalculate: 1,
              month: this.month,
              year: this.year,
            },
          })
          .onClose.subscribe((result) => {
            if (result) this.refreshData();
          })
      );
    } else
      this._toastrService.showToast("warning", getString("nothingSelected"));
  }

  public async markRealPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this._dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToMarkRealPrice")
      );
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this._subs.push(
            this._calculationService
              .calculationRealPriceSave({
                Id: element.Id,
                RealPrice: element.SystemPrice.replace(",", ""),
              })
              .subscribe(() => {
                if (index == selected.length - 1) {
                  this._toastrService.showToast(
                    "success",
                    getString("saveSuccess")
                  );
                  this.refreshData();
                }
              })
          );
        }
      }
    } else
      this._toastrService.showToast("warning", getString("nothingSelected"));
  }

  public async markPaidPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this._dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToMarkPaid")
      );
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          if (!element.RealPrice) {
            this._subs.push(
              this._calculationService
                .calculationRealPriceSave({
                  Id: element.Id,
                  RealPrice: element.SystemPrice.replace(",", ""),
                })
                .subscribe()
            );
          }

          this._subs.push(
            this._calculationService
              .calculationPaid({
                Id: element.Id,
                PaidPrice: element.RealPrice
                  ? element.RealPrice.replace(",", "")
                  : element.SystemPrice.replace(",", ""),
                PaidDate: new Date().toISOString(),
              })
              .subscribe(() => {
                if (index == selected.length - 1) {
                  this._toastrService.showToast(
                    "success",
                    getString("saveSuccess")
                  );
                  this.refreshData();
                }
              })
          );
        }
      }
    } else
      this._toastrService.showToast("warning", getString("nothingSelected"));
  }

  public async cancelCalculationClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this._dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToCancelSelected")
      );
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this._subs.push(
            this._calculationService
              .cancelCalculation({ Id: element.Id })
              .subscribe(() => {
                if (index == selected.length - 1) {
                  this._toastrService.showToast(
                    "success",
                    getString("saveSuccess")
                  );
                  this.refreshData();
                }
              })
          );
        }
      }
    } else
      this._toastrService.showToast("warning", getString("nothingSelected"));
  }

  public onButtonItemClicked(event: IGridCellButton): void {
    switch (event.button.getId()) {
      case "realPrice":
        this.openRealPriceDialog(event.row);
        break;

      case "paidPrice":
        this.openPaidPriceDialog(event.row);
        break;

      case "cancel":
        this.cancelCalculation(event.row.Id);
        break;

      case "documents":
        this.openDocumentsDialog(event.row);
        break;
    }
  }

  private openRealPriceDialog(calculation: any): void {
    this._subs.push(
      this._dialogService
        .open(RealPriceModalComponent, {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            realPrice: calculation.RealPrice ?? calculation.SystemPrice,
            id: calculation.Id,
          },
        })
        .onClose.subscribe((result) => {
          if (result) this.refreshData();
        })
    );
  }

  private openPaidPriceDialog(calculation: any): void {
    this._subs.push(
      this._dialogService
        .open(PaidCalculationModalComponent, {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            realPrice: calculation.RealPrice ?? calculation.SystemPrice,
            paidPrice: calculation.RealPrice ?? calculation.SystemPrice,
            id: calculation.Id,
            personId: calculation.PersonId,
          },
        })
        .onClose.subscribe((result) => {
          if (result) this.refreshData();
        })
    );
  }

  private openDocumentsDialog(calculation: any): void {
    this._subs.push(
      this._dialogService
        .open(CalculationDocumentsComponent, {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            id: calculation.Id,
            personId: calculation.PersonId,
          },
        })
        .onClose.subscribe((result) => {
          if (result) this.refreshData();
        })
    );
  }

  private async cancelCalculation(id: number): Promise<void> {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToCancelCalculation")
    );
    if (rez) {
      this._subs.push(
        this._calculationService.cancelCalculation({ Id: id }).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.refreshData();
        })
      );
    }
  }

  private configureChart(): void {
    this._subs.push(
      this._theme
        .getJsTheme()
        .pipe()
        .subscribe((config) => {
          this.options = Object.assign(
            {},
            {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)",
              },
              series: [
                {
                  name: getString("chartCalculated"),
                  clockwise: true,
                  emphasis: { scale: true },
                  type: "pie",
                  center: ["45%", "50%"],
                  radius: ["80%", "90%"],
                  data: [
                    {
                      value: this._value,
                      name: getString("chartCalculated"),
                      label: {
                        position: "center",
                        formatter: "{d}%",
                        fontSize: "22",
                        fontFamily: config.variables.fontSecondary,
                        fontWeight: "600",
                        color: config.variables.fgHeading,
                      },
                      tooltip: {
                        show: false,
                      },
                      itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: "#33B9BF",
                          },
                          {
                            offset: 1,
                            color: "#33B9BF",
                          },
                        ]),
                        shadowColor: "rgba(0, 0, 0, 0)",
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                      },
                      emphasis: { scale: false },
                    },
                    {
                      value: 100 - this._value,
                      name: " ",
                      tooltip: {
                        show: false,
                      },
                      label: {
                        position: "inner",
                      },
                      itemStyle: {
                        color: DEFAULT_THEME.variables.bg2,
                      },
                    },
                  ],
                },
                {
                  name: " ",
                  clockwise: true,
                  emphasis: { scale: false },
                  type: "pie",
                  center: ["45%", "50%"],
                  radius: ["80%", "90%"],
                  data: [
                    {
                      value: this._value,
                      name: " ",
                      label: {
                        position: "inner",
                        show: false,
                      },
                      tooltip: {
                        show: false,
                      },
                      itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: "#33B9BF",
                          },
                          {
                            offset: 1,
                            color: "#33B9BF",
                          },
                        ]),
                        shadowColor: "rgba(0, 0, 0, 0)",
                        shadowBlur: 7,
                      },
                      emphasis: { scale: false },
                    },
                    {
                      value: 100 - this._value,
                      name: " ",
                      tooltip: {
                        show: false,
                      },
                      label: {
                        position: "inner",
                      },
                      itemStyle: {
                        color: "none",
                      },
                    },
                  ],
                },
              ],
            }
          );
        })
    );
  }
}
