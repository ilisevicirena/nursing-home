import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  EmployeesService,
  getIEmployeeFromJSON,
} from "../../services/rest/employees.service";
import { ToastrService } from "../../services/toastr.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { NgForm } from "@angular/forms";

@Component({
  selector: "sample-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeesService: EmployeesService,
    private toastrService: ToastrService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  private subscriptions: Subscription[] = [];

  public employeeId: number = 0;
  public getString = getString;
  public activeView: string = "basicData";
  public employee: any = {};
  public newEmployeeData: any = {};
  public loading: boolean = false;
  public showPanel: boolean = true;
  public passedTime: any;

  public options: any[] = [
    { option: "basicData", string: "basicData", active: true },
    { option: "vacation", string: "vacation", active: false },
  ];

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((params) => {
        this.employeeId = params.get("id") as any;
        this.getEmployeeDetails(this.employeeId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  // ------------------------------------------------- BASIC DATA ---------------------------------------------------------------------

  public saveBasicData(): void {
    this.subscriptions.push(
      this.employeesService.update(this.newEmployeeData).subscribe(
        () => {
          this.getEmployeeDetails(this.employeeId);
          this.toastrService.showToast("success", getString("saveSuccess"), "");
        },
        (err) => {
          console.error(err);
          this.toastrService.showToast("danger", getString("saveError"), "");
        }
      )
    );
  }

  public cancelEditBasicData() {
    this.newEmployeeData = getIEmployeeFromJSON(
      JSON.parse(JSON.stringify(this.employee))
    );
  }

  private getEmployeeDetails(employeeId: number): void {
    this.subscriptions.push(
      this.employeesService.getEmployeeDetails(employeeId).subscribe((data) => {
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
    const rezDialog = await this.dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("questionDeactivateemployee") + endDate
    );

    if (rezDialog) {
      this.subscriptions.push(
        this.employeesService
          .deactivateEmployee(this.employeeId, this.employee.EndDate ?? null)
          .subscribe(
            () => {
              this.toastrService.showToast(
                "success",
                getString("saveSuccess"),
                ""
              );
              this.getEmployeeDetails(this.employeeId);
            },
            (err) => {
              this.toastrService.showToast(
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

  public calculatePassedTime() {
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

  public togglePanel() {
    this.showPanel = !this.showPanel;
  }

  public toggleView(view: any): void {
    this.options.find((x) => x.option == this.activeView)!.active = false;
    view.active = true;
    this.activeView = view.option;
  }
}
