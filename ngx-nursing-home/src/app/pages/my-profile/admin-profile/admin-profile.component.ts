import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { PersonsService } from "../../../services/rest/persons.service";

@Component({
    selector: "sample-admin-profile",
    templateUrl: "./admin-profile.component.html",
    styleUrls: ["./admin-profile.component.scss"],
    standalone: false
})
export class AdminProfileComponent implements OnInit, OnDestroy {
  constructor(
    private _personsService: PersonsService,
    private _router: Router
  ) {}

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.getPersons();
  }

  public getString = getString;
  public persons: any[] = [];
  public searchTerm: string = "";

  private _subs: Subscription[] = [];

  private getPersons(): void {
    this._subs.push(
      this._personsService.getPersonsForUser().subscribe((data: any) => {
        this.persons = data;
      })
    );
  }

  public goToProfile(id: number) {
    this._router.navigateByUrl("/pages/profile/" + id);
  }
}
