import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getString } from '../../../resources/strings';
import { NbDialogRef } from '@nebular/theme';
import { CalculationApiService } from '../../../services/rest/calculation-api.service';
import { ToastrService } from '../../../services/toastr.service';
import { CalculationService } from '../../../services/calculation.service';

@Component({
  selector: 'sample-real-price-modal',
  templateUrl: './real-price-modal.component.html',
  styleUrls: ['./real-price-modal.component.scss']
})
export class RealPriceModalComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public getString = getString;
  public realPrice: string;
  public id: number;

  constructor(
    private ref: NbDialogRef<RealPriceModalComponent>,
    private calculationService: CalculationService,
    private calcService: CalculationApiService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.realPrice = this.realPrice.replace(",", "");
  }

  ngOnDestroy(): void {
    this.subs.forEach(element => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this.ref.close(result);
  }

  public onPriceChange(): void {
    this.realPrice = this.calculationService.roundToTwoDecimals(this.realPrice as any) as any;
  }

  public onSaveClick(): void {
    this.subs.push(
      this.calcService.calculationRealPriceSave({ Id: this.id, RealPrice: this.realPrice }).subscribe(() => {
        this.toastrService.showToast('success', getString('saveSuccess'));
        this.close(true);
      })
    );
  }

}
