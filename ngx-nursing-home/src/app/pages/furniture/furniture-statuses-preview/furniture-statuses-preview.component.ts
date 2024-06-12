import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../../resources/strings";
import { Subscription } from "rxjs";
import { FurnitureService } from "../../../services/rest/furniture.service";
import { ToastrService } from "../../../services/toastr.service";
import {
  GRID_DATE_PICKER,
  GridColumn,
  GridDateboxEditor,
  GridDateboxFilter,
  GridDateColumn,
  GridSelectEditor,
  GridSelectFilter,
  GridTagColumn,
  GridTextboxEditor,
  IGridExportDocumentSettings,
} from "shared-components";
import { FurnitureStatusesService } from "../../../services/rest/furniture-statuses.service";

@Component({
  selector: "sample-furniture-statuses-preview",
  templateUrl: "./furniture-statuses-preview.component.html",
  styleUrls: ["./furniture-statuses-preview.component.scss"],
})
export class FurnitureStatusesPreviewComponent implements OnInit, OnDestroy {
  public getString = getString;
  public rowData: any;
  public dataSource: any[] = [];
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("furnitureStatusesPreview"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "furniture-statuses-preview",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };
  public columns: GridColumn[] = [
    new GridColumn()
      .Title(getString("rowId"))
      .DataField("RowId")
      .Editable(false)
      .Addable(false)
      .Editor(new GridTextboxEditor().Show(false)),
    new GridColumn()
      .Title(getString("status"))
      .DataField("FurnitureStatusId")
      .Type(
        new GridTagColumn()
          .ColorColumn("StatusColor")
          .IconColumn("StatusIcon")
          .IsEvaIcon(true)
          .LookupColumn("StatusName")
      )
      .Filter(
        new GridSelectFilter()
          .ServerDataSource(true)
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerEndpoint(this._furnitureStatusesService.apiRoute)
      )
      .Editor(
        new GridSelectEditor()
          .ServerDataSource(true)
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerEndpoint(this._furnitureStatusesService.apiRoute)
          .Required(true)
      ),
    new GridColumn()
      .Title(getString("statusStartDate"))
      .DataField("StartDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy HH:mm"))
      .Filter(new GridDateboxFilter().Format("dd.MM.yyyy"))
      .Editor(
        new GridDateboxEditor()
          .PickerType(GRID_DATE_PICKER.DATE_TIME)
          .Format("dd.MM.yyyy HH:mm")
          .Required(true)
      ),
    new GridColumn()
      .Title(getString("statusEndDate"))
      .DataField("EndDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy HH:mm"))
      .Filter(new GridDateboxFilter().Format("dd.MM.yyyy"))
      .Editor(new GridTextboxEditor().Show(false)),
  ];

  private _subs: Subscription[] = [];
  private _changes: boolean = false;

  constructor(
    private _ref: NbDialogRef<FurnitureStatusesPreviewComponent>,
    private _furnitureService: FurnitureService,
    private _toastrService: ToastrService,
    private _furnitureStatusesService: FurnitureStatusesService
  ) {}

  ngOnInit(): void {
    if (this.rowData) this.getFurnitureStatuses();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(): void {
    this._ref.close(this._changes);
  }

  private getFurnitureStatuses(): void {
    this._subs.push(
      this._furnitureService
        .getFurnitureStatuses(this.rowData.Id)
        .subscribe((data) => {
          this.dataSource = data;
        })
    );
  }

  public onCreateConfirm(event: any): void {
    this._subs.push(
      this._furnitureService
        .changeFurnitureStatus(
          this.rowData.Id,
          event.FurnitureStatusId,
          event.StartDate
        )
        .subscribe(
          () => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getFurnitureStatuses();
            this._changes = true;
          },
          (err) => {
            console.error(err);
            this._toastrService.showToast("danger", getString("saveError"));
          }
        )
    );
  }

  public onDeleteConfirm(event: any): void {
    this._subs.push(
      this._furnitureService
        .deleteFurnitureStatus({ Id: event.data.RowId })
        .subscribe(
          () => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getFurnitureStatuses();
            this._changes = true;
          },
          (err) => {
            console.error(err);
            this._toastrService.showToast("danger", getString("saveError"));
          }
        )
    );
  }
}
