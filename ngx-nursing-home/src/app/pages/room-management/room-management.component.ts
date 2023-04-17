import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { SelectEditor, SmartTableColumn, TABLE_MODE, TextboxEditor, SelectFilter, LookupType } from 'shared-components';
import { FloorsService, IFloor } from '../../services/rest/floors.service';
import { IRoom, RoomsService } from '../../services/rest/rooms.service';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'sample-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit, OnDestroy {

  public floorsTitle: string = getString("floors");
  public roomsTitle: string = getString("rooms");
  public floorsData: any[] = [];
  public roomsData: any[] = [];
  public tableMode: TABLE_MODE = TABLE_MODE.POPUP;
  public floorsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString("id")).Property("Id").Addable(false).Editable(false),
    new SmartTableColumn(getString("name")).Property("Name")
  ];
  public roomsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString("id")).Property("Id").Addable(false).Editable(false).SpecialEditor(new TextboxEditor().WidthClass("col-md-2")),
    new SmartTableColumn(getString("name")).Property("Name").SpecialEditor(new TextboxEditor().WidthClass("col-md-10")),
    new SmartTableColumn(getString("capacity")).Property("Capacity").SpecialEditor(new TextboxEditor().Min(0).Max(10).TextboxType("number").WidthClass("col-md-4")),
    new SmartTableColumn(getString("floor")).Property("FloorId").SpecialType(new LookupType().NameAttribute("FloorName"))
      .SpecialEditor(new SelectEditor("Name", "Id").ReturnObjectAsValue(false).ServerSource(true).ServerEndpoint(this.floorsService.apiRoute).WidthClass("col-md-8"))
      .SpecialFilter(new SelectFilter("Id", "Name").ServerSource(true).ServerEndpoint(this.floorsService.apiRoute))
  ];

  public floorsLoading: boolean = false;
  public roomsLoading: boolean = false;

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
    },
      err => {
        console.error(err);
        this.toastrService.showToast("danger", getString("saveError"), "");
      }
    ));
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
      this.floorsLoading = false;
    }, err => {
      console.error(err);
    }));
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
