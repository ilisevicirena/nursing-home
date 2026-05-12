import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { SummaryService } from "../../services/rest/summary.service";
import { hexToRgbA } from "../../resources/functions";
import { Router } from "@angular/router";
import { AuthService, UserRole } from "../../services/auth.service";

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy, OnInit {
  private _subs: Subscription[] = [];

  constructor(private _authService: AuthService) {}

  ngOnDestroy() {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {}

  public userRoles = UserRole;

  public checkUserHasRole(role: UserRole): boolean {
    return this._authService.checkUserHasRole(role);
  }
}
