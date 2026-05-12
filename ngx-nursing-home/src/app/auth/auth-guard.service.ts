import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) return true;
    else {
      this.router.navigate(["auth/login"]);
      return false;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    if (route.data && route.data.Roles) {
      return Promise.all([this.canActivate()]).then((authenticated) => {
        if (authenticated[0]) {
          var userHasPermission: boolean = false;
          route.data.Roles.forEach((role) => {
            if (this.authService.checkUserHasRole(role))
              userHasPermission = true;
          });

          if (userHasPermission) return true;
          else {
            this.router.navigate(["pages/page-not-found"]);
            return false;
          }
        }
      });
    }

    return true;
  }
}
