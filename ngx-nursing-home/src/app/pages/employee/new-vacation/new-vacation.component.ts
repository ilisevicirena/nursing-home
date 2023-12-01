import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NbDialogRef } from "@nebular/theme";
import {
  IVacation,
  VacationsService,
} from "../../../services/rest/vacations.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
  selector: "sample-new-vacation",
  templateUrl: "./new-vacation.component.html",
  styleUrls: ["./new-vacation.component.scss"],
})
export class NewVacationComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public getString = getString;
  public year: number = new Date().getFullYear();
  public employeeId: number;
  public summary: any;
  public selectedDaysValid: boolean = false;
  public selectedRange: any;
  public daysCorrected: number;

  constructor(
    private ref: NbDialogRef<NewVacationComponent>,
    private vacationsService: VacationsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public saveVacation() {
    var model: IVacation = {
      EmployeeId: this.employeeId,
      Year: this.year,
      FromDate: this.selectedRange.start.toISOString(),
      ToDate: this.selectedRange.end.toISOString(),
      DaysTaken: this.daysCorrected,
      DaysTotal: this.summary.TotalDays,
      StatusId: 0,
    };

    this.subs.push(
      this.vacationsService.add(model).subscribe(() => {
        this.toastrService.showToast("success", getString("saveSuccess"));
        this.close(true);
      })
    );
  }

  public onRangeChange(ev: any) {
    if (ev.start && ev.end) {
      this.daysCorrected = this.dateDiff(ev.start, ev.end);

      this.selectedDaysValid =
        this.daysCorrected > 0
          ? this.daysCorrected < this.summary.AvailableDaysForReservation
          : false;
    } else this.selectedDaysValid = false;
  }

  private dateDiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24)) + 1;
  }

  public onDaysChange() {
    this.selectedDaysValid =
      this.daysCorrected > 0
        ? this.daysCorrected < this.summary.AvailableDaysForReservation
        : false;
  }
}
