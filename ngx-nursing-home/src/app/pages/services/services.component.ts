import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ServicesService } from "../../services/rest/services.service";
import { getString } from "../../resources/strings";
import {
  GridColumn,
  GridLookupColumn,
  GridSelectFilter,
  IGridExportDocumentSettings,
} from "shared-components";
import { MeasureUnitsService } from "../../services/rest/measure-units.service";
import { PriceUnitsService } from "../../services/rest/price-units.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { AddEditServiceComponent } from "./add-edit-service/add-edit-service.component";
import { NbWindowService, NbWindowState } from "@nebular/theme";

@Component({
  selector: "sample-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit, OnDestroy {
  public servicesData: any[] = [];
  public getString = getString;
  public servicesColumns: GridColumn[] = [
    new GridColumn().Title(getString("id")).DataField("Id"),
    new GridColumn().Title(getString("name")).DataField("Name"),
    new GridColumn().Title(getString("description")).DataField("Description"),
    new GridColumn().Title(getString("costPerUnit")).DataField("CostPerUnit"),
    new GridColumn()
      .Title(getString("measureUnit"))
      .DataField("MeasureUnitId")
      .Type(new GridLookupColumn().LookupColumn("MeasureUnitName"))
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("Tag")
          .ServerDataSource(true)
          .ServerEndpoint(this._measureUnitsService.apiRoute)
      ),
    new GridColumn()
      .Title(getString("priceUnit"))
      .DataField("PriceUnitId")
      .Type(new GridLookupColumn().LookupColumn("PriceUnitTag"))
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("Tag")
          .ServerDataSource(true)
          .ServerEndpoint(this._priceUnitsService.apiRoute)
      ),
  ];
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("services"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "services",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  private _subs: Subscription[] = [];

  constructor(
    private _servicesService: ServicesService,
    private _measureUnitsService: MeasureUnitsService,
    private _priceUnitsService: PriceUnitsService,
    private _dialogService: DialogService,
    private _toastrService: ToastrService,
    private _windowService: NbWindowService
  ) {}

  ngOnInit(): void {
    this.getServices();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getServices(): void {
    this._subs.push(
      this._servicesService.getData().subscribe(
        (data) => {
          this.servicesData = data;
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
        .open(AddEditServiceComponent, {
          context: { isNew: true },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "service-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getServices();
        })
    );
  }

  public onEditStarted(event: any): void {
    this._subs.push(
      this._windowService
        .open(AddEditServiceComponent, {
          context: {
            isNew: false,
            service: JSON.parse(JSON.stringify(event.data)),
          },
          buttons: {
            maximize: false,
            minimize: false,
            fullScreen: false,
            close: false,
          },
          initialState: NbWindowState.MAXIMIZED,
          hasBackdrop: true,
          windowClass: "service-popup-window",
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((data: boolean) => {
          if (data) this.getServices();
        })
    );
  }

  public async onDeleteStarted(event: any): Promise<void> {
    const result = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("deactivateService")
    );

    if (result) {
      this._subs.push(
        this._servicesService.delete(event.data).subscribe(
          () => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getServices();
          },
          (err) => {
            console.error(err);
          }
        )
      );
    }
  }
}
