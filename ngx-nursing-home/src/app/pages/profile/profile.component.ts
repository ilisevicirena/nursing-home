import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonsService, getIPersonFromJSON } from '../../services/rest/persons.service';
import { getString } from '../../resources/strings';
import { NgForm } from '@angular/forms';
import { ToastrService } from '../../services/toastr.service';
import { GendersService } from '../../services/rest/genders.service';
import { SmartTableColumn, TextboxEditor } from 'shared-components';
import { ContactsService } from '../../services/rest/contacts.service';

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
    private contactsService: ContactsService
  ) { }

  private personId: number = 0;
  private subscriptions: Subscription[] = [];

  public activeView: string = "basicData";
  public person: any = {};
  public newPersonData: any = {};
  public loading: boolean = false;
  public getString = getString;
  public showSidepanel: boolean = true;
  public contactsColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('firstName')).Property("FirstName").SpecialEditor(new TextboxEditor()),
    new SmartTableColumn(getString('lastName')).Property("LastName").SpecialEditor(new TextboxEditor()),
    new SmartTableColumn(getString('email')).Property("Email").SpecialEditor(new TextboxEditor()
      .Pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")),
    new SmartTableColumn(getString('telephone')).Property("Telephone").SpecialEditor(new TextboxEditor().OnlyNumbers(true)),
    new SmartTableColumn(getString('mobile')).Property("Mobile").SpecialEditor(new TextboxEditor().OnlyNumbers(true)),
  ];

  public contactsData: any[] = [];
  public genders: any[] = [];
  public options: any[] = [
    {
      option: 'basicData',
      string: 'basicData',
      active: true,
    },
    {
      option: 'contacts',
      string: 'contacts',
      active: false,
    },
    {
      option: 'stayData',
      string: 'stayData',
      active: false,
    },
    {
      option: 'dormatoryData',
      string: 'dormatoryData',
      active: false,
    },
    {
      option: 'services',
      string: 'services',
      active: false,
    },
    {
      option: 'documents',
      string: 'documents',
      active: false,
    },
    {
      option: 'notes',
      string: 'notes',
      active: false,
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

  private getPersonDetails(personId): void {
    this.subscriptions.push(this.personsService.getPersonDetails(personId).subscribe(data => {
      if (data.length > 0) {
        this.person = getIPersonFromJSON(data[0]);
        this.newPersonData = getIPersonFromJSON(data[0]);
      }

      this.loading = false;
    }));
  }

  public toggleSidepanel(): void {
    this.showSidepanel = !this.showSidepanel;
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
    this.newPersonData = this.person;
    form.form.markAsPristine();
  }

  public getGenders(): void {
    this.subscriptions.push(this.gendersService.getData().subscribe(data => {
      this.genders = data;
    }, err => {
      console.error(err);
    }));
  }

  public getContacts(): void {
    this.subscriptions.push(this.contactsService.getDataForPerson(this.personId).subscribe(data => {
      this.contactsData = data;
    }, err => {
      console.error(err);
    }));
  }

  public toggleView(view: any): void {
    this.options.find(x => x.option == this.activeView)!.active = false;
    view.active = true;
    this.activeView = view.option;

    switch (this.activeView) {
      case 'contacts':
        this.getContacts();
        break;
    }
  }

  public contactsCreate(event: any) {
    var allValid: boolean = true;
    if (!event.newData.FirstName || !event.newData.LastName) allValid = false;
    else if (event.newData.Email) {
      //check valid email
      var re = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      if (!re.test(event.newData.Email)) allValid = false;
    } else if (!event.newData.Telephone && !event.newData.Mobile) allValid = false;

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
    } else if (!event.newData.Telephone && !event.newData.Mobile) allValid = false;

    if (allValid) {
      event.newData.FirstName = event.newData.FirstName.value ?? event.newData.FirstName;
      event.newData.LastName = event.newData.LastName.value ?? event.newData.LastName;
      event.newData.Email = event.newData.Email.value ?? event.newData.Email;

      this.subscriptions.push(this.contactsService.update(event.newData).subscribe(data => {
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
    }))
  }
}
