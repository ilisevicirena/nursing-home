import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import {
  GridColumn,
  GridTextboxEditor,
  GridNumberBoxEditor,
  GridLookupColumn,
  GridSelectEditor,
  GridSelectFilter,
  GridNumberBoxFilter,
  GRID_MODE,
  IGridExportDocumentSettings,
} from "shared-components";
import { FloorsService, IFloor } from "../../services/rest/floors.service";
import { IRoom, RoomsService } from "../../services/rest/rooms.service";
import { Subscription } from "rxjs";
import { ToastrService } from "../../services/toastr.service";

@Component({
    selector: "sample-room-management",
    templateUrl: "./room-management.component.html",
    styleUrls: ["./room-management.component.scss"],
    standalone: false
})
export class RoomManagementComponent implements OnInit, OnDestroy {
  public floorsTitle: string = getString("floors");
  public roomsTitle: string = getString("rooms");
  public noRoomsTitle: string = getString("noRoomsForSelectedFloor");
  public getString = getString;
  public floorsData: any[] = [];
  public roomsData: any[] = [];
  public tableMode: GRID_MODE = GRID_MODE.POPUP;
  public floorsLoading: boolean = false;
  public roomsLoading: boolean = false;
  public selectedFloorRooms: any[] = [];
  public floorsGridColumns: GridColumn[] = [
    new GridColumn()
      .Title(getString("id"))
      .DataField("Id")
      .Addable(false)
      .Editable(false)
      .Editor(new GridNumberBoxEditor().Label(getString("id")))
      .Filter(new GridNumberBoxFilter()),
    new GridColumn()
      .Title(getString("name"))
      .DataField("Name")
      .Editor(new GridTextboxEditor().Required(true).Label(getString("name"))),
  ];

  public roomsGridColumns: GridColumn[] = [
    new GridColumn()
      .Title(getString("id"))
      .DataField("Id")
      .Addable(false)
      .Editable(false)
      .Editor(
        new GridTextboxEditor().Label(getString("id")).WidthClass("col-md-2")
      ),
    new GridColumn()
      .Title(getString("name"))
      .DataField("Name")
      .Editor(
        new GridTextboxEditor()
          .Label(getString("name"))
          .WidthClass("col-md-10")
          .Required(true)
      ),
    new GridColumn()
      .Title(getString("capacity"))
      .DataField("Capacity")
      .Editor(
        new GridNumberBoxEditor()
          .Max(10)
          .Min(0)
          .WidthClass("col-md-4")
          .Required(true)
          .Label(getString("capacity"))
      ),
    new GridColumn()
      .Title(getString("floor"))
      .DataField("FloorId")
      .Type(new GridLookupColumn().LookupColumn("FloorName"))
      .Editor(
        new GridSelectEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._floorsService.apiRoute)
          .WidthClass("col-md-8")
          .Label(getString("floor"))
          .Required(true)
      )
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._floorsService.apiRoute)
      ),
    new GridColumn()
      .Title(getString("width"))
      .DataField("Width")
      .Visible(false)
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-3")
          .Label(getString("width"))
      ),
    new GridColumn()
      .Title(getString("height"))
      .DataField("Height")
      .Visible(false)
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-3")
          .Label(getString("height"))
      ),
    new GridColumn()
      .Title(getString("top"))
      .DataField("Top")
      .Visible(false)
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-3")
          .Label(getString("top"))
      ),
    new GridColumn()
      .Title(getString("left"))
      .DataField("Left")
      .Visible(false)
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-3")
          .Label(getString("left"))
      ),
  ];

  public exportSettingsFloors: IGridExportDocumentSettings = {
    title: getString("floors"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "floors",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };
  public exportSettingsRooms: IGridExportDocumentSettings = {
    title: getString("rooms"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "rooms",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  private _subs: Subscription[] = [];

  constructor(
    private _floorsService: FloorsService,
    private _roomsService: RoomsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshTabData(null);
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public onTabChange(event: any): void {
    this.refreshTabData(event.tabTitle);
  }

  public onCreateFloorConfirm(event: any): void {
    var model: IFloor = { Name: event.newData.Name };

    this._subs.push(
      this._floorsService.add(model).subscribe(
        (data) => {
          if (data) {
            if (data.FloorId) {
              this._toastrService.showToast(
                "success",
                getString("saveSuccess")
              );
              this.getFloors();
            } else
              this._toastrService.showToast("danger", getString("saveError"));
          }
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onDeleteFloorConfirm(event: any): void {
    var model: IFloor = { Id: event.data.Id };
    this._subs.push(
      this._floorsService.delete(model).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getFloors();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onEditFloorConfirm(event: any): void {
    var model: IFloor = {
      Id: event.newData.Id,
      Name: event.newData.Name,
    };

    this._subs.push(
      this._floorsService.update(model).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getFloors();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onCreateRoomConfirm(event: any): void {
    var model: IRoom = {
      Name: event.newData.Name,
      Capacity: event.newData.Capacity,
      FloorId: event.newData.FloorId,
      Width: event.newData.Width,
      Height: event.newData.Height,
      Top: event.newData.Top,
      Left: event.newData.Left,
    };

    this._subs.push(
      this._roomsService.add(model).subscribe(
        (data) => {
          if (data) {
            if (data.RoomId) {
              this._toastrService.showToast(
                "success",
                getString("saveSuccess")
              );
              this.getRooms();
              this.refreshFloorRooms();
            } else
              this._toastrService.showToast("danger", getString("saveError"));
          }
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onDeleteRoomConfirm(event: any): void {
    var model: IRoom = { Id: event.data.Id };

    this._subs.push(
      this._roomsService.delete(model).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getRooms();
          this.refreshFloorRooms();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onEditRoomConfirm(event: any): void {
    var model: IRoom = {
      Id: event.newData.Id,
      Name: event.newData.Name,
      Capacity: event.newData.Capacity,
      FloorId: event.newData.FloorId,
      Width: event.newData.Width,
      Height: event.newData.Height,
      Top: event.newData.Top,
      Left: event.newData.Left,
    };

    this._subs.push(
      this._roomsService.update(model).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getRooms();
          this.refreshFloorRooms();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public onTagClick(floor: any, firstLoad: boolean = false): void {
    if (!firstLoad) this.floorsData.forEach((x) => (x.selected = false));
    floor.selected = true;
    this._subs.push(
      this._roomsService.getRoomsForFloor(floor.Id).subscribe((data) => {
        this.selectedFloorRooms = data;
      })
    );
  }

  private refreshTabData(tab: string): void {
    switch (tab) {
      case this.floorsTitle:
        this.getFloors();
        break;
      case this.roomsTitle:
        this.getRooms();
        break;
      default:
        this.getFloors();
        break;
    }
  }

  private getFloors(): void {
    this.floorsLoading = true;
    this._subs.push(
      this._floorsService.getData().subscribe(
        (data) => {
          this.floorsData = data;
          if (this.floorsData.length > 0)
            this.onTagClick(this.floorsData[0], true);
          this.floorsLoading = false;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private refreshFloorRooms(): void {
    var selectedFloor = this.floorsData.find((x) => x.selected);
    if (selectedFloor) {
      this._subs.push(
        this._roomsService
          .getRoomsForFloor(selectedFloor.Id)
          .subscribe((data) => {
            this.selectedFloorRooms = data;
          })
      );
    }
  }

  private getRooms(): void {
    this.roomsLoading = true;
    this._subs.push(
      this._roomsService.getData().subscribe(
        (data) => {
          console.log(data);
          this.roomsData = data;
          this.roomsLoading = false;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }
}
