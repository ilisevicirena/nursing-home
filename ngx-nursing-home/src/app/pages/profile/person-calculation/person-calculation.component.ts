import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { CalculationApiService } from "../../../services/rest/calculation-api.service";
import {
  ButtonsType,
  DateRangePickerEditor,
  DateRangeType,
  DateType,
  DatepickerFilter,
  GRID_BUTTON_TYPE,
  GridButtonType,
  GridButtonsColumn,
  GridColumn,
  GridComponent,
  GridDateColumn,
  GridDateRangeColumn,
  GridDateboxFilter,
  GridSelectFilter,
  GridTagColumn,
  IGridCellButtonClick,
  SelectFilter,
  SmartTableColumn,
  SmartTableComponent,
  TagType,
} from "shared-components";
import { sortFloats } from "../../../resources/functions";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { ToastrService } from "../../../services/toastr.service";
import { RealPriceModalComponent } from "../../calculation/real-price-modal/real-price-modal.component";
import { PaidCalculationModalComponent } from "../../calculation/paid-calculation-modal/paid-calculation-modal.component";
import { CalculationDocumentsComponent } from "../../calculation/calculation-documents/calculation-documents.component";
import { StartCalculationComponent } from "../../calculation/start-calculation/start-calculation.component";

@Component({
  selector: "sample-person-calculation",
  templateUrl: "./person-calculation.component.html",
  styleUrls: ["./person-calculation.component.scss"],
})
export class PersonCalculationComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public getString = getString;
  public calculations: any[] = [];
  public summary: any;

  @Input() personId: number;

  @ViewChild(GridComponent) table: GridComponent;

  public columns: GridColumn[] = [
    new GridColumn().Title(getString("calculationMonth")).DataField("Month"),
    new GridColumn().Title(getString("calculationYear")).DataField("Year"),
    new GridColumn()
      .Title(getString("period"))
      .DataField("Range")
      .Type(new GridDateRangeColumn().Format("dd.MM.yyyy.")),
    new GridColumn()
      .Title(getString("calculationDate"))
      .DataField("CalculationDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy. HH:mm"))
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("status"))
      .DataField("StatusId")
      .Type(
        new GridTagColumn()
          .LookupColumn("StatusStringKey")
          .ColorColumn("StatusColor")
      )
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("StringKey")
          .ServerDataSource(true)
          .ServerEndpoint(
            this.calculationService.apiRoute + "/getCalculationStatuses"
          )
      ),
    new GridColumn().Title(getString("systemPrice")).DataField("SystemPrice"),
    new GridColumn().Title(getString("realPrice")).DataField("RealPrice"),
    new GridColumn().Title(getString("paidPrice")).DataField("PaidPrice"),
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

  constructor(
    private calculationService: CalculationApiService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCalculations();
  }

  private getCalculations(): void {
    this.subs.push(
      this.calculationService
        .getCalculationsForPerson(this.personId)
        .subscribe((data) => {
          this.calculations = data;
          this.calculations.map((x) => {
            x.Range = { start: x.DateFrom, end: x.DateTo };
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

    this.subs.push(
      this.calculationService
        .getCalculationsSummaryForPerson(this.personId)
        .subscribe((data) => {
          this.summary = data;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public onButtonItemClicked(event: IGridCellButtonClick): void {
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
    this.subs.push(
      this.dialogService
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
          if (result) this.getCalculations();
        })
    );
  }

  private openPaidPriceDialog(calculation: any): void {
    this.subs.push(
      this.dialogService
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
          if (result) this.getCalculations();
        })
    );
  }

  private openDocumentsDialog(calculation: any): void {
    this.subs.push(
      this.dialogService
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
          if (result) this.getCalculations();
        })
    );
  }

  private async cancelCalculation(id: number): Promise<void> {
    const rez = await this.dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToCancelCalculation")
    );
    if (rez) {
      this.subs.push(
        this.calculationService.cancelCalculation({ Id: id }).subscribe(() => {
          this.toastrService.showToast("success", getString("saveSuccess"));
          this.getCalculations();
        })
      );
    }
  }

  public async markRealPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToMarkRealPrice")
      );
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this.subs.push(
            this.calculationService
              .calculationRealPriceSave({
                Id: element.Id,
                RealPrice: element.SystemPrice.replace(",", ""),
              })
              .subscribe(() => {
                if (index == selected.length - 1) {
                  this.toastrService.showToast(
                    "success",
                    getString("saveSuccess")
                  );
                  this.getCalculations();
                }
              })
          );
        }
      }
    } else
      this.toastrService.showToast("warning", getString("nothingSelected"));
  }

  public async markPaidPriceClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToMarkPaid")
      );
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          if (!element.RealPrice) {
            this.subs.push(
              this.calculationService
                .calculationRealPriceSave({
                  Id: element.Id,
                  RealPrice: element.SystemPrice.replace(",", ""),
                })
                .subscribe()
            );
          }

          this.subs.push(
            this.calculationService
              .calculationPaid({
                Id: element.Id,
                PaidPrice: element.RealPrice
                  ? element.RealPrice.replace(",", "")
                  : element.SystemPrice.replace(",", ""),
                PaidDate: new Date().toISOString(),
              })
              .subscribe(() => {
                if (index == selected.length - 1) {
                  this.toastrService.showToast(
                    "success",
                    getString("saveSuccess")
                  );
                  this.getCalculations();
                }
              })
          );
        }
      }
    } else
      this.toastrService.showToast("warning", getString("nothingSelected"));
  }

  public async cancelCalculationClick(): Promise<void> {
    var selected = this.table.getSelectedRows();
    if (selected.length > 0) {
      const rez = await this.dialogService.openYesNoDialog(
        getString("areYouSure"),
        getString("wantToCancelSelected")
      );
      if (rez) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          this.subs.push(
            this.calculationService
              .cancelCalculation({ Id: element.Id })
              .subscribe(() => {
                if (index == selected.length - 1) {
                  this.toastrService.showToast(
                    "success",
                    getString("saveSuccess")
                  );
                  this.getCalculations();
                }
              })
          );
        }
      }
    } else
      this.toastrService.showToast("warning", getString("nothingSelected"));
  }

  public newCalculationClick(): void {
    this.subs.push(
      this.dialogService
        .open(StartCalculationComponent, {
          autoFocus: false,
          closeOnEsc: false,
          closeOnBackdropClick: false,
          context: {
            personsIds: [parseInt(this.personId as any)],
            profileMode: true,
          },
        })
        .onClose.subscribe((result) => {
          if (result) this.getCalculations();
        })
    );
  }

  public recalculateSelectedClick(): void {
    var selected = this.table.getSelectedRows();
    console.log(selected);
    if (selected.length == 1) {
      this.subs.push(
        this.dialogService
          .open(StartCalculationComponent, {
            autoFocus: false,
            closeOnBackdropClick: false,
            closeOnEsc: false,
            context: {
              personsIds: [parseInt(selected[0].PersonId)],
              disableInputs: true,
              recalculate: 1,
              month: selected[0].Month - 1,
              year: selected[0].Year,
              profileMode: true,
            },
          })
          .onClose.subscribe((result) => {
            if (result) this.getCalculations();
          })
      );
    } else
      this.toastrService.showToast("warning", getString("nothingSelected"));
  }
}
