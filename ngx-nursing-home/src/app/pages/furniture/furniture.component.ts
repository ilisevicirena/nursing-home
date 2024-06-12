import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FurnitureService } from "../../services/rest/furniture.service";
import {
  GridColumn,
  GridDateboxEditor,
  GridDateboxFilter,
  GridDateColumn,
  GridLookupColumn,
  GridSelectEditor,
  GridSelectFilter,
  GridTagColumn,
  GridTextboxEditor,
  GridTextAreaEditor,
  GridButtonsColumn,
  GridButtonType,
  GRID_BUTTON_TYPE,
  IGridCellButton,
  IGridExportDocumentSettings,
} from "shared-components";
import { getString } from "../../resources/strings";
import { FurnitureStatusesService } from "../../services/rest/furniture-statuses.service";
import { RoomsService } from "../../services/rest/rooms.service";
import { ToastrService } from "../../services/toastr.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ChangeFurnitureStatusComponent } from "./change-furniture-status/change-furniture-status.component";
import { FurnitureStatusesPreviewComponent } from "./furniture-statuses-preview/furniture-statuses-preview.component";

@Component({
  selector: "sample-furniture",
  templateUrl: "./furniture.component.html",
  styleUrls: ["./furniture.component.scss"],
})
export class FurnitureComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public statuses: any[] = [];
  public furniture: any[] = [];
  public getString = getString;
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("furniture"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "furniture",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  public columns: GridColumn[] = [
    new GridColumn()
      .Title(getString("id"))
      .DataField("Id")
      .Editable(false)
      .Addable(false)
      .Editor(
        new GridTextboxEditor().WidthClass("col-md-2").Label(getString("id"))
      ),
    new GridColumn()
      .Title(getString("name"))
      .DataField("Name")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-10")
          .Label(getString("name"))
          .Required(true)
      ),
    new GridColumn()
      .Title(getString("creationDate"))
      .DataField("CreationDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy."))
      .Filter(new GridDateboxFilter().Format("dd.MM.yyyy"))
      .Addable(false)
      .Editable(false)
      .Editor(new GridTextboxEditor().Show(false)),
    new GridColumn()
      .Title(getString("inventoryCode"))
      .DataField("InventoryCode")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-6")
          .Label(getString("inventoryCode"))
      ),
    new GridColumn()
      .Title(getString("latestStatus"))
      .DataField("LatestStatusId")
      .Type(
        new GridTagColumn()
          .LookupColumn("LatestStatusName")
          .IconColumn("StatusIcon")
          .IsEvaIcon(true)
          .ColorColumn("StatusColor")
      )
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._furnitureStatusService.apiRoute)
      )
      .Addable(false)
      .Editable(false)
      .Editor(new GridTextboxEditor().Show(false)),
    new GridColumn()
      .Title(getString("latestStatusDate"))
      .DataField("LatestStatusDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy."))
      .Filter(new GridDateboxFilter().Format("dd.MM.yyyy"))
      .Addable(false)
      .Editable(false)
      .Editor(new GridTextboxEditor().Show(false)),
    new GridColumn()
      .Title(getString("room"))
      .DataField("RoomId")
      .Type(new GridLookupColumn().LookupColumn("RoomName"))
      .Editor(
        new GridSelectEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._roomsService.apiRoute)
          .WidthClass("col-md-6")
          .Label(getString("room"))
      ),
    new GridColumn()
      .Title(getString("floor"))
      .DataField("FloorId")
      .Type(new GridLookupColumn().LookupColumn("FloorName"))
      .Editor(new GridSelectEditor().Show(false)),
    new GridColumn()
      .Title(getString("description"))
      .DataField("Description")
      .Editor(
        new GridTextAreaEditor()
          .Max(2000)
          .Rows(4)
          .Label(getString("description"))
      ),
    new GridColumn()
      .DataField("Buttons")
      .Title(getString("actions"))
      .Editable(false)
      .Editor(new GridTextboxEditor().Show(false))
      .Filter(false)
      .Export(false)
      .Sortable(false)
      .GroupingEnabled(false)
      .Type(
        new GridButtonsColumn().Buttons([
          new GridButtonType()
            .Type(GRID_BUTTON_TYPE.EDIT)
            .Icon("edit-outline")
            .Tooltip(getString("gridEditTooltip")),
          new GridButtonType()
            .Type(GRID_BUTTON_TYPE.DELETE)
            .Icon("trash-outline")
            .Tooltip(getString("gridDeleteTooltip")),
          new GridButtonType()
            .Type(GRID_BUTTON_TYPE.OTHER)
            .Id("changeStatus")
            .Icon("swap-outline")
            .Tooltip(getString("changeStatus")),
          new GridButtonType()
            .Type(GRID_BUTTON_TYPE.OTHER)
            .Id("viewStatuses")
            .Icon("file-text-outline")
            .Tooltip(getString("viewStatuses")),
          new GridButtonType()
            .Type(GRID_BUTTON_TYPE.OTHER)
            .Id("removeFromRoom")
            .Icon("close-square-outline")
            .Tooltip(getString("removeFromRoom")),
        ])
      ),
  ];

  constructor(
    private _furnitureService: FurnitureService,
    private _furnitureStatusService: FurnitureStatusesService,
    private _roomsService: RoomsService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getFurnitureCountByStatus();
    this.getFurniture();
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  private getFurnitureCountByStatus(): void {
    this._subs.push(
      this._furnitureService.getFurnitureCountByStatus().subscribe((x) => {
        this.statuses = x;
      })
    );
  }

  private getFurniture(): void {
    this._subs.push(
      this._furnitureService.getData().subscribe((x) => {
        this.furniture = x;
      })
    );
  }

  public createConfirm(event: any): void {
    this._subs.push(
      this._furnitureService.add(event.newData).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getFurniture();
          this.getFurnitureCountByStatus();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public editConfirm(event: any): void {
    this._subs.push(
      this._furnitureService.update(event.newData).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getFurniture();
          this.getFurnitureCountByStatus();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public deleteConfirm(event: any): void {
    this._subs.push(
      this._furnitureService.delete(event.data).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getFurniture();
          this.getFurnitureCountByStatus();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onButtonItemClicked(event: IGridCellButton): void {
    switch (event.button.getId()) {
      case "changeStatus":
        this.changeFurnitureStatus(event.row);
        break;
      case "viewStatuses":
        this.viewFurnitureStatuses(event.row);
        break;
      case "removeFromRoom":
        this.removeFurnitureFromRoom(event.row);
        break;
    }
  }

  private changeFurnitureStatus(row: any) {
    this._subs.push(
      this._dialogService
        .open(ChangeFurnitureStatusComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: {
            rowData: row,
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this.getFurniture();
            this.getFurnitureCountByStatus();
          }
        })
    );
  }

  private viewFurnitureStatuses(row: any) {
    this._subs.push(
      this._dialogService
        .open(FurnitureStatusesPreviewComponent, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          autoFocus: false,
          context: { rowData: row },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this.getFurniture();
            this.getFurnitureCountByStatus();
          }
        })
    );
  }

  private async removeFurnitureFromRoom(row: any) {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("removeFurnitureFromRoomQuestion")
    );

    if (rez) {
      this._subs.push(
        this._furnitureService.removeFurnitureFromRoom(row.Id).subscribe(
          () => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getFurniture();
          },
          (err) => {
            console.error(err);
            this._toastrService.showToast("danger", getString("saveError"));
          }
        )
      );
    }
  }
}
