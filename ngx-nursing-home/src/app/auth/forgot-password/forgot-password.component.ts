import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService, IForgotPasswordInfo } from "../../services/auth.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";

@Component({
  selector: "sample-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subs.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public brandName: string = environment.brand.Name;
  public getString = getString;
  public email: string;
  public resetClicked: boolean = false;
  public showSuccessMessage: boolean = false;
  public loading: boolean = false;

  private _subs: Subscription[] = [];

  public resetPassword() {
    this.resetClicked = true;

    if (this.email) {
      this.loading = true;

      var dataToSend: IForgotPasswordInfo = {
        Email: this.email,
        Subject: getString("resetPasswordEmailSubject"),
        Message: getString("resetPasswordEmailTemplate"),
        AppUrl: window.location.origin + "/auth/set-password",
        Brand: environment.brand.Name,
      };

      this._subs.push(
        this._authService.forgotPassword(dataToSend).subscribe(
          () => {
            this.showSuccessMessage = true;
            this.loading = false;

            setTimeout(() => {
              this._router.navigate(["auth/login"]);
            }, 7000);
          },
          (err) => {
            this.loading = false;
          }
        )
      );
    }
  }

  public cancel() {
    this._router.navigate(["auth/login"]);
  }

  public getEmailStatus(): string {
    if (this.resetClicked && !this.email) return "danger";
    else return "basic";
  }
}
