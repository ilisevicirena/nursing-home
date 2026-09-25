import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import { getString } from "../../../resources/strings";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  DiscountsService,
  IDiscount,
} from "../../../services/rest/discounts.service";
import { ToastrService } from "../../../services/toastr.service";

@Component({
    selector: "sample-add-edit-discount",
    templateUrl: "./add-edit-discount.component.html",
    styleUrls: ["./add-edit-discount.component.scss"],
    standalone: false
})
export class AddEditDiscountComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public getString = getString;
  public isNew: boolean = true;
  public discount: IDiscount = {
    Id: 0,
    Name: undefined,
    Description: undefined,
    PercentCalculation: true,
    Quantity: undefined,
  };

  private _subs: Subscription[] = [];

  @ViewChild("headerTemplate") headerTemplate!: TemplateRef<any>;

  constructor(
    private _ref: NbWindowRef,
    private _discountsService: DiscountsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    var windows = document.getElementsByClassName("discount-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.remove("h-100");
      window.parentElement.classList.remove("w-100");
      window.parentElement.parentElement.classList.remove("h-100");
      const cdkOverlayContainer =
        window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0)
        cdkOverlayContainer.children[0].classList.remove("d-block");
    }

    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    var windows = document.getElementsByClassName("discount-popup-window");

    for (let index = 0; index < windows.length; index++) {
      const window = windows[index];
      window.parentElement.classList.add("h-100");
      window.parentElement.classList.add("w-100");
      window.parentElement.parentElement.classList.add("h-100");
      window.parentElement.parentElement.style.width = "70%";
      const cdkOverlayContainer =
        window.parentElement.parentElement.parentElement.parentElement;
      if (cdkOverlayContainer.children.length > 0)
        cdkOverlayContainer.children[0].classList.add("d-block");
    }

    this._ref.config.titleTemplate = this.headerTemplate;
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public onSaveClick(form: NgForm): void {
    if (this.isNew) this.saveNewDiscount();
    else this.editDiscount();
    form.form.markAsPristine();
  }

  private saveNewDiscount(): void {
    this._subs.push(
      this._discountsService.add(this.discount).subscribe(
        (data) => {
          if (data.DiscountId) {
            this._toastrService.showToast(
              "success",
              getString("saveSuccess"),
              ""
            );
            this.close(true);
          }
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  private editDiscount(): void {
    this._subs.push(
      this._discountsService.update(this.discount).subscribe(
        () => {
          this._toastrService.showToast(
            "success",
            getString("saveSuccess"),
            ""
          );
          this.close(true);
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }
}
