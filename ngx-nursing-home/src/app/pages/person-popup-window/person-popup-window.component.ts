import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { IPerson, PersonsService, getIPersonFromJSON } from '../../services/rest/persons.service';
import { getString } from '../../resources/strings';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { RoomsService } from '../../services/rest/rooms.service';
import { error } from 'console';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../../services/rest/contacts.service';
import { GendersService } from '../../services/rest/genders.service';
import { Router } from '@angular/router';
@Component({
  selector: 'sample-person-popup-window',
  templateUrl: './person-popup-window.component.html',
  styleUrls: ['./person-popup-window.component.scss']
})
export class PersonPopupWindowComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private ref: NbWindowRef,
    private personsService: PersonsService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private roomsService: RoomsService,
    private contactsService: ContactsService,
    private gendersService: GendersService,
    private router: Router,
  ) { }

  public getString = getString;
  public personId: number;
  public person: any;
  public newPersonData: IPerson = {
    Id: 0,
    FirstName: '',
    LastName: '',
    JMBG: '',
    Active: false,
    CreationDate: undefined,
    StartDate: undefined,
    EndDate: undefined,
    BirthDate: undefined
  };
  public rooms: any[] = [];
  public contacts: any[] = [];
  public genders: any[] = [];

  private subscriptions: Subscription[] = [];
  private madeChanges: boolean = false;

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
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.add("d-block");
      }
    }

    this.ref.config.titleTemplate = this.headerTemplate;
  }

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("person-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      const cdkOverlayContainer = window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0) {
        cdkOverlayContainer.children[0].classList.remove("d-block");
      }
    }

    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public close() {
    this.ref.close(this.madeChanges);
  }

  private getPersonData(): void {
    this.subscriptions.push(
      this.personsService.getPersonDetails(this.personId).subscribe(data => {
        console.log(data)
        if (data.length > 0) {
          this.newPersonData = getIPersonFromJSON(data[0]);
          this.person = getIPersonFromJSON(data[0]);
          console.log(this.newPersonData);
        }
      })
    );
  }

  private getRoomsData(): void {
    this.subscriptions.push(
      this.roomsService.getData(true).subscribe(data => {
        if (data.length > 0) {
          this.rooms = data;
        }
      },
        err => {
          console.error(err);
        })
    );
  }

  public cancelSave(): void {
    this.newPersonData = getIPersonFromJSON(JSON.parse(JSON.stringify(this.person)));
  }

  public async deactivatePerson(): Promise<void> {
    var endDate: string = new Date().toLocaleDateString();
    if (this.newPersonData.EndDate != undefined) endDate = this.newPersonData.EndDate.toLocaleDateString();
    const rezDialog = await this.dialogService.openYesNoDialog(getString("areYouSure"), getString("questionDeactivatePerson") + endDate);

    if (rezDialog) {
      this.subscriptions.push(this.personsService.deactivatePerson(this.personId, this.newPersonData.EndDate ?? null).subscribe(data => {
        this.toastrService.showToast("success", getString("saveSuccess"), "");
        this.madeChanges = true;
        this.getPersonData();
      }, err => {
        this.toastrService.showToast("danger", getString("saveError"), "");
        console.error(err);
      }));
    }
  }

  public onRoomSelectedChange(event: any): void {
    var obj = this.rooms.find(x => x.Id == event);
    if (obj) {
      this.newPersonData.FloorId = obj.FloorId;
      this.newPersonData.FloorName = obj.FloorName;
    }
  }

  public saveChanges(form: NgForm): void {
    this.subscriptions.push(this.personsService.update(this.newPersonData).subscribe(() => {
      this.madeChanges = true;
      form.form.markAsPristine();
      if (this.newPersonData.RoomId != this.person.RoomId) {
        this.subscriptions.push(this.personsService.changeRoom(this.personId, this.newPersonData.RoomId).subscribe(() => {
          this.getPersonData();
          this.toastrService.showToast("success", getString('saveSuccess'), "");
        }, err => {
          console.error(err);
          this.toastrService.showToast("danger", getString('saveError'), "");
        }));
      } else {
        this.getPersonData();
        this.toastrService.showToast("success", getString('saveSuccess'), "");
      }
    },
      err => {
        console.error(err);
        this.toastrService.showToast("danger", getString('saveError'), "");
      }
    ));
  }

  private getContactsForPerson(): void {
    this.subscriptions.push(this.contactsService.getDataForPerson(this.personId).subscribe(data => {
      if (data.length > 0) this.contacts = data;
    },
      err => {
        console.error(err);
      }));
  }

  private getGenders(): void {
    this.subscriptions.push(this.gendersService.getData().subscribe(data => {
      this.genders = data;
    }, err => {
      console.error(err);
    }));
  }

  public goToExternalRoomManagement(): void {
    this.ref.close(false);
    this.router.navigateByUrl('/pages/accomodation-management');
  }

  public goToAdvancedEdit(): void {
    this.ref.close(false);
    this.router.navigate(['pages/profile', this.personId]);
  }
}
