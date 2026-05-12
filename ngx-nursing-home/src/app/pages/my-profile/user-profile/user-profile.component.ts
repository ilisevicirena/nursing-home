import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../../resources/strings";
import { PersonsService } from "../../../services/rest/persons.service";
import { Subscription } from "rxjs";
import { MyProfileService } from "../../../services/rest/my-profile.service";
import { Router } from "@angular/router";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { EditContactInfoComponent } from "./edit-contact-info/edit-contact-info.component";

@Component({
  selector: "sample-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(
    private _personsService: PersonsService,
    private _myProfileService: MyProfileService,
    private _router: Router,
    private _dialogService: DialogService
  ) {}

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.getPersons();
    this.getContactInfo();
  }

  public getString = getString;
  public persons: any[] = [];
  public searchTerm: string = "";
  public contactInfo: any;

  private _subs: Subscription[] = [];

  private getPersons(): void {
    this._subs.push(
      this._personsService.getPersonsForUser().subscribe((data: any) => {
        this.persons = data;
      })
    );
  }

  private getContactInfo(): void {
    this._subs.push(
      this._myProfileService.getContactInfoForUser().subscribe((data: any) => {
        this.contactInfo = data;
      })
    );
  }

  public goToProfile(id: number) {
    this._router.navigateByUrl("/pages/profile/" + id);
  }

  public editContactAndAddress(): void {
    this._subs.push(
      this._dialogService
        .open(EditContactInfoComponent, {
          autoFocus: false,
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            contactInfo: JSON.parse(JSON.stringify(this.contactInfo)),
          },
        })
        .onClose.subscribe((result: boolean) => {
          if (result) this.getContactInfo();
        })
    );
  }
}
