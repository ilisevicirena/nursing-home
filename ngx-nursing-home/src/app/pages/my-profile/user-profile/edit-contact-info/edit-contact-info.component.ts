import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { getString } from "../../../../resources/strings";
import { Subscription } from "rxjs";
import { CitiesService } from "../../../../services/rest/cities.service";
import { ContactsService } from "../../../../services/rest/contacts.service";
import { ToastrService } from "../../../../services/toastr.service";

@Component({
    selector: "sample-edit-contact-info",
    templateUrl: "./edit-contact-info.component.html",
    styleUrls: ["./edit-contact-info.component.scss"],
    standalone: false
})
export class EditContactInfoComponent implements OnInit, OnDestroy {
  constructor(
    private _ref: NbDialogRef<EditContactInfoComponent>,
    private _citiesService: CitiesService,
    private _contactsService: ContactsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCities();
    if (this.contactInfo.ResidanceCityId)
      this.residanceCityId = [this.contactInfo.ResidanceCityId];
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public contactInfo: any = {};
  public cities: any[] = [];
  public getString = getString;
  public residanceCityId = [];

  private _subs: Subscription[] = [];

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public saveData(): void {
    this.contactInfo.ResidanceCityId = this.residanceCityId[0];
    this._subs.push(
      this._contactsService.update(this.contactInfo).subscribe(() => {
        this._toastrService.showToast("success", getString("saveSuccess"));
        this.close(true);
      })
    );
  }

  public onKeyPress(event: any): boolean | null {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  public getCities(): void {
    this._citiesService.get().then((data) => {
      this.cities = data;
    });
  }
}
