import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PackagesService } from "../../services/rest/packages.service";
import { PriceUnitsService } from "../../services/rest/price-units.service";
import { ToastrService } from "../../services/toastr.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import {
  GridCheckboxColumn,
  GridColumn,
  GridLookupColumn,
  GridSelectFilter,
  IGridExportDocumentSettings,
} from "shared-components";
import { AddEditPackageComponent } from "./add-edit-package/add-edit-package.component";
import { NbWindowService, NbWindowState } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { MeasureUnitsService } from "../../services/rest/measure-units.service";

@Component({
  selector: "sample-packages",
  templateUrl: "./packages.component.html",
  styleUrls: ["./packages.component.scss"],
})
export class PackagesComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

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
          .ServerEndpoint(this._priceUnitsService.apiRoute)
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
            this._measureUnitsService.apiRoute + "/getCalculationMeasureUnits"
          )
      ),
    new GridColumn()
      .Title(getString("packagePriceCalculated"))
      .DataField("PackagePriceCalculated")
      .Type(new GridCheckboxColumn()),
  ];
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("packages"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "packages",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  constructor(
    private _packagesService: PackagesService,
    private _priceUnitsService: PriceUnitsService,
    private _measureUnitsService: MeasureUnitsService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService,
    private _windowService: NbWindowService
  ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getPackages(): void {
    this._subs.push(
      this._packagesService.getData().subscribe((data) => {
        this.packagesData = data;
      })
    );
  }

  public onCreateStarted(): void {
    this._subs.push(
      this._windowService
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
    this._subs.push(
      this._windowService
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
    const result = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("deactivatePackage")
    );

    if (result) {
      this._subs.push(
        this._packagesService.delete(event.data).subscribe(
          () => {
            this._toastrService.showToast("success", getString("saveSuccess"));
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
