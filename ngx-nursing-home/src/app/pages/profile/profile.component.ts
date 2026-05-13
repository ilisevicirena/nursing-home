import { Component, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  PersonsService,
  getIPersonFromJSON,
} from "../../services/rest/persons.service";
import { getString } from "../../resources/strings";
import { NgForm } from "@angular/forms";
import {
  GridCheckboxColumn,
  GridColumn,
  GridDateboxFilter,
  GridDateColumn,
  IGridExportDocumentSettings,
} from "shared-components";
import { DialogService } from "../../shared/dialog/dialog.service";
import { RoomsService } from "../../services/rest/rooms.service";
import { AccommodationPdfRequestService } from "../../services/rest/accommodation-pdf-request.service";
import { GeneralSettingsService } from "../../services/rest/general-settings.service";
import { ToastrService } from "../../services/toastr.service";
import { AuthService, UserRole } from "../../services/auth.service";

@Component({
  selector: "sample-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _personsService: PersonsService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService,
    private _roomsService: RoomsService,
    private _router: Router,
    private _requestGeneratorService: AccommodationPdfRequestService,
    private _generalSettingsService: GeneralSettingsService,
    private _authService: AuthService,
  ) {}

  private _subs: Subscription[] = [];
  private _allowDifferentGenders: boolean = false;

  public personId: number = 0;
  public getString = getString;
  public activeView: string = "basicData";
  public person: any = {};
  public newPersonData: any = {};
  public loading: boolean = false;
  public showSidepanel: boolean = true;
  public genders: any[] = [];
  public alertIsOpen: boolean = true;
  public passedTime: any = {};
  public selectedRoom: any = { FloorName: "", IsValid: true };
  public rooms: any[] = [];
  public allRooms: any[] = [];
  public personHistory: any[] = [];
  public roomHistory: any[] = [];
  public gridSelectedItem: [] = [];
  public years: number = 0;
  public spentTime: number = 0;

  public roomHistoryColumns: GridColumn[] = [
    new GridColumn().Title(getString("id")).DataField("RoomId").Filter(false),
    new GridColumn()
      .Title(getString("room"))
      .DataField("RoomName")
      .Filter(false),
    new GridColumn()
      .Title(getString("floor"))
      .DataField("FloorName")
      .Filter(false),
    new GridColumn()
      .Title(getString("activeRoom"))
      .DataField("Active")
      .Filter(false)
      .Type(new GridCheckboxColumn()),
    new GridColumn()
      .Title(getString("roomStartDate"))
      .DataField("StartDate")
      .Filter(false)
      .Type(new GridDateColumn().Format("dd.MM.yyyy.")),
    new GridColumn()
      .Title(getString("roomEndDate"))
      .DataField("EndDate")
      .Filter(false)
      .Type(new GridDateColumn().Format("dd.MM.yyyy.")),
  ];

  public options: any[] = [
    { option: "basicData", string: "basicData", active: true },
    { option: "categories", string: "categories", active: false },
    { option: "contacts", string: "contacts", active: false },
    { option: "medical", string: "medicalProfile", active: false },
    { option: "stayData", string: "stayData", active: false },
    { option: "dormatoryData", string: "dormatoryData", active: false },
    { option: "documents", string: "documents", active: false },
    { option: "notes", string: "notes", active: false },
  ];

  public roomsColumns: GridColumn[] = [
    new GridColumn().Title(getString("room")).DataField("Name"),
    new GridColumn().Title(getString("floor")).DataField("FloorName"),
    new GridColumn().Title(getString("capacity")).DataField("Capacity"),
    new GridColumn().Title(getString("freeSpace")).DataField("FreeSpace"),
    new GridColumn().Title(getString("gender")).DataField("GenderName"),
  ];

  public historyColumns: GridColumn[] = [
    new GridColumn().Title(getString("id")).DataField("Id"),
    new GridColumn()
      .Title(getString("transactionDate"))
      .DataField("CreationDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy. HH:mm"))
      .Filter(new GridDateboxFilter().Format("dd.MM.yyyy")),
    new GridColumn().Title(getString("firstName")).DataField("FirstName"),
    new GridColumn().Title(getString("lastName")).DataField("LastName"),
    new GridColumn().Title(getString("jmbg")).DataField("Jmbg"),
    new GridColumn().Title(getString("logType")).DataField("LogType"),
    new GridColumn().Title(getString("logType")).DataField("LogTypePretty"),
  ];

  public exportHistorySettings: IGridExportDocumentSettings = {
    title: getString("history"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "history",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  public roomHistoryExportSettings: IGridExportDocumentSettings = {
    title: getString("roomHistory"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "room-history",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  ngOnInit(): void {
    this.loading = true;
    this._subs.push(
      this._activatedRoute.paramMap.subscribe((params) => {
        this.personId = params.get("id") as any;
        this.getPersonDetails(this.personId);
      }),
    );

    if (this.checkUserHasPermission()) {
      this.options.push(
        {
          option: "services",
          string: "services",
          active: false,
        },
        { option: "calculation", string: "personCalculation", active: false },
      );
    }
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public toggleSidepanel(): void {
    this.showSidepanel = !this.showSidepanel;
  }

  public toggleView(view: any): void {
    this.options.find((x) => x.option == this.activeView)!.active = false;
    view.active = true;
    this.activeView = view.option;

    switch (this.activeView) {
      case "dormatoryData":
        this.getAvaliableRooms();
        this.getAllRooms();
        this.getRoomHistory();
        this.getGenderRestriction();
        break;
    }
  }

  // ------------------------------------------------- BASIC DATA ---------------------------------------------------------------------

  public getHistory(): void {
    this._subs.push(
      this._personsService.getHistory(this.personId).subscribe(
        (data) => {
          this.personHistory = data;
        },
        (err) => {
          console.error(err);
        },
      ),
    );
  }

  public saveBasicData(form: NgForm): void {
    this._subs.push(
      this._personsService.updateDetailed(this.newPersonData).subscribe(
        () => {
          this.getPersonDetails(this.personId);
          form.form.markAsPristine();
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"), "");
        },
      ),
    );
  }

  public cancelEditBasicData(form: NgForm): void {
    this.newPersonData = getIPersonFromJSON(
      JSON.parse(JSON.stringify(this.person)),
    );
    form.form.markAsPristine();
  }

  private getPersonDetails(personId: number): void {
    this._subs.push(
      this._personsService.getPersonDetailed(personId).subscribe((data) => {
        if (data.length > 0) {
          this.person = getIPersonFromJSON(data[0]);
          this.years = this.calculateAge(this.person.BirthDate);
          this.spentTime = this.calculateMonthsFrom(
            this.person.StartDate,
            this.person.Active ? new Date() : this.person.EndDate,
          );
          this.newPersonData = getIPersonFromJSON(data[0]);
          this.passedTime = this.calculatePassedTime();
          this.getHistory();
        }

        this.loading = false;
      }),
    );
  }

  //--------------------------------------------------- STAY DATA --------------------------------------------------

  public async deactivatePerson(): Promise<void> {
    var endDate: string = new Date().toLocaleDateString();
    if (this.person.EndDate != undefined)
      endDate = this.person.EndDate.toLocaleDateString();
    const rezDialog = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("questionDeactivatePerson") + endDate,
    );

    if (rezDialog) {
      this._subs.push(
        this._personsService
          .deactivatePerson(this.personId, this.person.EndDate ?? null)
          .subscribe(
            () => {
              this._toastrService.showToast(
                "success",
                getString("saveSuccess"),
                "",
              );
              this.getPersonDetails(this.personId);
            },
            (err) => {
              this._toastrService.showToast(
                "danger",
                getString("saveError"),
                "",
              );
              console.error(err);
            },
          ),
      );
    }
  }

  public calculatePassedTime(): any {
    var today: Date = this.person.Active ? new Date() : this.person.EndDate;
    var date: Date = this.person.StartDate;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var years, months, days;
    months = month - mm;

    if (day < dd) months = months - 1;
    years = year - yy;

    if (month * 100 + day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }

    days = Math.floor(
      (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
        (24 * 60 * 60 * 1000),
    );

    return { years: years, months: months, days: days };
  }

  //------------------------------------------ DORMATORY DATA ------------------------------------------------------------

  private getAvaliableRooms(): void {
    this._subs.push(
      this._roomsService.getAvaliableRooms().subscribe((data) => {
        this.rooms = data;
      }),
    );
  }

  private getAllRooms(): void {
    this._subs.push(
      this._roomsService.getData().subscribe((data) => {
        this.allRooms = data;
      }),
    );
  }

  private getGenderRestriction(): void {
    this._subs.push(
      this._generalSettingsService
        .getGeneralSetting("allowDifferentGenderPersonsInRoom")
        .subscribe((data: any) => {
          if (data) {
            this._allowDifferentGenders = parseInt(data.Value) == 1;
          }
        }),
    );
  }

  public onRoomSelectionChanged(event: any): void {
    if (event.selectedItems.length == 1) {
      this.selectedRoom = event.selectedItems[0];
      if (
        !this._allowDifferentGenders &&
        event.selectedItems[0].GenderId > 0 &&
        event.selectedItems[0].GenderId != this.newPersonData.GenderId
      )
        this.selectedRoom.IsValid = false;
      else this.selectedRoom.IsValid = true;
    } else this.selectedRoom = { FloorName: "", IsValid: true };
  }

  public savePersonRoom(): void {
    this._subs.push(
      this._personsService
        .changeRoom(this.newPersonData.Id, this.selectedRoom.Id)
        .subscribe(() => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            "",
          );
          this.gridSelectedItem = [];
          this.selectedRoom = { FloorName: "", IsValid: true };
          this.getPersonDetails(this.personId);
          this.getAvaliableRooms();
          this.getRoomHistory();
        }),
    );
  }

  public goToExternalRoomManagement(): void {
    this._router.navigateByUrl("/pages/accomodation-management");
  }

  public getRoomHistory(): void {
    this._subs.push(
      this._personsService.getRoomHistory(this.personId).subscribe((data) => {
        this.roomHistory = data;
      }),
    );
  }

  public openPersonHistory(ref: TemplateRef<any>): void {
    this._dialogService.open(ref);
  }

  public generateAccommodationRequest(): void {
    this._subs.push(
      this._requestGeneratorService
        .generateRequest(this.newPersonData.Id)
        .subscribe(() => {
          this._toastrService.showToastWithCustumIcon(
            "info",
            "",
            getString("requestGenerated"),
            "info-outline",
          );
        }),
    );
  }

  public checkUserHasAdminPermission(): boolean {
    return this._authService.checkUserHasRole(UserRole.ADMIN);
  }

  private calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    if (
      today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  private calculateMonthsFrom(date: string, endDate: any): number {
    const startDate = new Date(date);
    const today = new Date(endDate);

    let months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth() - startDate.getMonth();

    if (today.getDate() < startDate.getDate()) {
      months--;
    }

    return months;
  }

  public checkUserHasPermission(): boolean {
    if (this._authService.checkUserHasRole(UserRole.ADMIN)) return true;
    return this.checkPersonIsUserPerson();
  }

  public checkPersonIsUserPerson(): boolean {
    return (
      this._authService.getUserPersons()?.find((x) => x == this.personId) !=
      null
    );
  }

  public checkUserCanViewPage(): boolean {
    if (
      this._authService.checkUserHasRole(UserRole.ADMIN) ||
      this._authService.checkUserHasRole(UserRole.NURSE) ||
      this._authService.checkUserHasRole(UserRole.CAREGIVER) ||
      this._authService.checkUserHasRole(UserRole.DOCTOR)
    )
      return true;
    else if (
      this._authService.checkUserHasRole(UserRole.USER) &&
      this.checkPersonIsUserPerson()
    )
      return true;
    else return false;
  }
}
