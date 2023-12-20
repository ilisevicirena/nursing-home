import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { EmployeesService } from "../../services/rest/employees.service";
import { Router } from "@angular/router";
import { ToastrService } from "../../services/toastr.service";

@Component({
  selector: "sample-start-doctor-visit-tour",
  templateUrl: "./start-doctor-visit-tour.component.html",
  styleUrls: ["./start-doctor-visit-tour.component.scss"],
})
export class StartDoctorVisitTourComponent implements OnInit, OnDestroy {
  public getString = getString;
  public loading: boolean = false;
  public visitDate = new Date();
  public doctors: any[] = [];
  public nurses: any[] = [];
  public selectedDoctors: number[] = [];
  public selectedNurses: number[] = [];

  private _subs: Subscription[] = [];
  private readonly _doctorJobPositionId: number = 5;
  private readonly _nurseJobPositionId: number = 2;
  private readonly _caretakerJobPositionId: number = 3;

  constructor(
    private _ref: NbDialogRef<StartDoctorVisitTourComponent>,
    private _employeesService: EmployeesService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getEmployees(): void {
    this._subs.push(
      this._employeesService.getEmployeesBasic().subscribe((data) => {
        this.doctors = data.filter(
          (x) => x.JobPositionId == this._doctorJobPositionId
        );
        this.nurses = data.filter(
          (x) =>
            x.JobPositionId == this._nurseJobPositionId ||
            x.JobPositionId == this._caretakerJobPositionId
        );
      })
    );
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public startDoctorVisitTour(): void {
    this.loading = true;
    var objToSave = {
      VisitDate: this.visitDate.toISOString(),
      Doctors: this.selectedDoctors.toString(),
      Nurses: this.selectedNurses.toString(),
    };

    this._subs.push(
      this._employeesService.newDoctorVisit(objToSave).subscribe((data) => {
        if (data.length > 0) {
          this._toastrService.showToast("info", getString("visitTourStarted"));
          this.loading = false;
          this.close(true);
          this._router.navigateByUrl(
            "/pages/doctor-visit-tour/" + data[0].DoctorVisitTourId
          );
        }
      })
    );
  }
}
