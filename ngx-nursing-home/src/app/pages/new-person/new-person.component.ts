import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { IPerson, PersonsService } from '../../services/rest/persons.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';
import { SmartTableColumn, TextboxEditor } from 'shared-components';
import { ContactsService } from '../../services/rest/contacts.service';
import { GendersService } from '../../services/rest/genders.service';
import { RoomsService } from '../../services/rest/rooms.service';
import { SelectGridColumn } from 'shared-components/lib/models/select-grid.model';

@Component({
  selector: 'sample-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss']
})
export class NewPersonComponent implements OnInit, OnDestroy {

  constructor(
    private personsService: PersonsService,
    private toastrService: ToastrService,
    private contactsService: ContactsService,
    private gendersService: GendersService,
    private roomsService: RoomsService,
  ) { }

  public getString = getString;
  public newPersonData: IPerson = {
    Id: 4,
    FirstName: '',
    LastName: '',
    JMBG: '',
    Active: true,
    CreationDate: '',
    StartDate: new Date(),
    Address: '',
    GenderId: undefined,
  };

  public loading: boolean = false;
  public contactsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('firstName')).Property("FirstName").SpecialEditor(new TextboxEditor().Required(true).Validation(true)).Filter(false),
    new SmartTableColumn(getString('lastName')).Property("LastName").SpecialEditor(new TextboxEditor().Required(true).Validation(true)).Filter(false),
    new SmartTableColumn(getString('email')).Property("Email").SpecialEditor(new TextboxEditor()
      .Pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$").Validation(true)).Filter(false),
    new SmartTableColumn(getString('telephone')).Property("Telephone").SpecialEditor(new TextboxEditor().OnlyNumbers(true)).Filter(false),
    new SmartTableColumn(getString('mobile')).Property("Mobile").SpecialEditor(new TextboxEditor().OnlyNumbers(true)).Filter(false),
  ];

  public contactsData: any[] = [];
  public genders: any[] = [];
  public rooms: any[] = [];
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

  public selectedRoom: any = { FloorName: '', IsValid: true };

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getGenders();
    this.getAvaliableRooms();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  private getGenders(): void {
    this.subscriptions.push(this.gendersService.getData().subscribe(data => {
      this.genders = data;
    }));
  }

  public saveNewPerson(form: NgForm): void {
    this.loading = true;
    this.subscriptions.push(this.personsService.add(this.newPersonData).subscribe(data => {
      if (data.PersonId) {
        this.loading = false;
        this.newPersonData.Id = data.PersonId;
        form.form.markAsPristine();
        this.toastrService.showToast("success", getString("saveSuccess"), "");
      } else {
        this.loading = false;
        this.toastrService.showToast("danger", getString("saveError"), "");
      }
    }, err => {
      console.error(err);
      this.loading = false;
      this.toastrService.showToast("danger", getString("saveError"), "");
    }));
  }

  public contactsCreate(event: any) {
    var allValid: boolean = true;

    Object.keys(event.newData).forEach(key => {
      if (key == "FirstName" || key == "LastName") {
        if (!event.newData[key] || !event.newData[key]?.value) allValid = false; return;
      } else
        if (event.newData[key].isValid != undefined) {
          if (event.newData[key].isValid == false) {
            allValid = false;
            return;
          }
        }
    });

    if ((!event.newData.Email && !event.newData.Telephone && !event.newData.Mobile)) allValid = false;

    if (allValid) {
      event.newData.PersonId = this.newPersonData.Id;
      event.newData.FirstName = event.newData.FirstName.value ?? event.newData.FirstName;
      event.newData.LastName = event.newData.LastName.value ?? event.newData.LastName;
      event.newData.Email = event.newData.Email.value ?? event.newData.Email;

      this.subscriptions.push(this.contactsService.add(event.newData).subscribe(data => {
        if (data.ContactId) {
          event.confirm.resolve();
          this.getContacts();
        }
      }));
    }
  }

  public contactsEdit(event: any) {
    var allValid: boolean = true;

    Object.keys(event.newData).forEach(key => {
      if (key == "FirstName" || key == "LastName") {
        if (!event.newData[key] || !event.newData[key]?.value) allValid = false; return;
      } else
        if (event.newData[key].isValid != undefined) {
          if (event.newData[key].isValid == false) {
            allValid = false;
            return;
          }
        }
    });

    if ((!event.newData.Email && !event.newData.Telephone && !event.newData.Mobile)) allValid = false;

    if (allValid) {
      event.newData.FirstName = event.newData.FirstName.value ?? event.newData.FirstName;
      event.newData.LastName = event.newData.LastName.value ?? event.newData.LastName;
      event.newData.Email = event.newData.Email.value ?? event.newData.Email;

      this.subscriptions.push(this.contactsService.update(event.newData).subscribe(data => {
        event.confirm.resolve();
        this.getContacts();
      }));
    }
  }

  public contactsDelete(event: any) {
    this.subscriptions.push(this.contactsService.delete({ Id: event.data.Id }).subscribe(() => {
      event.confirm.resolve();
      this.getContacts();
    }))
  }

  private getContacts(): void {
    if (this.newPersonData.Id > 0) {
      this.subscriptions.push(this.contactsService.getDataForPerson(this.newPersonData.Id).subscribe(data => {
        if (data.length > 0) {
          this.contactsData = data;
        }
      }));
    }
  }

  private getAvaliableRooms(): void {
    this.subscriptions.push(this.roomsService.getAvaliableRooms().subscribe(data => {
      this.rooms = data;
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
}
