import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DiscountsService } from "../../services/rest/discounts.service";
import { getString } from "../../resources/strings";
import {
  CheckboxType,
  GridCheckboxColumn,
  GridColumn,
  GridSelectEditor,
  GridSelectFilter,
  SelectFilter,
  SmartTableColumn,
} from "shared-components";
import { NbWindowService, NbWindowState } from "@nebular/theme";
import { AddEditDiscountComponent } from "./add-edit-discount/add-edit-discount.component";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { ExportDocSettings } from "shared-components/lib/models/smart-table.model";

@Component({
  selector: "sample-discounts",
  templateUrl: "./discounts.component.html",
  styleUrls: ["./discounts.component.scss"],
})
export class DiscountsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private percentCalculationFilter = [
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
          .DataSource(this.percentCalculationFilter)
      ),
  ];
  public exportSettings: ExportDocSettings = {
    title: getString("discounts"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "discounts",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  constructor(
    private discountsService: DiscountsService,
    private windowService: NbWindowService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDiscounts();
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getDiscounts(): void {
    this.subs.push(
      this.discountsService.getData().subscribe(
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
    this.subs.push(
      this.windowService
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
    const result = await this.dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("deactivateDiscount")
    );

    if (result) {
      this.subs.push(
        this.discountsService.delete(event.data).subscribe(
          () => {
            this.toastrService.showToast(
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
