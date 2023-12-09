import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../resources/strings";
import { Router } from "@angular/router";
import { DialogService } from "../../shared/dialog/dialog.service";
import { StartCalculationComponent } from "../calculation/start-calculation/start-calculation.component";
import { StartDoctorVisitTourComponent } from "../start-doctor-visit-tour/start-doctor-visit-tour.component";

@Component({
  selector: "sample-fast-actions",
  templateUrl: "./fast-actions.component.html",
  styleUrls: ["./fast-actions.component.scss"],
})
export class FastActionsComponent implements OnInit, OnDestroy {
  constructor(
    private ref: NbDialogRef<FastActionsComponent>,
    private router: Router,
    private dialogService: DialogService
  ) {}

  public getString = getString;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public startDoctorVisit(): void {
    this.ref.close();
    this.dialogService.open(StartDoctorVisitTourComponent, {
      autoFocus: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      context: {},
    });
  }

  public startCalculation(): void {
    this.ref.close();
    this.dialogService.open(StartCalculationComponent, {
      autoFocus: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
      context: {},
    });
  }
}
