import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { AuthService, IUser } from "../../../../services/auth.service";
import { getString } from "../../../../resources/strings";
import { Router } from "@angular/router";

@Component({
  selector: "sample-user-info-pane",
  templateUrl: "./user-info-pane.component.html",
  styleUrls: ["./user-info-pane.component.scss"],
})
export class UserInfoPaneComponent implements OnInit, OnDestroy {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  @Output() destroy: EventEmitter<boolean> = new EventEmitter();

  public user: IUser;
  public getString = getString;

  public logout(): void {
    this._authService.logout().subscribe(() => {
      this._router.navigateByUrl("/auth/login");
    });

    this.destroy.emit(true);
  }

  public changePassword() {
    this._router.navigateByUrl("/auth/reset-password");
    this.destroy.emit(true);
  }

  public goToProfile(): void {
    this._router.navigateByUrl("/pages/my-profile");
    this.destroy.emit(true);
  }
}
