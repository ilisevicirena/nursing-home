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

  private subs: Subscription[] = [];
  private doctorJobPositionId: number = 5;
  private nurseJobPositionId: number = 2;
  private caretakerJobPositionId: number = 3;

  constructor(
    private ref: NbDialogRef<StartDoctorVisitTourComponent>,
    private employeesService: EmployeesService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getEmployees() {
    this.subs.push(
      this.employeesService.getEmployeesBasic().subscribe((data) => {
        console.log(data);
        this.doctors = data.filter(
          (x) => x.JobPositionId == this.doctorJobPositionId
        );
        this.nurses = data.filter(
          (x) =>
            x.JobPositionId == this.nurseJobPositionId ||
            x.JobPositionId == this.caretakerJobPositionId
        );
      })
    );
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public startDoctorVisitTour() {
    this.loading = true;
    var objToSave = {
      VisitDate: this.visitDate.toISOString(),
      Doctors: this.selectedDoctors.toString(),
      Nurses: this.selectedNurses.toString(),
    };

    this.subs.push(
      this.employeesService.newDoctorVisit(objToSave).subscribe((data) => {
        if (data.length > 0) {
          this.toastrService.showToast("info", getString("visitTourStarted"));
          this.loading = false;
          this.close(true);
          this.router.navigateByUrl(
            "/pages/doctor-visit-tour/" + data[0].DoctorVisitTourId
          );
        }
      })
    );
  }
}
