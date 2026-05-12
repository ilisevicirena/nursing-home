import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService, UserRole } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.authService.isAuthenticated() &&
      this.authService.checkUserHasRole(UserRole.ADMIN)
    ) {
      return true;
    }
    this.router.navigate(["pages/page-not-found"]);
    return false;
  }
}
