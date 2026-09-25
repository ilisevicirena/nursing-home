import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { EmployeesService } from "../../services/rest/employees.service";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "sample-my-data",
    templateUrl: "./my-data.component.html",
    styleUrls: ["./my-data.component.scss"],
    standalone: false
})
export class MyDataComponent implements OnInit, OnDestroy {
  public getString = getString;
  public employeeData: any;

  private _subs: Subscription[] = [];

  constructor(
    private _employeesService: EmployeesService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._subs.push(
      this._employeesService
        .getUserEmployeeId(this._authService.getUserId())
        .subscribe((res: any) => {
          const empId = res?.length ? res[0].EmployeeId : null;
          if (empId) {
            this._subs.push(
              this._employeesService
                .getEmployeeDetails(empId)
                .subscribe((data: any) => {
                  if (data?.length) this.employeeData = data[0];
                })
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }
}
