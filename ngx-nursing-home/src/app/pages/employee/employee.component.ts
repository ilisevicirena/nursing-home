import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  EmployeesService,
  getIEmployeeFromJSON,
} from "../../services/rest/employees.service";
import { ToastrService } from "../../services/toastr.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { VacationsService } from "../../services/rest/vacations.service";

@Component({
    selector: "sample-employee",
    templateUrl: "./employee.component.html",
    styleUrls: ["./employee.component.scss"],
    standalone: false
})
export class EmployeeComponent implements OnInit, OnDestroy {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _employeesService: EmployeesService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService,
    private _vacationsService: VacationsService
  ) {}

  private _subs: Subscription[] = [];

  public employeeId: number = 0;
  public getString = getString;
  public activeView: string = "basicData";
  public employee: any = {};
  public newEmployeeData: any = {};
  public loading: boolean = false;
  public showPanel: boolean = true;
  public passedTime: any;
  public alertIsOpen: boolean = true;
  public summary: any;

  public options: any[] = [
    { option: "basicData", string: "basicData", active: true },
    { option: "vacation", string: "vacation", active: false },
    { option: "employeeLeave", string: "employeeLeave", active: false },
  ];

  ngOnInit(): void {
    this.loading = true;
    this._subs.push(
      this._activatedRoute.paramMap.subscribe((params) => {
        this.employeeId = params.get("id") as any;
        this.getEmployeeDetails(this.employeeId);
        this.getSummary();
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getSummary(): void {
    this._subs.push(
      this._vacationsService
        .getRemainingVacationDays(this.employeeId)
        .subscribe((data) => {
          this.summary = data;
        })
    );
  }

  // ------------------------------------------------- BASIC DATA ---------------------------------------------------------------------

  public saveBasicData(): void {
    this._subs.push(
      this._employeesService.update(this.newEmployeeData).subscribe(
        () => {
          this.getEmployeeDetails(this.employeeId);
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            ""
          );
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"), "");
        }
      )
    );
  }

  public cancelEditBasicData(): void {
    this.newEmployeeData = getIEmployeeFromJSON(
      JSON.parse(JSON.stringify(this.employee))
    );
  }

  private getEmployeeDetails(employeeId: number): void {
    this._subs.push(
      this._employeesService
        .getEmployeeDetails(employeeId)
        .subscribe((data) => {
          if (data.length > 0) {
            this.employee = getIEmployeeFromJSON(data[0]);
            this.newEmployeeData = getIEmployeeFromJSON(data[0]);
            this.passedTime = this.calculatePassedTime();
          }

          this.loading = false;
        })
    );
  }

  public async deactivateEmployee(): Promise<void> {
    var endDate: string = new Date().toLocaleDateString();
    if (this.employee.EndDate != undefined)
      endDate = this.employee.EndDate.toLocaleDateString();
    const rezDialog = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("questionDeactivateemployee") + endDate
    );

    if (rezDialog) {
      this._subs.push(
        this._employeesService
          .deactivateEmployee(
            this.employeeId,
            this.employee.EmploymentEndDate ?? null
          )
          .subscribe(
            () => {
              this._toastrService.showToast(
                "success",
                getString("saveSuccess"),
                ""
              );
              this.getEmployeeDetails(this.employeeId);
            },
            (err) => {
              this._toastrService.showToast(
                "danger",
                getString("saveError"),
                ""
              );
              console.error(err);
            }
          )
      );
    }
  }

  public calculatePassedTime(): any {
    var today: Date = this.employee.Active
      ? new Date()
      : this.employee.EmploymentEndDate;
    var date: Date = this.employee.EmploymentDate;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var years, months, days;
    months = month - mm;

    if (day < dd) months = months - 1;
    years = year - yy;

    if (month * 100 + day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }

    days = Math.floor(
      (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
        (24 * 60 * 60 * 1000)
    );

    return { years: years, months: months, days: days };
  }

  public togglePanel(): void {
    this.showPanel = !this.showPanel;
  }

  public toggleView(view: any): void {
    this.options.find((x) => x.option == this.activeView)!.active = false;
    view.active = true;
    this.activeView = view.option;
  }

  public validateForm(): boolean {
    let formIsValid = true;
    if (!this.newEmployeeData.JobPositionId) formIsValid = false;
    if (!this.newEmployeeData.FirstName) formIsValid = false;
    if (!this.newEmployeeData.LastName) formIsValid = false;
    if (!this.newEmployeeData.JMBG) formIsValid = false;
    if (!this.newEmployeeData.BirthDate) formIsValid = false;
    if (!this.newEmployeeData.EmploymentDate) formIsValid = false;
    if (!this.newEmployeeData.GenderId) formIsValid = false;

    return formIsValid;
  }
}
