import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { DialogService } from "../../shared/dialog/dialog.service";
import { StartCalculationComponent } from "../calculation/start-calculation/start-calculation.component";
import { StartDoctorVisitTourComponent } from "../start-doctor-visit-tour/start-doctor-visit-tour.component";

@Component({
    selector: "sample-fast-actions",
    templateUrl: "./fast-actions.component.html",
    styleUrls: ["./fast-actions.component.scss"],
    standalone: false
})
export class FastActionsComponent implements OnInit {
  constructor(
    private _ref: NbDialogRef<FastActionsComponent>,
    private _dialogService: DialogService
  ) {}

  public getString = getString;

  ngOnInit(): void {}

  public startDoctorVisit(): void {
    this._ref.close();
    this._dialogService.open(StartDoctorVisitTourComponent, {
      autoFocus: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      context: {},
    });
  }

  public startCalculation(): void {
    this._ref.close();
    this._dialogService.open(StartCalculationComponent, {
      autoFocus: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      context: {},
    });
  }
}
