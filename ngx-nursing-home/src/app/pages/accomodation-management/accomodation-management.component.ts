import { Component, OnDestroy, OnInit } from "@angular/core";
import { RoomsService } from "../../services/rest/rooms.service";
import { Subscription } from "rxjs";
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { PersonsService } from "../../services/rest/persons.service";
import { getString } from "../../resources/strings";
import { GeneralSettingsService } from "../../services/rest/general-settings.service";

@Component({
  selector: "sample-accomodation-management",
  templateUrl: "./accomodation-management.component.html",
  styleUrls: ["./accomodation-management.component.scss"],
})
export class AccomodationManagementComponent implements OnInit, OnDestroy {
  constructor(
    private _roomsService: RoomsService,
    private _personsService: PersonsService,
    private _generalSettingsService: GeneralSettingsService
  ) {}

  public noRoomPersons: any[] = [];
  public mainSource: any[] = [];
  public getString = getString;
  public showSidepanel: boolean = true;
  public allowDifferentGenders: boolean = false;

  private _subs: Subscription[] = [];
  private _originalSource: any;

  ngOnInit(): void {
    this.getAccomodationManagement();
    this.getGenderRestriction();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element: Subscription) => {
      element.unsubscribe();
    });
  }

  private getAccomodationManagement(): void {
    this.mainSource = [];

    this._subs.push(
      this._roomsService.getAccomodationManagement().subscribe((data: any) => {
        if (data) {
          this._originalSource = data;
          this.noRoomPersons = data.Persons.filter((x: any) => !x.RoomId);

          data.Floors.forEach((floor: any) => {
            var newFloor = floor;
            newFloor.Rooms = data.Rooms.filter((x) => x.FloorId == floor.Id);
            newFloor.Rooms.forEach((room) => {
              room.People = data.Persons.filter((x) => x.RoomId == room.Id);
              room.AllowDifferentGenders = this.allowDifferentGenders;
            });

            this.mainSource.push(newFloor);
          });
        }
      })
    );
  }

  private getGenderRestriction(): void {
    this._subs.push(
      this._generalSettingsService
        .getGeneralSetting("allowDifferentGenderPersonsInRoom")
        .subscribe((data: any) => {
          if (data) {
            this.allowDifferentGenders = parseInt(data.Value) == 1;
            this.mainSource.forEach((floor) => {
              floor.Rooms.map(
                (r) => (r.AllowDifferentGenders = this.allowDifferentGenders)
              );
            });
          }
        })
    );
  }

  public drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer != event.container) {
      var personId = event.item.data.PersonId;
      var roomId = event.container.data[0]?.Id;

      if (personId && roomId) {
        // just save and reload
        this._subs.push(
          this._personsService.changeRoom(personId, roomId).subscribe(() => {
            this.getAccomodationManagement();
          })
        );
      } else if (personId) {
        // just save and reload
        this._subs.push(
          this._personsService.deactivateRoom(personId).subscribe(() => {
            this.getAccomodationManagement();
          })
        );
      }
    }
  }

  public checkCanDropInList(item: CdkDrag, dropList: CdkDropList): boolean {
    var dropContainer = dropList.data[0];
    var canDrop: boolean = false;
    //check room capacity higher then 0, room has free space and person gender is same as other persons in room
    if (dropContainer.Capacity > 0 && dropContainer.FreeSpace > 0)
      canDrop = true;

    if (!dropContainer.AllowDifferentGenders) {
      canDrop =
        dropContainer.RoomGenderId == null ||
        dropContainer.RoomGenderId == item.data.GenderId;
    }

    return canDrop;
  }

  public getConnectedTo(): string[] {
    var arr = [];

    if (this._originalSource) {
      arr = this._originalSource.Rooms.map((x) => {
        return "drop-room-" + x.Id;
      });
    }

    arr.push("no-room");

    return arr;
  }

  public toggleSidepanel(): void {
    this.showSidepanel = !this.showSidepanel;
  }

  public allowDifferenGendersChange() {
    this._subs.push(
      this._generalSettingsService
        .updateGeneralSetting(
          "allowDifferentGenderPersonsInRoom",
          this.allowDifferentGenders ? "1" : "0"
        )
        .subscribe(() => {
          this.getGenderRestriction();
        })
    );
  }
}
