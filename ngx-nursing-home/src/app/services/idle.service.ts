import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { fromEvent, merge, Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IdleService {
  private activitySubscription: Subscription;
  private idleTimeoutId: any;
  private readonly IDLE_TIME = 3600000; // 1 hour in milliseconds

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.startWatching();
  }

  private startWatching(): void {
    this.ngZone.runOutsideAngular(() => {
      const activityEvents = merge(
        fromEvent(document, "mousemove"),
        fromEvent(document, "mousedown"),
        fromEvent(document, "keypress"),
        fromEvent(document, "touchstart"),
        fromEvent(document, "scroll")
      );

      this.activitySubscription = activityEvents
        .pipe(
          debounceTime(1000), // Only reset timer if there's no activity for 1 second
          tap(() => this.resetTimer())
        )
        .subscribe();
    });

    this.resetTimer();
  }

  private resetTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.idleTimeoutId) {
        clearTimeout(this.idleTimeoutId);
      }
      this.idleTimeoutId = setTimeout(() => this.logout(), this.IDLE_TIME);
    });
  }

  private logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl("/auth/login");
    });
  }

  ngOnDestroy(): void {
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
    if (this.idleTimeoutId) {
      clearTimeout(this.idleTimeoutId);
    }
  }
}
