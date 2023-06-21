import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { SelectEditor, SmartTableColumn, TABLE_MODE, TextboxEditor, SelectFilter, LookupType } from 'shared-components';
import { FloorsService, IFloor } from '../../services/rest/floors.service';
import { IRoom, RoomsService } from '../../services/rest/rooms.service';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';
import { ExportDocSettings } from 'shared-components/lib/models/smart-table.model';

@Component({
  selector: 'sample-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit, OnDestroy {

  public floorsTitle: string = getString("floors");
  public roomsTitle: string = getString("rooms");
  public noRoomsTitle: string = getString("noRoomsForSelectedFloor");
  public floorsData: any[] = [];
  public roomsData: any[] = [];
  public tableMode: TABLE_MODE = TABLE_MODE.POPUP;
  public floorsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString("id")).Property("Id").Addable(false).Editable(false),
    new SmartTableColumn(getString("name")).Property("Name").SpecialEditor(new TextboxEditor().Required(true))
  ];
  public roomsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString("id")).Property("Id").Addable(false).Editable(false).SpecialEditor(new TextboxEditor().WidthClass("col-md-2")),
    new SmartTableColumn(getString("name")).Property("Name").SpecialEditor(new TextboxEditor().WidthClass("col-md-10").Required(true)),
    new SmartTableColumn(getString("capacity")).Property("Capacity").SpecialEditor(new TextboxEditor().Min(0).Max(10).TextboxType("number").WidthClass("col-md-4").Required(true)),
    new SmartTableColumn(getString("floor")).Property("FloorId").SpecialType(new LookupType().NameAttribute("FloorName"))
      .SpecialEditor(new SelectEditor("Name", "Id").ReturnObjectAsValue(false).ServerSource(true).ServerEndpoint(this.floorsService.apiRoute).WidthClass("col-md-8").Required(true))
      .SpecialFilter(new SelectFilter("Id", "Name").ServerSource(true).ServerEndpoint(this.floorsService.apiRoute))
  ];

  public floorsLoading: boolean = false;
  public roomsLoading: boolean = false;
  public selectedFloorRooms: any[] = [];

  public exportSettingsFloors: ExportDocSettings = {
    title: getString('floors'),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: 'floors',
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  public exportSettingsRooms: ExportDocSettings = {
    title: getString('rooms'),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: 'rooms',
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  private subscriptions: Subscription[] = [];

  constructor(private floorsService: FloorsService, private roomsService: RoomsService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.refreshTabData(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public onTabChange(event: any): void {
    this.refreshTabData(event.tabTitle);
  }

  public onCreateFloorConfirm(event: any): void {
    var model: IFloor = {
      Name: event.newData.Name
    };

    this.subscriptions.push(this.floorsService.add(model).subscribe(data => {
      if (data) {
        if (data.FloorId) {
          this.toastrService.showToast("success", getString("saveSuccess"), "");
          this.getFloors();
        } else {
          this.toastrService.showToast("danger", getString("saveError"), "");
        }
      }
    }, err => {
      console.error(err);
      this.toastrService.showToast("danger", getString("saveError"), "");
    }));
  }

  public onDeleteFloorConfirm(event: any): void {
    var model: IFloor = {
      Id: event.data.Id
    };

    this.subscriptions.push(this.floorsService.delete(model).subscribe(data => {
      this.toastrService.showToast("success", getString("saveSuccess"), "");
      this.getFloors();
    }, err => {
      console.error(err);
      this.toastrService.showToast("danger", getString("saveError"), "");
    }));
  }

  public onEditFloorConfirm(event: any): void {
    var model: IFloor = {
      Id: event.newData.Id,
      Name: event.newData.Name
    };

    this.subscriptions.push(this.floorsService.update(model).subscribe(data => {
      this.toastrService.showToast("success", getString("saveSuccess"), "");
      this.getFloors();
    },
      err => {
        console.error(err);
        this.toastrService.showToast("danger", getString("saveError"), "");
      }
    ));
  }

  public onCreateRoomConfirm(event: any): void {
    var model: IRoom = {
      Name: event.newData.Name,
      Capacity: event.newData.Capacity,
      FloorId: event.newData.FloorId
    };

    this.subscriptions.push(this.roomsService.add(model).subscribe(data => {
      if (data) {
        if (data.RoomId) {
          this.toastrService.showToast("success", getString("saveSuccess"), "");
          this.getRooms();
          this.refreshFloorRooms();
        } else {
          this.toastrService.showToast("danger", getString("saveError"), "");
        }
      }
    }, err => {
      console.error(err);
      this.toastrService.showToast("danger", getString("saveError"), "");
    }));
  }

  public onDeleteRoomConfirm(event: any): void {
    var model: IRoom = {
      Id: event.data.Id
    };

    this.subscriptions.push(this.roomsService.delete(model).subscribe(data => {
      this.toastrService.showToast("success", getString("saveSuccess"), "");
      this.getRooms();
      this.refreshFloorRooms();
    }, err => {
      console.error(err);
      this.toastrService.showToast("danger", getString("saveError"), "");
    }));
  }

  public onEditRoomConfirm(event: any): void {
    var model: IRoom = {
      Id: event.newData.Id,
      Name: event.newData.Name,
      Capacity: event.newData.Capacity,
      FloorId: event.newData.FloorId
    };

    this.subscriptions.push(this.roomsService.update(model).subscribe(data => {
      this.toastrService.showToast("success", getString("saveSuccess"), "");
      this.getRooms();
      this.refreshFloorRooms();
    },
      err => {
        console.error(err);
        this.toastrService.showToast("danger", getString("saveError"), "");
      }
    ));
  }

  public onTagClick(floor: any, firstLoad: boolean = false) {
    if (!firstLoad) this.floorsData.forEach(x => x.selected = false);
    floor.selected = true;
    this.subscriptions.push(this.roomsService.getRoomsForFloor(floor.Id).subscribe(data => {
      this.selectedFloorRooms = data;
    }));
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
    this.subscriptions.push(this.floorsService.getData().subscribe(data => {
      this.floorsData = data;
      if (this.floorsData.length > 0) this.onTagClick(this.floorsData[0], true);
      this.floorsLoading = false;
    }, err => {
      console.error(err);
    }));
  }

  private refreshFloorRooms(): void {
    var selectedFloor = this.floorsData.find(x => x.selected);
    if (selectedFloor) {
      this.subscriptions.push(this.roomsService.getRoomsForFloor(selectedFloor.Id).subscribe(data => {
        this.selectedFloorRooms = data;
      }));
    }
  }

  private getRooms(): void {
    this.roomsLoading = true;
    this.subscriptions.push(this.roomsService.getData().subscribe(data => {
      this.roomsData = data;
      this.roomsLoading = false;
    }, err => {
      console.error(err);
    }));
  }
}
