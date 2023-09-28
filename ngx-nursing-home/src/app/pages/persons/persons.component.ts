import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { getString } from "../../resources/strings";
import { PersonsService } from "../../services/rest/persons.service";
import { Subscription } from "rxjs";
import {
  DateType,
  SmartTableColumn,
  CheckboxType,
  DatepickerFilter,
  SelectFilter,
  LookupType,
  GridColumn,
  GridDateColumn,
  GridDateboxFilter,
  GridCheckboxColumn,
  GridSelectFilter,
  GridLookupColumn,
  GridNumberColumn,
} from "shared-components";
import { NbWindowService, NbWindowState } from "@nebular/theme";
import { PersonPopupWindowComponent } from "../person-popup-window/person-popup-window.component";
import { GendersService } from "../../services/rest/genders.service";
import { ExportDocSettings } from "shared-components/lib/models/smart-table.model";

@Component({
  selector: "sample-persons",
  templateUrl: "./persons.component.html",
  styleUrls: ["./persons.component.scss"],
})
export class PersonsComponent implements OnInit, OnDestroy {
  public getString = getString;
  public currentView: string = "card";
  public unactivePersonsString: string = getString("unactivePersons");
  public personsData: any[] = [];
  public showDeactivated: boolean = false;
  public searchTerm: string = "";
  public cardData: any[] = [
    { label: getString("jmbg"), field: "JMBG", type: "" },
    { label: getString("birthDate"), field: "BirthDate", type: "date" },
    { label: getString("startDate"), field: "StartDate", type: "date" },
    { label: getString("active"), field: "Active", type: "checkbox" },
  ];
  public exportSettings: ExportDocSettings = {
    title: getString("persons"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "persons",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };
  private activeFilter = [
    { value: true, label: getString("active") },
    { value: false, label: getString("unactive") },
  ];

  public columns: GridColumn[] = [
    new GridColumn()
      .Title(getString("id"))
      .DataField("Id")
      .Type(new GridNumberColumn()),
    new GridColumn().Title(getString("firstName")).DataField("FirstName"),
    new GridColumn().Title(getString("lastName")).DataField("LastName"),
    new GridColumn().Title(getString("jmbg")).DataField("JMBG"),
    new GridColumn()
      .Title(getString("birthDate"))
      .DataField("BirthDate")
      .Type(new GridDateColumn())
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("startDate"))
      .DataField("StartDate")
      .Type(new GridDateColumn())
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("endDate"))
      .DataField("EndDate")
      .Type(new GridDateColumn())
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("active"))
      .DataField("Active")
      .Type(new GridCheckboxColumn())
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("label")
          .KeyExpression("value")
          .DataSource(this.activeFilter)
      ),
    new GridColumn()
      .Title(getString("gender"))
      .DataField("GenderId")
      .Type(new GridLookupColumn().LookupColumn("GenderTag"))
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("Tag")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this.gendersService.apiRoute)
      ),
  ];

  private subscriptions: Subscription[] = [];

  @ViewChild("contentTemplate") contentTemplate: TemplateRef<any>;

  constructor(
    private personsService: PersonsService,
    private windowService: NbWindowService,
    private gendersService: GendersService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getData() {
    this.subscriptions.push(
      this.personsService.getData(!this.showDeactivated).subscribe(
        (data) => {
          this.personsData = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public showDeactivatedChange(): void {
    this.getData();
  }

  public viewChange(event: string[]) {
    if (event.length > 0) this.currentView = event[0];
  }

  public openPersonDetails(person: any) {
    this.windowService
      .open(PersonPopupWindowComponent, {
        context: { person: person, personId: person.Id },
        buttons: {
          maximize: false,
          minimize: false,
          fullScreen: false,
          close: false,
        },
        initialState: NbWindowState.MAXIMIZED,
        hasBackdrop: true,
        windowClass: "person-popup-window",
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((result: boolean) => {
        if (result) this.getData();
      });
  }

  public gridSelectionChanged(event: any) {
    if (event.selectedRows.length == 1)
      this.openPersonDetails(event.selectedRows[0]);
  }
}
