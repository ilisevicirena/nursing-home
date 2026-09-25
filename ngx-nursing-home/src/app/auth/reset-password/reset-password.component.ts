import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService, IResetPasswordInfo } from "../../services/auth.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";

@Component({
    selector: "sample-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
    standalone: false
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._subs.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public brandName: string = environment.brand.Name;
  public getString = getString;

  public oldPassword: string;
  public newPassword: string;
  public retypedPassword: string;

  public showOldPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showRetypedPassword: boolean = false;
  public showSuccessMessage: boolean = false;
  public loading: boolean = false;

  private _resetClicked: boolean = false;

  private _subs: Subscription[] = [];

  public toggleShowOldPassword(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  public toggleShowNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  public toggleShowRetypedPassword(): void {
    this.showRetypedPassword = !this.showRetypedPassword;
  }

  public getOldPasswordInputType(): string {
    if (this.showOldPassword) return "text";
    else return "password";
  }

  public getNewPasswordInputType(): string {
    if (this.showNewPassword) return "text";
    else return "password";
  }

  public getRetypedPasswordInputType(): string {
    if (this.showRetypedPassword) return "text";
    else return "password";
  }

  public resetPassword() {
    this._router.navigate(["auth/reset-password"]);
  }

  public getOldPasswordStatus(): string {
    if (this._resetClicked && !this.oldPassword) return "danger";
    else return "basic";
  }

  public getNewPasswordStatus(): string {
    if (this._resetClicked && !this.newPassword) return "danger";
    else return "basic";
  }

  public getRetypedPasswordStatus(): string {
    if (
      (this._resetClicked && !this.retypedPassword) ||
      this.newPassword != this.retypedPassword
    )
      return "danger";
    else return "basic";
  }

  public resetPasswordClick() {
    this._resetClicked = true;

    if (
      this.oldPassword &&
      this.newPassword &&
      this.newPassword == this.retypedPassword
    ) {
      this.loading = true;

      var passwordResetObj: IResetPasswordInfo = {
        UserId: this._authService.getUserId(),
        OldPassword: this.oldPassword,
        NewPassword: this.newPassword,
      };

      this._subs.push(
        this._authService.resetPassword(passwordResetObj).subscribe(
          () => {
            this.showSuccessMessage = true;
            this.logout();
          },
          (err) => {
            this.loading = false;
          }
        )
      );
    }
  }

  private logout() {
    this._subs.push(
      this._authService.logout().subscribe(() => {
        setTimeout(() => {
          this._router.navigate(["auth/login"]);
        }, 7000);
      })
    );
  }

  public cancel() {
    this._router.navigate(["pages/dashboard"]);
  }
}
