import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { getString } from '../../resources/strings';
import { PersonsService } from '../../services/rest/persons.service';
import { Subscription } from 'rxjs';
import { DateType, SmartTableColumn, CheckboxType, DatepickerFilter, SelectFilter, LookupType } from 'shared-components';
import { NbWindowService, NbWindowState } from '@nebular/theme';
import { PersonPopupWindowComponent } from '../person-popup-window/person-popup-window.component';
import { GendersService } from '../../services/rest/genders.service';
import { ExportDocSettings } from 'shared-components/lib/models/smart-table.model';

@Component({
  selector: 'sample-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

  public getString = getString;
  public currentView: string = "card";
  public unactivePersonsString: string = getString("unactivePersons");
  public personsData: any[] = [];
  public showDeactivated: boolean = false;
  public searchTerm: string = "";
  public cardData: any[] = [
    { label: getString('jmbg'), field: "JMBG", type: "" },
    { label: getString('birthDate'), field: "BirthDate", type: "date" },
    { label: getString('startDate'), field: "StartDate", type: "date" },
    { label: getString('active'), field: "Active", type: "checkbox" },
  ];
  public exportSettings: ExportDocSettings = {
    title: getString('persons'),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: 'persons',
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  }
  private activeFilter = [
    { value: true, label: getString('active') },
    { value: false, label: getString('unactive') }
  ];
  public gridColumns: SmartTableColumn[] = [
    new SmartTableColumn(getString('id')).Property("Id"),
    new SmartTableColumn(getString('firstName')).Property("FirstName"),
    new SmartTableColumn(getString('lastName')).Property("LastName"),
    new SmartTableColumn(getString('jmbg')).Property("JMBG"),
    new SmartTableColumn(getString('birthDate')).Property("BirthDate").SpecialType(new DateType()).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('startDate')).Property("StartDate").SpecialType(new DateType()).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('endDate')).Property("EndDate").SpecialType(new DateType()).SpecialFilter(new DatepickerFilter()),
    new SmartTableColumn(getString('active')).Property("Active").SpecialType(new CheckboxType())
      .SpecialFilter(new SelectFilter("value", "label").Source(this.activeFilter)),
    new SmartTableColumn(getString('gender')).Property("GenderId").SpecialType(new LookupType().NameAttribute("GenderTag"))
      .SpecialFilter(new SelectFilter("Id", "Tag").ServerSource(true).ServerEndpoint(this.gendersService.apiRoute))
  ];

  private subscriptions: Subscription[] = [];

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor(
    private personsService: PersonsService,
    private windowService: NbWindowService,
    private gendersService: GendersService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  private getData() {
    this.subscriptions.push(
      this.personsService.getData(!this.showDeactivated).subscribe(data => {
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
    if (event.selectedRows.length == 1) this.openPersonDetails(event.selectedRows[0]);
  }
}


