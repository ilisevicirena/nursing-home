import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { getString } from "../../resources/strings";
import { ExportDocSettings } from "shared-components/lib/models/smart-table.model";
import {
  GridCheckboxColumn,
  GridColumn,
  GridDateColumn,
  GridDateboxFilter,
  GridLookupColumn,
  GridNumberColumn,
  GridSelectFilter,
} from "shared-components";
import { Subscription } from "rxjs";
import { JobPositionsService } from "../../services/rest/job-positions.service";
import { EmployeesService } from "../../services/rest/employees.service";
import { Router } from "@angular/router";

@Component({
  selector: "sample-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  public getString = getString;
  public currentView: string = "card";
  public unactiveEmployeesString: string = getString("unactiveEmployees");
  public employeesData: any[] = [];
  public showDeactivated: boolean = false;
  public searchTerm: string = "";
  public cardData: any[] = [
    { label: getString("jmbg"), field: "JMBG", type: "" },
    { label: getString("birthDate"), field: "BirthDate", type: "date" },
    {
      label: getString("employmentDate"),
      field: "EmploymentDate",
      type: "date",
    },
    { label: getString("jobPosition"), field: "JobPositionName", type: "" },
    { label: getString("active"), field: "Active", type: "checkbox" },
  ];
  public exportSettings: ExportDocSettings = {
    title: getString("employees"),
    subtitle: undefined,
    showOrdinalNumbers: true,
    ordNumColumnName: getString("smTableOrdNumber"),
    docName: "employees",
    yesValueText: getString("yesBtnText").toLowerCase(),
    noValueText: getString("noBtnText").toLowerCase(),
  };
  private activeFilter: any[] = [
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
      .Title(getString("employmentDate"))
      .DataField("EmploymentDate")
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
      .Title(getString("jobPosition"))
      .DataField("JobPositionId")
      .Type(new GridLookupColumn().LookupColumn("JobPositionName"))
      .Filter(
        new GridSelectFilter()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._jobPositionsService.apiRoute)
      ),
  ];

  private _subs: Subscription[] = [];

  @ViewChild("contentTemplate") contentTemplate: TemplateRef<any>;

  constructor(
    private _employeesService: EmployeesService,
    private _jobPositionsService: JobPositionsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getData(): void {
    this._subs.push(
      this._employeesService.getData(!this.showDeactivated).subscribe(
        (data) => {
          this.employeesData = data;
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

  public viewChange(event: string[]): void {
    if (event.length > 0) this.currentView = event[0];
  }

  public gridSelectionChanged(event: any): void {
    if (event.selectedRows.length == 1)
      this._router.navigateByUrl("/pages/employee/" + event.selectedRows[0].Id);
  }

  public openPersonDetails(data: any): void {
    this._router.navigateByUrl("/pages/employee/" + data.Id);
  }
}
