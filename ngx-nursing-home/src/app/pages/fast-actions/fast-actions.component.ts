import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { getString } from '../../resources/strings';
import { Router } from '@angular/router';

@Component({
  selector: 'sample-fast-actions',
  templateUrl: './fast-actions.component.html',
  styleUrls: ['./fast-actions.component.scss']
})
export class FastActionsComponent implements OnInit, OnDestroy {

  constructor(
    private ref: NbDialogRef<FastActionsComponent>,
    private router: Router
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

  }
}
