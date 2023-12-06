import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import {
  EmployeesService,
  IEmployee,
} from "../../services/rest/employees.service";
import { ToastrService } from "../../services/toastr.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "sample-new-employee",
  templateUrl: "./new-employee.component.html",
  styleUrls: ["./new-employee.component.scss"],
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  constructor(
    private employeesService: EmployeesService,
    private toastrService: ToastrService
  ) {}

  public getString = getString;
  public loading: boolean = false;
  public employeeData: IEmployee = {
    Id: 0,
    FirstName: "",
    LastName: "",
    JMBG: "",
    QualificationId: undefined,
    Active: true,
    GenderId: undefined,
    FatherName: "",
    BirthCityId: undefined,
    BirthMunicipalityId: undefined,
    BirthCountryId: undefined,
    ResidanceCityId: undefined,
    ResidanceHouseNumber: "",
    ResidanceStreetName: "",
    Telephone: "",
    Mobile: "",
    Email: "",
    EmploymentDate: new Date(),
    BankName: "",
    BankAccountNumber: "",
    JobPositionId: undefined,
    EmploymentTypeId: undefined,
    DaysOfVacation: undefined,
    SchoolName: "",
    SchoolQualificationName: "",
  };

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((element) => {
      element.unsubscribe();
    });
  }

  public saveNewEmployee(form: NgForm): void {
    this.loading = true;
    this.subscriptions.push(
      this.employeesService.add(this.employeeData).subscribe(
        (data) => {
          if (data.EmployeeId) {
            this.loading = false;
            this.employeeData.Id = data.EmployeeId;
            form.form.markAsPristine();
            this.toastrService.showToast(
              "success",
              getString("saveSuccess"),
              ""
            );
          } else {
            this.loading = false;
            this.toastrService.showToast("danger", getString("saveError"), "");
          }
        },
        (err) => {
          console.error(err);
          this.loading = false;
          this.toastrService.showToast("danger", getString("saveError"), "");
        }
      )
    );
  }

  public validateForm(): boolean {
    let formIsValid = true;
    if (!this.employeeData.JobPositionId) formIsValid = false;
    if (!this.employeeData.FirstName) formIsValid = false;
    if (!this.employeeData.LastName) formIsValid = false;
    if (!this.employeeData.JMBG) formIsValid = false;
    if (!this.employeeData.BirthDate) formIsValid = false;
    if (!this.employeeData.EmploymentDate) formIsValid = false;
    if (!this.employeeData.GenderId) formIsValid = false;

    return formIsValid;
  }
}
