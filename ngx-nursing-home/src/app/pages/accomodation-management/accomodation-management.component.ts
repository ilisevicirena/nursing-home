import { Component, OnDestroy, OnInit } from "@angular/core";
import { RoomsService } from "../../services/rest/rooms.service";
import { Subscription } from "rxjs";
import { CdkDrag, CdkDragDrop, CdkDropList } from "@angular/cdk/drag-drop";
import { PersonsService } from "../../services/rest/persons.service";
import { getString } from "../../resources/strings";
import { GeneralSettingsService } from "../../services/rest/general-settings.service";
import { ToastrService } from "../../services/toastr.service";
import { AuthService, UserRole } from "../../services/auth.service";

@Component({
    selector: "sample-accomodation-management",
    templateUrl: "./accomodation-management.component.html",
    styleUrls: ["./accomodation-management.component.scss"],
    standalone: false
})
export class AccomodationManagementComponent implements OnInit, OnDestroy {
  constructor(
    private _roomsService: RoomsService,
    private _personsService: PersonsService,
    private _generalSettingsService: GeneralSettingsService,
    private _toastrService: ToastrService,
    private _authService: AuthService
  ) {}

  // only admins can rearrange residents; other roles (e.g. nurse) view only
  public get canEdit(): boolean {
    return this._authService.checkUserHasRole(UserRole.ADMIN);
  }

  public noRoomPersons: any[] = [];
  public mainSource: any[] = [];
  public getString = getString;
  public showSidepanel: boolean = true;
  public allowDifferentGenders: boolean = false;

  public viewMode: "plan" | "list" = "plan";
  public searchTerm: string = "";
  public selectedPerson: any = null; // click-to-assign target
  public draggingPerson: any = null; // currently dragged resident

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
              this.recountRoom(room);
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

  // ============================ drag & drop ============================
  public dragStarted(person: any): void {
    this.draggingPerson = person;
    this.selectedPerson = null;
  }
  public dragEnded(): void {
    this.draggingPerson = null;
  }

  public drop(event: CdkDragDrop<any[]>): void {
    this.draggingPerson = null;
    if (event.previousContainer === event.container) return;

    const person = event.item.data;
    const targetIsNoRoom = event.container.id === "no-room";
    const targetRoomId = targetIsNoRoom ? null : event.container.data[0]?.Id;

    if (!targetIsNoRoom) {
      const room = this.findRoom(targetRoomId);
      if (room && !this.canAccept(room, person)) {
        this.rejectToast(room, person);
        return; // predicate normally blocks this; guard anyway
      }
    }
    this.movePerson(person, targetRoomId);
  }

  // enter-predicate (rooms only). Bug fix: capacity AND gender must both hold.
  public checkCanDropInList = (item: CdkDrag, dropList: CdkDropList): boolean => {
    const room = dropList.data[0];
    if (!room || room.People === undefined) return true; // not a room list
    const person = item.data;
    if (person.RoomId === room.Id) return false;

    let canDrop = room.Capacity > 0 && room.FreeSpace > 0;
    if (!room.AllowDifferentGenders) {
      const genderOk =
        room.RoomGenderId == null || room.RoomGenderId == person.GenderId;
      canDrop = canDrop && genderOk;
    }
    return canDrop;
  };

  public getConnectedTo(): string[] {
    var arr = [];
    if (this._originalSource) {
      arr = this._originalSource.Rooms.map((x) => "drop-room-" + x.Id);
    }
    arr.push("no-room");
    return arr;
  }

  // ============================ click-to-assign ============================
  public get highlightPerson(): any {
    return this.draggingPerson || this.selectedPerson;
  }

  public selectPerson(person: any, evt?: Event): void {
    if (evt) evt.stopPropagation();
    this.selectedPerson =
      this.selectedPerson && this.selectedPerson.PersonId === person.PersonId
        ? null
        : person;
  }

  public isSelected(person: any): boolean {
    return (
      this.selectedPerson && this.selectedPerson.PersonId === person.PersonId
    );
  }

  public clearSelection(): void {
    this.selectedPerson = null;
  }

  public assignSelectedToRoom(room: any): void {
    if (!this.selectedPerson) return;
    if (!this.canAccept(room, this.selectedPerson)) {
      this.rejectToast(room, this.selectedPerson);
      return;
    }
    this.movePerson(this.selectedPerson, room.Id);
    this.selectedPerson = null;
  }

  public assignSelectedToNoRoom(): void {
    if (!this.selectedPerson) return;
    if (this.selectedPerson.RoomId != null) {
      this.movePerson(this.selectedPerson, null);
    }
    this.selectedPerson = null;
  }

