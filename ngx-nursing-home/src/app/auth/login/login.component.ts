import { Component, OnDestroy, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { getString } from "../../resources/strings";
import { AuthService, ILoginInfo } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "sample-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._subs.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public brandName: string = environment.brand.Name;
  public showPassword: boolean = false;
  public getString = getString;
  public identifier: string;
  public password: string;
  public loginClicked: boolean = false;
  public loading: boolean = false;

  private _subs: Subscription[] = [];

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  public getInputType(): string {
    if (this.showPassword) return "text";
    else return "password";
  }

  public loginClick() {
    this.loginClicked = true;

    if (this.identifier && this.password) {
      this.loading = true;

      var loginInfo: ILoginInfo = {
        Identifier: this.identifier,
        Password: this.password,
      };

      this._subs.push(
        this._authService.login(loginInfo).subscribe(
          (data: any) => {
            this.loading = false;
            if (data.Authenticated) this._router.navigate(["pages/dashboard"]);
          },
          (err) => {
            this.loading = false;
          }
        )
      );
    }
  }

  public resetPassword() {
    this._router.navigate(["auth/forgot-password"]);
  }

  public getUserNameStatus(): string {
    if (this.loginClicked && !this.identifier) return "danger";
    else return "basic";
  }

  public getPasswordStatus(): string {
    if (this.loginClicked && !this.password) return "danger";
    else return "basic";
  }
}
