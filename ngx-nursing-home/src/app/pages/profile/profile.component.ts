import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonsService, getIPersonFromJSON } from '../../services/rest/persons.service';
import { getString } from '../../resources/strings';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../services/toastr.service';
import { GendersService } from '../../services/rest/genders.service';
import { CheckboxType, DateType, SmartTableColumn, TextboxEditor } from 'shared-components';
import { DialogService } from '../../shared/dialog/dialog.service';
import { RoomsService } from '../../services/rest/rooms.service';
import { SelectGridColumn } from 'shared-components/lib/models/select-grid.model';

@Component({
  selector: 'sample-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService,
    private toastrService: ToastrService,
    private gendersService: GendersService,
    private dialogService: DialogService,
    private roomsService: RoomsService,
    private router: Router,
  ) { }

  private personId: number = 0;
  private subscriptions: Subscription[] = [];

  public getString = getString;
  public activeView: string = "basicData";
  public person: any = {};
  public newPersonData: any = {};
  public loading: boolean = false;
  public showSidepanel: boolean = true;
  public genders: any[] = [];
  public alertIsOpen: boolean = true;
  public passedTime: any = {};
  public selectedRoom: any = { FloorName: '', IsValid: true };
  public rooms: any[] = [];
  public allRooms: any[] = [];
  public personHistory: any[] = [];
  public roomHistory: any[] = [];

  public personHistoryColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('id')).Property("Id").SpecialEditor(new TextboxEditor()).Filter(false),
    new SmartTableColumn(getString("transactionDate")).Property("CreationDate")
      .SpecialType(new DateType().Format("dd.MM.yyyy. HH:mm")).Filter(false),
    new SmartTableColumn(getString('firstName')).Property("FirstName").SpecialEditor(new TextboxEditor()).Filter(false),
    new SmartTableColumn(getString('lastName')).Property("LastName").SpecialEditor(new TextboxEditor()).Filter(false),
    new SmartTableColumn(getString('jmbg')).Property("Jmbg").SpecialEditor(new TextboxEditor()).Filter(false),
    new SmartTableColumn(getString('logType')).Property("LogType").SpecialEditor(new TextboxEditor()).Filter(false),
    new SmartTableColumn(getString('logType')).Property("LogTypePretty").SpecialEditor(new TextboxEditor()).Filter(false),
  ];

  public roomHistoryColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('id')).Property("RoomId").Filter(false),
    new SmartTableColumn(getString('room')).Property("RoomName").Filter(false),
    new SmartTableColumn(getString('floor')).Property("FloorName").Filter(false),
    new SmartTableColumn(getString('activeRoom')).Property("Active").Filter(false).SpecialType(new CheckboxType()),
    new SmartTableColumn(getString('roomStartDate')).Property("StartDate").Filter(false).SpecialType(new DateType().Format('dd.MM.yyyy.')),
    new SmartTableColumn(getString('roomEndDate')).Property("EndDate").Filter(false).SpecialType(new DateType().Format('dd.MM.yyyy.')),
  ];

  public options: any[] = [
    { option: 'basicData', string: 'basicData', active: true },
    { option: 'contacts', string: 'contacts', active: false },
    { option: 'stayData', string: 'stayData', active: false },
    { option: 'dormatoryData', string: 'dormatoryData', active: false },
    { option: 'services', string: 'services', active: false },
    { option: 'documents', string: 'documents', active: false },
    { option: 'notes', string: 'notes', active: false }
  ];

  public roomsColumns: SelectGridColumn[] = [
    {
      name: "name",
      title: getString('room'),
      attributeName: "Name",
    },
    {
      name: "floor",
      title: getString('floor'),
      attributeName: "FloorName",
    },
    {
      name: "capacity",
      title: getString('capacity'),
      attributeName: "Capacity",
    },
    {
      name: "freeSpace",
      title: getString('freeSpace'),
      attributeName: "FreeSpace",
    },
    {
      name: "gender",
      title: getString('gender'),
      attributeName: "GenderName",
    }
  ];

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(this.activatedRoute.paramMap.subscribe((params) => {
      this.personId = params.get('id') as any;
      this.getPersonDetails(this.personId);
      this.getGenders();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public toggleSidepanel(): void {
    this.showSidepanel = !this.showSidepanel;
  }

  public toggleView(view: any): void {
    this.options.find(x => x.option == this.activeView)!.active = false;
    view.active = true;
    this.activeView = view.option;

    switch (this.activeView) {
      case 'dormatoryData':
        this.getAvaliableRooms();
        this.getAllRooms();
        this.getRoomHistory();
        break;
    }
  }

  // ------------------------------------------------- BASIC DATA ---------------------------------------------------------------------

  public getGenders(): void {
    this.subscriptions.push(this.gendersService.getData().subscribe(data => {
      this.genders = data;
    }, err => {
      console.error(err);
    }));
  }

  public getHistory(): void {
    this.subscriptions.push(this.personsService.getHistory(this.personId).subscribe(data => {
      this.personHistory = data;
    }, err => {
      console.error(err);
    }));
  }

  public saveBasicData(form: NgForm): void {
    this.subscriptions.push(this.personsService.update(this.newPersonData).subscribe(() => {
      this.getPersonDetails(this.personId);
      form.form.markAsPristine();
      this.toastrService.showToast("success", getString('saveSuccess'), "");
    }, err => {
      console.error(err);
      this.toastrService.showToast("danger", getString('saveError'), "");
    }));
  }

  public cancelEditBasicData(form: NgForm) {
    this.newPersonData = getIPersonFromJSON(JSON.parse(JSON.stringify(this.person)));
    form.form.markAsPristine();
  }

  private getPersonDetails(personId): void {
    this.subscriptions.push(this.personsService.getPersonDetails(personId).subscribe(data => {
      if (data.length > 0) {
        this.person = getIPersonFromJSON(data[0]);
        this.newPersonData = getIPersonFromJSON(data[0]);
        this.passedTime = this.calculatePassedTime();
        this.getHistory();
      }

      this.loading = false;
    }));
  }

  //--------------------------------------------------- STAY DATA --------------------------------------------------

  public async deactivatePerson(): Promise<void> {
    var endDate: string = new Date().toLocaleDateString();
    if (this.person.EndDate != undefined) endDate = this.person.EndDate.toLocaleDateString();
    const rezDialog = await this.dialogService.openYesNoDialog(getString("areYouSure"), getString("questionDeactivatePerson") + endDate);

    if (rezDialog) {
      this.subscriptions.push(this.personsService.deactivatePerson(this.personId, this.person.EndDate ?? null).subscribe(() => {
        this.toastrService.showToast("success", getString("saveSuccess"), "");
        this.getPersonDetails(this.personId);
      }, err => {
        this.toastrService.showToast("danger", getString("saveError"), "");
        console.error(err);
      }));
    }
  }

  public calculatePassedTime() {
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
    if (day < dd) {
      months = months - 1;
    }
    years = year - yy;
    if (month * 100 + day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }

    days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));

    return { years: years, months: months, days: days };
  }


  //------------------------------------------ DORMATORY DATA ------------------------------------------------------------

  private getAvaliableRooms(): void {
    this.subscriptions.push(this.roomsService.getAvaliableRooms().subscribe(data => {
      this.rooms = data;
    }));
  }

  private getAllRooms(): void {
    this.subscriptions.push(this.roomsService.getData().subscribe(data => {
      this.allRooms = data;
    }));
  }

  public onRoomSelectionChanged(event: any) {
    if (event.selectedItems.length == 1) {
      this.selectedRoom = event.selectedItems[0];
      if (event.selectedItems[0].GenderId > 0 && event.selectedItems[0].GenderId != this.newPersonData.GenderId) {
        this.selectedRoom.IsValid = false;
      } else this.selectedRoom.IsValid = true;
    }
    else this.selectedRoom = { FloorName: '', IsValid: true };
  }

  public savePersonRoom(): void {
    this.subscriptions.push(this.personsService.changeRoom(this.newPersonData.Id, this.selectedRoom.Id).subscribe(() => {
      this.toastrService.showToast('success', getString('saveSuccess'), '');
    }));
  }

  public goToExternalRoomManagement(): void {
    this.router.navigateByUrl('/pages/accomodation-management');
  }

  public getRoomHistory(): void {
    this.subscriptions.push(this.personsService.getRoomHistory(this.personId).subscribe(data => {
      this.roomHistory = data;
    }));
  }

}
