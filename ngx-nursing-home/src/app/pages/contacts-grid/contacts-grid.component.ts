import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SmartTableColumn, TextboxEditor } from 'shared-components';
import { getString } from '../../resources/strings';
import { Subscription } from 'rxjs';
import { ContactsService } from '../../services/rest/contacts.service';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'sample-contacts-grid',
  templateUrl: './contacts-grid.component.html',
  styleUrls: ['./contacts-grid.component.scss']
})
export class ContactsGridComponent implements OnInit, OnDestroy {

  constructor(private contactsService: ContactsService, private toastrService: ToastrService) { }

  @Input() elementHeight: number = 300;
  @Input() personId: number = 0;
  public contactsData: any[] = [];

  private subscriptions: Subscription[] = [];

  public contactsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('firstName')).Property("FirstName").SpecialEditor(new TextboxEditor()),
    new SmartTableColumn(getString('lastName')).Property("LastName").SpecialEditor(new TextboxEditor()),
    new SmartTableColumn(getString('email')).Property("Email").SpecialEditor(new TextboxEditor()
      .Pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")),
    new SmartTableColumn(getString('telephone')).Property("Telephone").SpecialEditor(new TextboxEditor().OnlyNumbers(true)),
    new SmartTableColumn(getString('mobile')).Property("Mobile").SpecialEditor(new TextboxEditor().OnlyNumbers(true)),
  ];

  public getContacts(): void {
    this.subscriptions.push(this.contactsService.getDataForPerson(this.personId).subscribe(data => {
      this.contactsData = data;
    }, err => {
      console.error(err);
    }));
  }

  public contactsCreate(event: any) {
    var allValid: boolean = true;
    if (!event.newData.FirstName || !event.newData.LastName) allValid = false;
    else if (event.newData.Email) {
      //check valid email
      var re = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      if (!re.test(event.newData.Email)) allValid = false;
    }

    if (allValid) {
      event.newData.PersonId = this.personId;
      event.newData.FirstName = event.newData.FirstName.value ?? event.newData.FirstName;
      event.newData.LastName = event.newData.LastName.value ?? event.newData.LastName;
      event.newData.Email = event.newData.Email.value ?? event.newData.Email;

      this.subscriptions.push(this.contactsService.add(event.newData).subscribe(data => {
        if (data.ContactId) {
          event.confirm.resolve();
          this.getContacts();
          this.toastrService.showToast("success", getString('saveSuccess'), "");
        }
      }));
    }
  }

  public contactsEdit(event: any) {
    var allValid: boolean = true;
    if (!event.newData.FirstName || !event.newData.LastName) allValid = false;
    else if (event.newData.Email) {
      //check valid email
      var re = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      if (!re.test(event.newData.Email)) allValid = false;
    }

    if (allValid) {
      event.newData.FirstName = event.newData.FirstName.value ?? event.newData.FirstName;
      event.newData.LastName = event.newData.LastName.value ?? event.newData.LastName;
      event.newData.Email = event.newData.Email.value ?? event.newData.Email;

      this.subscriptions.push(this.contactsService.update(event.newData).subscribe(() => {
        event.confirm.resolve();
        this.getContacts();
        this.toastrService.showToast("success", getString('saveSuccess'), "");
      }));
    }
  }

  public contactsDelete(event: any) {
    this.subscriptions.push(this.contactsService.delete({ Id: event.data.Id }).subscribe(() => {
      event.confirm.resolve();
      this.getContacts();
      this.toastrService.showToast("success", getString('saveSuccess'), "");
    }));
  }


  ngOnInit(): void {
    this.getContacts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }
}
