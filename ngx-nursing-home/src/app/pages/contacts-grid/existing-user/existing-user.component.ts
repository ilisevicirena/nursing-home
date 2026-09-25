import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UsersService } from "../../../services/rest/users.service";
import { ContactsService } from "../../../services/rest/contacts.service";
import { ToastrService } from "../../../services/toastr.service";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import {
  GridCheckboxColumn,
  GridColumn,
  GridComponent,
} from "shared-components";
import { NbDialogRef } from "@nebular/theme";
import { MyProfileService } from "../../../services/rest/my-profile.service";

@Component({
    selector: "sample-existing-user",
    templateUrl: "./existing-user.component.html",
    styleUrls: ["./existing-user.component.scss"],
    standalone: false
})
export class ExistingUserComponent implements OnInit, OnDestroy {
  constructor(
    private _usersService: UsersService,
    private _contactsService: ContactsService,
    private _toastrService: ToastrService,
    private _ref: NbDialogRef<ExistingUserComponent>,
    private _myProfileService: MyProfileService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private _subs: Subscription[] = [];

  @ViewChild(GridComponent) grid: GridComponent;
  public users: any[] = [];
  public getString = getString;
  public personId: number;
  public columns: GridColumn[] = [
    new GridColumn().Title(getString("firstName")).DataField("FirstName"),
    new GridColumn().Title(getString("lastName")).DataField("LastName"),
    new GridColumn().Title(getString("username")).DataField("Username"),
    new GridColumn().Title(getString("email")).DataField("Email"),
    new GridColumn()
      .Type(new GridCheckboxColumn())
      .Title(getString("userActiveState"))
      .DataField("Active"),
  ];

  private getUsers(): void {
    this._subs.push(
      this._usersService.getData().subscribe((data) => {
        this.users = data;
      })
    );
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public saveClick(): void {
    var selected = this.grid.getSelectedRows();
    if (selected.length > 0) {
      this._subs.push(
        this._myProfileService
          .getContactInfoForUserId(selected[0].Id)
          .subscribe((data) => {
            this.saveNewContact(data, selected[0]);
          })
      );
    }
  }

  public saveNewContact(data, selectedUser): void {
    if (!data) {
      data = {
        FirstName: selectedUser.FirstName,
        LastName: selectedUser.LastName,
        Email: selectedUser.Email,
      };
    }

    data.Id = null;
    data.IsGuardian = false;
    data.IsObligeeToPay = false;
    data.PersonId = this.personId;
    data.UserId = selectedUser.Id;

    this._subs.push(
      this._contactsService.add(data).subscribe(() => {
        this._toastrService.showToast("success", getString("saveSuccess"));
        this.close(true);
      })
    );
  }
}
