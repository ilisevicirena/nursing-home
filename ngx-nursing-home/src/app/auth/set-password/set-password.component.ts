import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService, ISetPasswordInfo } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";

@Component({
    selector: "sample-set-password",
    templateUrl: "./set-password.component.html",
    styleUrls: ["./set-password.component.scss"],
    standalone: false
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._subs.push(
      this._activatedRoute.queryParamMap.subscribe((params) => {
        this._token = params.get("token");
      })
    );
  }
  ngOnDestroy(): void {
    this._subs.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public brandName: string = environment.brand.Name;
  public getString = getString;
  public newPassword: string;
  public retypedPassword: string;
  public showNewPassword: boolean = false;
  public showRetypedPassword: boolean = false;
  public showSuccessMessage: boolean = false;
  public loading: boolean = false;

  private _resetClicked: boolean = false;
  private _token: string;
  private _subs: Subscription[] = [];

  public toggleShowNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  public toggleShowRetypedPassword(): void {
    this.showRetypedPassword = !this.showRetypedPassword;
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

    if (this.newPassword && this.newPassword == this.retypedPassword) {
      this.loading = true;

      var passwordResetObj: ISetPasswordInfo = {
        Token: this._token,
        NewPassword: this.newPassword,
      };

      this._subs.push(
        this._authService.setPassword(passwordResetObj).subscribe(
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
}
