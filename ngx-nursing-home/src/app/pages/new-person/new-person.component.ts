import { Component, OnDestroy, OnInit } from '@angular/core';
import { getString } from '../../resources/strings';
import { IPerson, PersonsService } from '../../services/rest/persons.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../services/toastr.service';
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
    private gendersService: GendersService,
    private roomsService: RoomsService,
  ) { }

  public getString = getString;
  public newPersonData: IPerson = {
    Id: 0,
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
