import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../../resources/strings";
import { DiscountsService } from "../../../services/rest/discounts.service";
import { Subscription } from "rxjs";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "sample-discounts-picker",
  templateUrl: "./discounts-picker.component.html",
  styleUrls: ["./discounts-picker.component.scss"],
})
export class DiscountsPickerComponent implements OnInit, OnDestroy {
  public getString = getString;
  public discounts: any[] = [];
  public selectedDiscounts: any[] = [];

  private _subs: Subscription[] = [];

  constructor(
    private _ref: NbDialogRef<DiscountsPickerComponent>,
    private _discountsService: DiscountsService
  ) {}

  ngOnInit(): void {
    this.getDiscounts();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    var res = {
      saved: result,
      discounts: this.selectedDiscounts,
    };

    this._ref.close(res);
  }

  private getDiscounts(): void {
    this._subs.push(
      this._discountsService.getData().subscribe((data) => {
        this.discounts = data;
        this.discounts.map((x) => {
          if (this.selectedDiscounts.find((y) => y.Id == x.Id))
            x.selected = true;
          else x.selected = false;

          return x;
        });
      })
    );
  }

  public toggleDiscount(discount: any): void {
    discount.selected = !discount.selected;
    if (discount.selected) this.selectedDiscounts.push(discount);
    else
      this.selectedDiscounts.splice(
        this.selectedDiscounts.findIndex((x) => x.Id == discount.Id),
        1
      );
  }

  public clearAll(): void {
    this.selectedDiscounts = [];
    this.discounts.map((x) => (x.selected = false));
  }
}
