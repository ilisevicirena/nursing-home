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
    standalone: false
})
export class NewVacationComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public getString = getString;
  public year: number = new Date().getFullYear();
  public employeeId: number;
  public summary: any;
  public selectedDaysValid: boolean = false;
  public selectedRange: any;
  public daysCorrected: number;

  constructor(
    private _ref: NbDialogRef<NewVacationComponent>,
    private _vacationsService: VacationsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public saveVacation(): void {
    var model: IVacation = {
      EmployeeId: this.employeeId,
      Year: this.year,
      FromDate: this.selectedRange.start.toISOString(),
      ToDate: this.selectedRange.end.toISOString(),
      DaysTaken: this.daysCorrected,
      DaysTotal: this.summary.TotalDays,
      StatusId: 0,
    };

    this._subs.push(
      this._vacationsService.add(model).subscribe(() => {
        this._toastrService.showToast("success", getString("saveSuccess"));
        this.close(true);
      })
    );
  }

  public onRangeChange(ev: any): void {
    if (ev.start && ev.end) {
      this.daysCorrected = this.dateDiff(ev.start, ev.end);

      this.selectedDaysValid =
        this.daysCorrected > 0
          ? this.daysCorrected < this.summary.AvailableDaysForReservation
          : false;
    } else this.selectedDaysValid = false;
  }

  private dateDiff(first: any, second: any): number {
    return Math.round((second - first) / (1000 * 60 * 60 * 24)) + 1;
  }

  public onDaysChange(): void {
    this.selectedDaysValid =
      this.daysCorrected > 0
        ? this.daysCorrected < this.summary.AvailableDaysForReservation
        : false;
  }
}