  // ============================ move (optimistic + rollback) ============================
  private movePerson(person: any, roomId: number | null): void {
    if (person.RoomId === roomId) return;

    this.removePersonLocally(person);
    person.RoomId = roomId;
    if (roomId == null) {
      this.noRoomPersons.push(person);
    } else {
      const room = this.findRoom(roomId);
      if (room) room.People.push(person);
    }
    this.recountAll();

    const obs =
      roomId == null
        ? this._personsService.deactivateRoom(person.PersonId)
        : this._personsService.changeRoom(person.PersonId, roomId);

    this._subs.push(
      obs.subscribe(
        () => {},
        () => {
          this._toastrService.showToast("danger", getString("saveError"), "");
          this.getAccomodationManagement(); // rollback to server state
        }
      )
    );
  }

  private removePersonLocally(person: any): void {
    this.noRoomPersons = this.noRoomPersons.filter(
      (p) => p.PersonId !== person.PersonId
    );
    this.mainSource.forEach((floor) =>
      floor.Rooms.forEach((room: any) => {
        room.People = room.People.filter(
          (p: any) => p.PersonId !== person.PersonId
        );
      })
    );
  }

  private findRoom(roomId: number): any {
    return this.allRooms().find((r) => r.Id === roomId);
  }

  private allRooms(): any[] {
    return this.mainSource.reduce(
      (acc, floor) => acc.concat(floor.Rooms || []),
      []
    );
  }

  private recountRoom(room: any): void {
    room.TakenSpace = room.People ? room.People.length : 0;
    room.FreeSpace = (room.Capacity || 0) - room.TakenSpace;
  }
  private recountAll(): void {
    this.allRooms().forEach((r) => this.recountRoom(r));
  }

  // ============================ acceptance + visual state ============================
  public canAccept(room: any, person: any): boolean {
    if (!person || !room) return false;
    if (person.RoomId === room.Id) return false;
    let ok = room.Capacity > 0 && room.FreeSpace > 0;
    if (!this.allowDifferentGenders) {
      const genderOk =
        room.RoomGenderId == null || room.RoomGenderId == person.GenderId;
      ok = ok && genderOk;
    }
    return ok;
  }

  private rejectToast(room: any, person: any): void {
    const reason =
      !(room.Capacity > 0 && room.FreeSpace > 0)
        ? "the room is full"
        : "gender restriction (" + this.genderLabel(room).toLowerCase() + " room)";
    this._toastrService.showToast(
      "warning",
      "Cannot assign",
      person.FirstName + " " + person.LastName + ": " + reason
    );
  }

  public roomState(room: any): string {
    if (!room.Capacity || room.Capacity <= 0) return "unavailable";
    if ((room.TakenSpace || 0) <= 0) return "empty";
    if ((room.TakenSpace || 0) >= room.Capacity) return "full";
    return "partial";
  }
  public roomStatus(room: any): string {
    switch (this.roomState(room)) {
      case "empty":
        return "success";
      case "partial":
        return "warning";
      case "full":
        return "danger";
      default:
        return "basic";
    }
  }

  public bedArray(room: any): boolean[] {
    const cap = room.Capacity || 0;
    const taken = Math.min(room.TakenSpace || 0, cap);
    const beds: boolean[] = [];
    for (let i = 0; i < cap; i++) beds.push(i < taken);
    return beds;
  }

  public genderLabel(room: any): string {
    return room.RoomGenderId === 1
      ? "Male"
      : room.RoomGenderId === 2
      ? "Female"
      : "Mixed";
  }
  public genderIcon(room: any): string {
    return room.RoomGenderId === 1
      ? "fas fa-male"
      : room.RoomGenderId === 2
      ? "fas fa-female"
      : "fas fa-venus-mars";
  }

  // ============================ KPIs ============================
  public get totalBeds(): number {
    return this.allRooms().reduce((s, r) => s + (r.Capacity || 0), 0);
  }
  public get occupiedBeds(): number {
    return this.allRooms().reduce((s, r) => s + (r.TakenSpace || 0), 0);
  }
  public get freeBeds(): number {
    return this.totalBeds - this.occupiedBeds;
  }
  public get occupancyPct(): number {
    return this.totalBeds
      ? Math.round((this.occupiedBeds / this.totalBeds) * 100)
      : 0;
  }
  public floorStats(floor: any): { cap: number; occ: number; pct: number } {
    const rooms = floor.Rooms || [];
    const cap = rooms.reduce((s: number, r: any) => s + (r.Capacity || 0), 0);
    const occ = rooms.reduce((s: number, r: any) => s + (r.TakenSpace || 0), 0);
    return { cap, occ, pct: cap ? Math.round((occ / cap) * 100) : 0 };
  }

  // ============================ search ============================
  public get filteredNoRoom(): any[] {
    const t = this.searchTerm.trim().toLowerCase();
    if (!t) return this.noRoomPersons;
    return this.noRoomPersons.filter((p) =>
      (p.FirstName + " " + p.LastName).toLowerCase().includes(t)
    );
  }

  // ============================ misc ============================
  public toggleSidepanel(): void {
    this.showSidepanel = !this.showSidepanel;
  }

  public onViewChange(values: string[]): void {
    if (values && values.length > 0) this.viewMode = values[0] as "plan" | "list";
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
