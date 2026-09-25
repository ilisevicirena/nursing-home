import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NbDialogRef } from "@nebular/theme";
import { CalculationApiService } from "../../../services/rest/calculation-api.service";
import { ToastrService } from "../../../services/toastr.service";
import { CalculationService } from "../../../services/calculation.service";

@Component({
    selector: "sample-real-price-modal",
    templateUrl: "./real-price-modal.component.html",
    styleUrls: ["./real-price-modal.component.scss"],
    standalone: false
})
export class RealPriceModalComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public getString = getString;
  public realPrice: string;
  public id: number;

  constructor(
    private _ref: NbDialogRef<RealPriceModalComponent>,
    private _calculationService: CalculationService,
    private _calcService: CalculationApiService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.realPrice = this.realPrice.replace(",", "");
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public onPriceChange(): void {
    this.realPrice = this._calculationService.roundToTwoDecimals(
      this.realPrice as any
    ) as any;
  }

  public onSaveClick(): void {
    this._subs.push(
      this._calcService
        .calculationRealPriceSave({ Id: this.id, RealPrice: this.realPrice })
        .subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.close(true);
        })
    );
  }
}
