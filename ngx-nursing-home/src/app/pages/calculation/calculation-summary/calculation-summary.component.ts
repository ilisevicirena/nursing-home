import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';

@Component({
  selector: 'sample-calculation-summary',
  templateUrl: './calculation-summary.component.html',
  styleUrls: ['./calculation-summary.component.scss']
})
export class CalculationSummaryComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public month: number;
  public year: number;
  public summary: any;
  public getString = getString;
  public percent: string = "";
  public dates: any;

  constructor(
    private ref: NbDialogRef<CalculationSummaryComponent>,
    private calculationService: CalculationApiService
  ) { }

  ngOnInit(): void {
    if (this.month && this.year) this.getSummary();
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  private getSummary(): void {
    this.subs.push(
      this.calculationService.getCalculationSummary(this.month, this.year).subscribe(data => {
        this.summary = data.Summary;
        this.percent = Math.trunc((this.summary.CalculatedForPersons / this.summary.Persons) * 100) + "%";
        this.dates = data.Calculation;
      })
    );
  }

  public close(): void {
    this.ref.close();
  }
}
