import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { AuthService, IUser } from "../../../services/auth.service";
import { PersonsService } from "../../../services/rest/persons.service";
import { SummaryService } from "../../../services/rest/summary.service";
import { EventsService } from "../../../services/rest/events.service";
import { Router } from "@angular/router";

@Component({
  selector: "sample-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private _authService: AuthService,
    private _personsService: PersonsService,
    private _summaryService: SummaryService,
    private _eventsService: EventsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.user = this._authService.getUser();
    this.getPersons();
    this.getSummary();
    this.getEvents();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public getString = getString;
  public user: IUser;
  public currentDate: Date = new Date();
  public persons: any[] = [];
  public unpaidCalculations: number = 0;
  public numberOfPersons: number = 0;
  public events: any[] = [];
  public totalBirthdays: number = 0;

  private getPersons(): void {
    this._subs.push(
      this._personsService
        .getPersonsForUserDashboard()
        .subscribe((data: any) => {
          this.persons = data;
        })
    );
  }

  private getSummary() {
    this._subs.push(
      this._summaryService
        .getUserDashboardSummary(this._authService.getUserId())
        .subscribe((data) => {
          if (data.length > 0) {
            this.unpaidCalculations = data[0].UnpaidCalculations;
            this.numberOfPersons = data[0].Persons;
          }
        })
    );
  }

  private getEvents() {
    this._subs.push(
      this._eventsService.getUserDashboardEvents().subscribe((data) => {
        data.map((x) => {
          x.Start = new Date(x.Start);
          x.End = new Date(x.End);
          return x;
        });
        this.events = data;
        this.totalBirthdays = data.filter((x) => x.EventTypeId == 1).length;
      })
    );
  }

  public goToProfile(personId: number) {
    this._router.navigateByUrl("/pages/profile/" + personId);
  }

  public goToAllEvents() {
    this._router.navigateByUrl("/pages/calendar");
  }
}
