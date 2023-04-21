import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { getString } from '../../resources/strings';
import { PersonsService } from '../../services/rest/persons.service';
import { Subscription } from 'rxjs';
import { DateType, SmartTableColumn, SpecialType, TABLE_SPECIAL_TYPES, CheckboxType, DatepickerFilter, SPECIAL_FILTER_TYPES, SelectFilter } from 'shared-components';
import { NbWindowService, NbWindowState } from '@nebular/theme';
import { PersonPopupWindowComponent } from '../person-popup-window/person-popup-window.component';

@Component({
  selector: 'sample-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

  public currentView: string = "card";
  public unactivePersonsString: string = getString("unactivePersons");
  public personsData: any[] = [];
  public showDeactivated: boolean = false;
  public cardData: any[] = [
    { label: "JMBG", field: "JMBG", type: "" },
    { label: "Datum rođenja", field: "BirthDate", type: "date" },
    { label: "Datum dolaska", field: "StartDate", type: "date" },
    { label: "Aktivan", field: "Active", type: "checkbox" },
  ];

  private activeFilter = [
    { value: true, label: "Aktivan" },
    { value: false, label: "Neaktivan" }
  ];

  public gridColumns: SmartTableColumn[] = [
    new SmartTableColumn("Id").Property("Id"),
    new SmartTableColumn("Ime").Property("FirstName"),
    new SmartTableColumn("Prezime").Property("LastName"),
    new SmartTableColumn("JMBG").Property("JMBG"),
    new SmartTableColumn("Datum rođenja").Property("BirthDate").SpecialType(new DateType()).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn("Datum dolaska").Property("StartDate").SpecialType(new DateType()).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn("Datum odlaska").Property("EndDate").SpecialType(new DateType()).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn("Aktivan").Property("Active").SpecialType(new CheckboxType())
      .SpecialFilter(new SelectFilter("value", "label").Source(this.activeFilter))
  ];

  private subscriptions: Subscription[] = [];
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor(private personsService: PersonsService, private windowService: NbWindowService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  private getData() {
    this.subscriptions.push(this.personsService.getData(!this.showDeactivated).subscribe(data => {
      console.log(data);
      this.personsData = data;
    }, err => {
      console.error(err);
    }));
  }

  public showDeactivatedChange(): void {
    this.getData();
  }

  public viewChange(event: string[]) {
    if (event.length > 0) this.currentView = event[0];
  }

  public openPersonDetails(person: any) {
    this.windowService.open(
      PersonPopupWindowComponent,
      {
        context: { person: person, personId: person.Id },
        buttons: { maximize: false, minimize: false, fullScreen: false, close: false },
        initialState: NbWindowState.MAXIMIZED,
        hasBackdrop: true,
        windowClass: "person-popup-window",
        closeOnBackdropClick: false,
        closeOnEsc: false
      },
    ).onClose.subscribe((result: boolean) => {
      if (result) this.getData();
    });
  }

  public gridSelectionChanged(event: any) {
    if (event.selectedRows.length == 1) {
      this.openPersonDetails(event.selectedRows[0]);
    }
  }
}


