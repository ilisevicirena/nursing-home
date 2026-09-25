import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService, IUser, UserRole } from "../../services/auth.service";
import { getString } from "../../resources/strings";
import { MyProfileService } from "../../services/rest/my-profile.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { DialogService } from "../../shared/dialog/dialog.service";
import { UserComponent } from "../user/user.component";
import { ToastrService } from "../../services/toastr.service";

@Component({
    selector: "sample-my-profile",
    templateUrl: "./my-profile.component.html",
    styleUrls: ["./my-profile.component.scss"],
    standalone: false
})
export class MyProfileComponent implements OnInit, OnDestroy {
  public user: IUser;
  public getString = getString;
  public firstLogin: Date = null;
  public lastPasswordChange: Date = null;
  public lastDataChange: Date = null;
  public unreadNotifications: number = 0;
  public userRoles = UserRole;

  private _subs: Subscription[] = [];

  constructor(
    private _authService: AuthService,
    private _myProfileService: MyProfileService,
    private _router: Router,
    private _dialogService: DialogService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getUser();
    this.getBasicData();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public checkUserHasRole(role: UserRole): boolean {
    return this._authService.checkUserHasRole(role);
  }

  private getBasicData(): void {
    this._subs.push(
      this._myProfileService.getBasicData().subscribe((data) => {
        if (data.FirstLogin) this.firstLogin = new Date(data.FirstLogin);
        if (data.LastDataChange)
          this.lastDataChange = new Date(data.LastDataChange);
        if (data.LastPasswordChange)
          this.lastPasswordChange = new Date(data.LastPasswordChange);
        if (data.UnreadNotifications)
          this.unreadNotifications = data.UnreadNotifications;
      })
    );
  }

  public changePassword(): void {
    this._router.navigateByUrl("/auth/reset-password");
  }

  public editUserBasicData(): void {
    this._subs.push(
      this._dialogService
        .open(UserComponent, {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            user: this.user,
            isNew: false,
            onlyBasicData: true,
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this._toastrService.showToast(
              "warning",
              getString("logoutAndRedirectShortly")
            );
            setTimeout(() => {
              this._authService.logout().subscribe(() => {
                this._router.navigateByUrl("/auth/login");
              });
            }, 2000);
          }
        })
    );
  }
}
