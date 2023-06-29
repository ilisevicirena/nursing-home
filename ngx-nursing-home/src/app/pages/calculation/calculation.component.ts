import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../resources/strings';
import { CalculationApiService } from '../../services/rest/calculation-api.service';
import { CalculationService } from '../../services/calculation.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ToastrService } from '../../services/toastr.service';
import { ServicesManagementService } from '../../services/rest/services-management.service';
import { ScheduleMonth } from 'shared-components/lib/models/schedule.model';
import { getMonthNames, getYearsInRange } from '../../resources/functions';

@Component({
  selector: 'sample-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public month: number = new Date().getMonth();
  public year: number = new Date().getFullYear();
  public calculations: any[] = [];
  public months: ScheduleMonth[] = [];
  public years: number[] = [];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calculationService: CalculationApiService,
    private calcService: CalculationService,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private servicesManagementService: ServicesManagementService
  ) { }

  ngOnInit(): void {
    this.months = getMonthNames(this.locale);
    this.years = getYearsInRange();
    this.getCalculations();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getCalculations(): void {
    this.subs.push(
      this.calculationService.getCalculations(this.month + 1, this.year).subscribe(data => {
        this.calculations = data;
      })
    );
  }
}
