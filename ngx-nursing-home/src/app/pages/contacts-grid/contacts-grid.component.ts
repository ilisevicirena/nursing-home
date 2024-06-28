import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  GridColumn,
  GridTextboxEditor,
  GridLookupColumn,
  GridToggleEditor,
  GridCheckboxColumn,
  GridSelectFilter,
  GridAutocompleteEditor,
  GRID_MODE,
  IGridExportDocumentSettings,
} from "shared-components";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { ContactsService } from "../../services/rest/contacts.service";
import { ToastrService } from "../../services/toastr.service";
import { PersonsService } from "../../services/rest/persons.service";
import { CitiesService } from "../../services/rest/cities.service";

@Component({
  selector: "sample-contacts-grid",
  templateUrl: "./contacts-grid.component.html",
  styleUrls: ["./contacts-grid.component.scss"],
})
export class ContactsGridComponent implements OnInit, OnDestroy {
  constructor(
    private _contactsService: ContactsService,
    private _toastrService: ToastrService,
    private _personsService: PersonsService,
    private _citiesService: CitiesService
  ) {}

  @Input() elementHeight: number = 300;
  @Input() personId: number = 0;
  @Input() detailed: boolean = true;

  private _subs: Subscription[] = [];
  private _activeFilter: any[] = [
    { value: true, label: getString("yes") },
    { value: false, label: getString("no") },
  ];

  public gridMode: GRID_MODE = GRID_MODE.POPUP;
  public getString = getString;
  public contactsData: any[] = [];
  public contactsColumns: GridColumn[] = [
    new GridColumn()
      .Title(getString("firstName"))
      .DataField("FirstName")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-4")
          .Required(true)
          .Label(getString("firstName"))
      ),
    new GridColumn()
      .Title(getString("lastName"))
      .DataField("LastName")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-4")
          .Required(true)
          .Label(getString("lastName"))
      ),
    new GridColumn()
      .Title(getString("jmbg"))
      .DataField("Jmbg")
      .Visible(this.detailed)
      .Editor(
        new GridTextboxEditor()
          .Pattern("[0-9]{13}$")
          .LettersDisabled(true)
          .WidthClass("col-md-4")
          .Label(getString("jmbg"))
      ),
    new GridColumn()
      .Title(getString("email"))
      .DataField("Email")
      .Visible(this.detailed)
      .Editor(
        new GridTextboxEditor()
          .Pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
          .WidthClass("col-md-4")
          .Label(getString("email"))
      ),
    new GridColumn()
      .Title(getString("telephone"))
      .DataField("Telephone")
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-4")
          .Label(getString("telephone"))
      ),
    new GridColumn()
      .Title(getString("mobile"))
      .DataField("Mobile")
      .Editor(
        new GridTextboxEditor()
          .LettersDisabled(true)
          .WidthClass("col-md-4")
          .Label(getString("mobile"))
      ),
    new GridColumn()
      .Title(getString("residanceCity"))
      .DataField("ResidanceCityId")
      .Visible(this.detailed)
      .Type(new GridLookupColumn().LookupColumn("ResidanceCityName"))
      .Editor(
        new GridAutocompleteEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .AttributesToFilter(["Name"])
          .AttributesToShow(["Name"])
          .AttributesToShowInTag(["Name"])
          .DisplayArrow(true)
          .Multiple(false)
          .ServerDataSource(true)
          .ServerEndpoint(this._citiesService.apiRoute)
          .WidthClass("col-md-4")
          .Label(getString("residanceCity"))
      ),
    new GridColumn()
      .Title(getString("residanceStreetName"))
      .DataField("ResidanceStreetName")
      .Visible(this.detailed)
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-6")
          .Label(getString("residanceStreetName"))
      ),
    new GridColumn()
      .Title(getString("residanceHouseNumber"))
      .DataField("ResidanceHouseNumber")
      .Visible(this.detailed)
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-2")
          .Label(getString("residanceHouseNumber"))
      ),
    new GridColumn()
      .Title(getString("isObligeeToPay"))
      .Width("100px")
      .DataField("IsObligeeToPay")
      .Type(new GridCheckboxColumn())
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("label")
          .KeyExpression("value")
          .DataSource(this._activeFilter)
      )
      .Editor(
        new GridToggleEditor()
          .WidthClass("col-md-2")
          .Label(getString("isObligeeToPay"))
      ),
    new GridColumn()
      .Title(getString("isGuardian"))
      .DataField("IsGuardian")
      .Type(new GridCheckboxColumn())
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("label")
          .KeyExpression("value")
          .DataSource(this._activeFilter)
      )
      .Editor(
        new GridToggleEditor()
          .WidthClass("col-md-2")
          .Label(getString("isGuardian"))
      ),
  ];

  public exportSettings: IGridExportDocumentSettings = {
    title: getString("contacts"),
    showOrdinalNumbers: true,
    docName: "contacts-for-person",
  };

  ngOnInit(): void {
    this.getContacts();
    this.getPersonDetails();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public getContacts(): void {
    this._subs.push(
      this._contactsService.getDataForPerson(this.personId).subscribe(
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
    this._subs.push(
      this._personsService.getPersonDetails(this.personId).subscribe((data) => {
        if (data.length > 0)
          this.exportSettings.subtitle =
            getString("contactsForPerson") +
            data[0].FirstName +
            " " +
            data[0].LastName;
      })
    );
  }

  public onCreateConfirm(event: any): void {
    event.newData.PersonId = this.personId;
    event.newData.ResidanceCityId = event.newData.ResidanceCityId[0];
    this._subs.push(
      this._contactsService.add(event.newData).subscribe((data) => {
        if (data.ContactId) {
          this.getContacts();
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            ""
          );
        }
      })
    );
  }

  public contactsEdit(event: any): void {
    event.newData.PersonId = this.personId;
    event.newData.ResidanceCityId = event.newData.ResidanceCityId[0];
    this._subs.push(
      this._contactsService.update(event.newData).subscribe(() => {
        this.getContacts();
        this._toastrService.showToast("success", getString("saveSuccess"), "");
      })
    );
  }

  public contactsDelete(event: any): void {
    this._subs.push(
      this._contactsService.delete({ Id: event.data.Id }).subscribe(() => {
        this.getContacts();
        this._toastrService.showToast("success", getString("saveSuccess"), "");
      })
    );
  }
}
