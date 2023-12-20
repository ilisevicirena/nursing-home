import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import { Subscription } from "rxjs";
import {
  IPerson,
  PersonsService,
  getIPersonFromJSON,
} from "../../services/rest/persons.service";
import { getString } from "../../resources/strings";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { RoomsService } from "../../services/rest/rooms.service";
import { NgForm } from "@angular/forms";
import { ContactsService } from "../../services/rest/contacts.service";
import { GendersService } from "../../services/rest/genders.service";
import { Router } from "@angular/router";
@Component({
  selector: "sample-person-popup-window",
  templateUrl: "./person-popup-window.component.html",
  styleUrls: ["./person-popup-window.component.scss"],
})
export class PersonPopupWindowComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    private _ref: NbWindowRef,
    private _personsService: PersonsService,
    private _dialogService: DialogService,
    private _toastrService: ToastrService,
    private _roomsService: RoomsService,
    private _contactsService: ContactsService,
    private _gendersService: GendersService,
    private _router: Router
  ) {}

  public getString = getString;
  public personId: number;
  public person: any;
  public rooms: any[] = [];
  public contacts: any[] = [];
  public genders: any[] = [];
  public newPersonData: IPerson = {
    Id: 0,
    FirstName: "",
    LastName: "",
    JMBG: "",
    Active: false,
    CreationDate: undefined,
    StartDate: undefined,
    EndDate: undefined,
    BirthDate: undefined,
  };

  private _subs: Subscription[] = [];
  private _changes: boolean = false;

  @ViewChild("headerTemplate") headerTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.getPersonData();
    this.getRoomsData();
    this.getContactsForPerson();
    this.getGenders();
  }

  ngAfterViewInit(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.add("h-100");
      window.parentElement.classList.add("w-100");
      window.parentElement.parentElement.classList.add("h-100");
      window.parentElement.parentElement.style.width = "75%";
      const cdkOverlayContainer =
        window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0)
        cdkOverlayContainer.children[0].classList.add("d-block");
    }

    this._ref.config.titleTemplate = this.headerTemplate;
  }

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      const cdkOverlayContainer =
        window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0)
        cdkOverlayContainer.children[0].classList.remove("d-block");
    }

    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(): void {
    this._ref.close(this._changes);
  }

  private getPersonData(): void {
    this._subs.push(
      this._personsService.getPersonDetails(this.personId).subscribe((data) => {
        if (data.length > 0) {
          this.newPersonData = getIPersonFromJSON(data[0]);
          this.person = getIPersonFromJSON(data[0]);
        }
      })
    );
  }

  private getRoomsData(): void {
    this._subs.push(
      this._roomsService.getData(true).subscribe(
        (data) => {
          if (data.length > 0) this.rooms = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public cancelSave(): void {
    this.newPersonData = getIPersonFromJSON(
      JSON.parse(JSON.stringify(this.person))
    );
  }

  public async deactivatePerson(): Promise<void> {
    var endDate: string = new Date().toLocaleDateString();
    if (this.newPersonData.EndDate != undefined)
      endDate = this.newPersonData.EndDate.toLocaleDateString();
    const rezDialog = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("questionDeactivatePerson") + endDate
    );

    if (rezDialog) {
      this._subs.push(
        this._personsService
          .deactivatePerson(this.personId, this.newPersonData.EndDate ?? null)
          .subscribe(
            (data) => {
              this._toastrService.showToast(
                "success",
                getString("saveSuccess"),
                ""
              );
              this._changes = true;
              this.getPersonData();
            },
            (err) => {
              this._toastrService.showToast(
                "danger",
                getString("saveError"),
                ""
              );
              console.error(err);
            }
          )
      );
    }
  }

  public onRoomSelectedChange(event: any): void {
    var obj = this.rooms.find((x) => x.Id == event);

    if (obj) {
      this.newPersonData.FloorId = obj.FloorId;
      this.newPersonData.FloorName = obj.FloorName;
    }
  }

  public saveChanges(form: NgForm): void {
    this._subs.push(
      this._personsService.update(this.newPersonData).subscribe(
        () => {
          this._changes = true;
          form.form.markAsPristine();
          if (this.newPersonData.RoomId != this.person.RoomId) {
            this._subs.push(
              this._personsService
                .changeRoom(this.personId, this.newPersonData.RoomId)
                .subscribe(
                  () => {
                    this.getPersonData();
                    this._toastrService.showToast(
                      "success",
                      getString("saveSuccess"),
                      ""
                    );
                  },
                  (err) => {
                    console.error(err);
                    this._toastrService.showToast(
                      "danger",
                      getString("saveError"),
                      ""
                    );
                  }
                )
            );
          } else {
            this.getPersonData();
            this._toastrService.showToast(
              "success",
              getString("saveSuccess"),
              ""
            );
          }
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"), "");
        }
      )
    );
  }

  private getContactsForPerson(): void {
    this._subs.push(
      this._contactsService.getDataForPerson(this.personId).subscribe(
        (data) => {
          if (data.length > 0) this.contacts = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private getGenders(): void {
    this._subs.push(
      this._gendersService.getData().subscribe(
        (data) => {
          this.genders = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public goToExternalRoomManagement(): void {
    this._ref.close(false);
    this._router.navigateByUrl("/pages/accomodation-management");
  }

  public goToAdvancedEdit(): void {
    this._ref.close(false);
    this._router.navigate(["pages/profile", this.personId]);
  }
}
