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
} from "shared-components";
import { getString } from "../../resources/strings";
import { FurnitureStatusesService } from "../../services/rest/furniture-statuses.service";
import { RoomsService } from "../../services/rest/rooms.service";

@Component({
  selector: "sample-furniture",
  templateUrl: "./furniture.component.html",
  styleUrls: ["./furniture.component.scss"],
})
export class FurnitureComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public statuses: any[] = [];
  public furniture: any[] = [];
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
      .Editor(new GridDateboxEditor().Show(false)),
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
  ];

  constructor(
    private _furnitureService: FurnitureService,
    private _furnitureStatusService: FurnitureStatusesService,
    private _roomsService: RoomsService
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
}
