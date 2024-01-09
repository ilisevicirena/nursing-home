import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DiscountsService } from "../../services/rest/discounts.service";
import { getString } from "../../resources/strings";
import {
  GridCheckboxColumn,
  GridColumn,
  GridSelectFilter,
  IGridExportDocumentSettings,
} from "shared-components";
import { NbWindowService, NbWindowState } from "@nebular/theme";
import { AddEditDiscountComponent } from "./add-edit-discount/add-edit-discount.component";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";

@Component({
  selector: "sample-discounts",
  templateUrl: "./discounts.component.html",
  styleUrls: ["./discounts.component.scss"],
})
export class DiscountsComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private _percentCalculationFilter: any[] = [
    { value: true, label: getString("yes") },
    { value: false, label: getString("no") },
  ];

  public getString = getString;
  public discountsData: any[] = [];
  public discountsColumns: GridColumn[] = [
    new GridColumn().Title(getString("id")).DataField("Id"),
    new GridColumn().Title(getString("name")).DataField("Name"),
    new GridColumn().Title(getString("description")).DataField("Description"),
    new GridColumn().Title(getString("quantity")).DataField("Quantity"),
    new GridColumn()
      .Title(getString("percentCalculation"))
      .DataField("PercentCalculation")
      .Type(new GridCheckboxColumn())
      .Filter(
        new GridSelectFilter()
          .KeyExpression("value")
          .DisplayExpression("label")
          .DataSource(this._percentCalculationFilter)
      ),
  ];
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("discounts"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "discounts",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  constructor(
    private _discountsService: DiscountsService,
    private _windowService: NbWindowService,
    private _dialogService: DialogService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDiscounts();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getDiscounts(): void {
    this._subs.push(
      this._discountsService.getData().subscribe(
        (data) => {
          this.discountsData = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public onCreateStarted(): void {
    this._subs.push(
      this._windowService
        .open(AddEditDiscountComponent, {
          context: { isNew: true },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "discount-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getDiscounts();
        })
    );
  }

  public async onDeleteStarted(event: any): Promise<void> {
    const result = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("deactivateDiscount")
    );

    if (result) {
      this._subs.push(
        this._discountsService.delete(event.data).subscribe(
          () => {
            this._toastrService.showToast(
              "success",
              getString("saveSuccess"),
              ""
            );
            this.getDiscounts();
          },
          (err) => {
            console.error(err);
          }
        )
      );
    }
  }
}
