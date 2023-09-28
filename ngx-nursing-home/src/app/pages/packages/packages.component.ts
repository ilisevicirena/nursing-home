import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PackagesService } from "../../services/rest/packages.service";
import { PriceUnitsService } from "../../services/rest/price-units.service";
import { ToastrService } from "../../services/toastr.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import {
  CheckboxType,
  GridCheckboxColumn,
  GridColumn,
  GridLookupColumn,
  GridSelectFilter,
  LookupType,
  SelectFilter,
  SmartTableColumn,
} from "shared-components";
import { AddEditPackageComponent } from "./add-edit-package/add-edit-package.component";
import { NbWindowService, NbWindowState } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { MeasureUnitsService } from "../../services/rest/measure-units.service";
import { ExportDocSettings } from "shared-components/lib/models/smart-table.model";
import { sortFloats } from "../../resources/functions";

@Component({
  selector: "sample-packages",
  templateUrl: "./packages.component.html",
  styleUrls: ["./packages.component.scss"],
})
export class PackagesComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public packagesData: any[] = [];
  public getString = getString;
  public packagesColumns: GridColumn[] = [
    new GridColumn().Title(getString("id")).DataField("Id"),
    new GridColumn().Title(getString("name")).DataField("Name"),
    new GridColumn().Title(getString("description")).DataField("Description"),
    new GridColumn()
      .Title(getString("defaultPrice"))
      .DataField("DefaultPackagePrice"),
    new GridColumn()
      .Title(getString("priceUnit"))
      .DataField("DefaultPackagePriceUnitId")
      .Type(new GridLookupColumn().LookupColumn("PriceUnitTag"))
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("Tag")
          .ServerDataSource(true)
          .ServerEndpoint(this.priceUnitsService.apiRoute)
      ),
    new GridColumn()
      .Title(getString("measureUnit"))
      .DataField("CalculationMeasureUnitId")
      .Type(new GridLookupColumn().LookupColumn("MeasureUnitTag"))
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("Tag")
          .ServerDataSource(true)
          .ServerEndpoint(
            this.measureUnitsService.apiRoute + "/getCalculationMeasureUnits"
          )
      ),
    new GridColumn()
      .Title(getString("packagePriceCalculated"))
      .DataField("PackagePriceCalculated")
      .Type(new GridCheckboxColumn()),
  ];
  public exportSettings: ExportDocSettings = {
    title: getString("packages"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "packages",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  constructor(
    private packagesService: PackagesService,
    private priceUnitsService: PriceUnitsService,
    private measureUnitsService: MeasureUnitsService,
    private toastrService: ToastrService,
    private dialogService: DialogService,
    private windowService: NbWindowService
  ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getPackages(): void {
    this.subs.push(
      this.packagesService.getData().subscribe((data) => {
        this.packagesData = data;
      })
    );
  }

  public onCreateStarted(): void {
    this.subs.push(
      this.windowService
        .open(AddEditPackageComponent, {
          context: { isNew: true },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "package-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getPackages();
        })
    );
  }

  public onEditStarted(event: any): void {
    this.subs.push(
      this.windowService
        .open(AddEditPackageComponent, {
          context: {
            isNew: false,
            package: JSON.parse(JSON.stringify(event.data)),
          },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "package-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getPackages();
        })
    );
  }

  public async onDeleteStarted(event: any): Promise<void> {
    const result = await this.dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("deactivatePackage")
    );

    if (result) {
      this.subs.push(
        this.packagesService.delete(event.data).subscribe(
          () => {
            this.toastrService.showToast("success", getString("saveSuccess"));
            this.getPackages();
          },
          (err) => {
            console.error(err);
          }
        )
      );
    }
  }
}
