import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  GridColumn,
  GridTextboxEditor,
  SmartTableColumn,
  TABLE_MODE,
  TextboxEditor,
} from "shared-components";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { ContactsService } from "../../services/rest/contacts.service";
import { ToastrService } from "../../services/toastr.service";
import { ExportDocSettings } from "shared-components/lib/models/smart-table.model";
import { PersonsService } from "../../services/rest/persons.service";

@Component({
  selector: "sample-contacts-grid",
  templateUrl: "./contacts-grid.component.html",
  styleUrls: ["./contacts-grid.component.scss"],
})
export class ContactsGridComponent implements OnInit, OnDestroy {
  constructor(
    private contactsService: ContactsService,
    private toastrService: ToastrService,
    private personsService: PersonsService
  ) {}

  @Input() elementHeight: number = 300;
  @Input() personId: number = 0;

  private subscriptions: Subscription[] = [];

  public gridMode: TABLE_MODE = TABLE_MODE.POPUP;
  public contactsData: any[] = [];
  public contactsColumns: GridColumn[] = [
    new GridColumn()
      .Title(getString("firstName"))
      .DataField("FirstName")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-6")
          .Required(true)
          .Label(getString("firstName"))
      ),
    new GridColumn()
      .Title(getString("lastName"))
      .DataField("LastName")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-6")
          .Required(true)
          .Label(getString("lastName"))
      ),
    new GridColumn()
      .Title(getString("email"))
      .DataField("Email")
      .Editor(
        new GridTextboxEditor()
          .Pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
          .Label(getString("email"))
      ),
    new GridColumn()
      .Title(getString("telephone"))
      .DataField("Telephone")
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-6")
          .Label(getString("telephone"))
      ),
    new GridColumn()
      .Title(getString("mobile"))
      .DataField("Mobile")
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-6")
          .Label(getString("mobile"))
      ),
  ];

  public exportSettings: ExportDocSettings = {
    title: getString("contacts"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "contacts-for-person",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };

  ngOnInit(): void {
    this.getContacts();
    this.getPersonDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  public getContacts(): void {
    this.subscriptions.push(
      this.contactsService.getDataForPerson(this.personId).subscribe(
        (data) => {
          this.contactsData = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private getPersonDetails(): void {
    this.subscriptions.push(
      this.personsService.getPersonDetails(this.personId).subscribe((data) => {
        if (data.length > 0)
          this.exportSettings.subtitle =
            getString("contactsForPerson") +
            data[0].FirstName +
            " " +
            data[0].LastName;
      })
    );
  }

  public onCreateConfirm(event: any) {
    event.newData.PersonId = this.personId;
    this.subscriptions.push(
      this.contactsService.add(event.newData).subscribe((data) => {
        if (data.ContactId) {
          this.getContacts();
          this.toastrService.showToast("success", getString("saveSuccess"), "");
        }
      })
    );
  }

  public contactsEdit(event: any) {
    event.newData.PersonId = this.personId;
    this.subscriptions.push(
      this.contactsService.update(event.newData).subscribe(() => {
        this.getContacts();
        this.toastrService.showToast("success", getString("saveSuccess"), "");
      })
    );
  }

  public contactsDelete(event: any) {
    this.subscriptions.push(
      this.contactsService.delete({ Id: event.data.Id }).subscribe(() => {
        this.getContacts();
        this.toastrService.showToast("success", getString("saveSuccess"), "");
      })
    );
  }
}
