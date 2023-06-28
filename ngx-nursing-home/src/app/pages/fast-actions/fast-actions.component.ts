import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { getString } from '../../resources/strings';
import { Router } from '@angular/router';
import { DialogService } from '../../shared/dialog/dialog.service';
import { StartCalculationComponent } from '../calculation/start-calculation/start-calculation.component';

@Component({
  selector: 'sample-fast-actions',
  templateUrl: './fast-actions.component.html',
  styleUrls: ['./fast-actions.component.scss']
})
export class FastActionsComponent implements OnInit, OnDestroy {

  constructor(
    private ref: NbDialogRef<FastActionsComponent>,
    private router: Router,
    private dialogService: DialogService
  ) { }

  public getString = getString;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  public startDoctorVisit(): void {
    this.router.navigateByUrl('/pages/doctor-visit-tour');
  }

  public startCalculation(): void {
    this.ref.close();
    this.dialogService.open(
      StartCalculationComponent,
      {
        autoFocus: false,
        closeOnBackdropClick: false,
        closeOnEsc: false,
        context: {

        }
      }
    )
  }
}
