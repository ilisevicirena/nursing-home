import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import {
  GRID_BUTTON_TYPE,
  GridButtonsColumn,
  GridButtonType,
  GridCheckboxColumn,
  GridColumn,
  GridLookupColumn,
  GridSelectFilter,
  IGridCellButton,
  IGridExportDocumentSettings,
} from "shared-components";
import { UsersService } from "../../services/rest/users.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { UserComponent } from "../user/user.component";

@Component({
  selector: "sample-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(
    private _usersService: UsersService,
    private _dialogService: DialogService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private _subs: Subscription[] = [];

  public getString = getString;
  public columns: GridColumn[] = [
    new GridColumn()
      .Type(new GridButtonsColumn().ButtonsFromDataField("Actions"))
      .Title(getString("actions"))
      .Width("50px")
      .Filter(false)
      .Export(false)
      .Sortable(false)
      .Docked(true),
    new GridColumn().Title(getString("firstName")).DataField("FirstName"),
    new GridColumn().Title(getString("lastName")).DataField("LastName"),
    new GridColumn().Title(getString("username")).DataField("Username"),
    new GridColumn().Title(getString("email")).DataField("Email"),
    new GridColumn()
      .Title(getString("role"))
      .DataField("RoleId")
      .Type(new GridLookupColumn().LookupColumn("RoleName"))
      .Filter(
        new GridSelectFilter()
          .ServerDataSource(true)
          .ServerEndpoint(this._usersService.apiRoute + "/getRoles")
          .KeyExpression("RoleId")
          .DisplayExpression("RoleName")
      ),
    new GridColumn()
      .Type(new GridCheckboxColumn())
      .Title(getString("userActiveState"))
      .DataField("Active"),
    new GridColumn()
      .Type(new GridCheckboxColumn())
      .Title(getString("userBlockedState"))
      .DataField("Blocked"),
    new GridColumn()
      .Type(new GridCheckboxColumn())
      .Title(getString("userVerifiedState"))
      .DataField("Verified"),
  ];
  public data: any[] = [];
  public exportSettings: IGridExportDocumentSettings = {
    title: getString("users"),
    showOrdinalNumbers: true,
    docName: "users",
  };

  private getData(): void {
    this._subs.push(
      this._usersService.getData().subscribe((data) => {
        data = data.map((x: any) => {
          x.Actions = [
            new GridButtonType()
              .Type(GRID_BUTTON_TYPE.EDIT)
              .Ghost(true)
              .Icon("edit-2-outline")
              .Shape("round")
              .Tooltip(getString("gridEditTooltip")),
          ];

          if (x.Blocked) {
            x.Actions.push(
              new GridButtonType()
                .Ghost(true)
                .Icon("unlock-outline")
                .Shape("round")
                .Status("warning")
                .Text(getString("unblockUser"))
                .TooltipDisabled(true)
                .Id("unblockUser")
            );
          } else {
            x.Actions.push(
              new GridButtonType()
                .Ghost(true)
                .Icon("lock-outline")
                .Shape("round")
                .Status("warning")
                .Text(getString("blockUser"))
                .TooltipDisabled(true)
                .Id("blockUser")
            );
          }

          if (x.Active) {
            x.Actions.push(
              new GridButtonType()
                .Ghost(true)
                .Icon("person-delete-outline")
                .Shape("round")
                .Status("danger")
                .Text(getString("deactivateUser"))
                .TooltipDisabled(true)
                .Id("deactivateUser")
            );
          } else {
            x.Actions.push(
              new GridButtonType()
                .Ghost(true)
                .Icon("person-done-outline")
                .Shape("round")
                .Status("success")
                .Text(getString("activateUser"))
                .TooltipDisabled(true)
                .Id("activateUser")
            );
          }

          x.Actions.push(
            new GridButtonType()
              .Ghost(true)
              .Icon("trash-2-outline")
              .Shape("round")
              .Status("danger")
              .Tooltip(getString("deleteUser"))
              .Id("deleteUser")
          );

          return x;
        });

        this.data = data;
      })
    );
  }

  public onCreateStarted(): void {
    this._subs.push(
      this._dialogService
        .open(UserComponent, {
          autoFocus: false,
          closeOnEsc: false,
          closeOnBackdropClick: false,
          context: {
            isNew: true,
          },
        })
        .onClose.subscribe((result: boolean) => {
          if (result) this.getData();
        })
    );
  }

  public onEditStarted(event: any): void {
    this._subs.push(
      this._dialogService
        .open(UserComponent, {
          autoFocus: false,
          closeOnEsc: false,
          closeOnBackdropClick: false,
          context: {
            isNew: false,
            user: {
              Id: event.data.Id,
              FirstName: event.data.FirstName,
              LastName: event.data.LastName,
              Username: event.data.Username,
              Email: event.data.Email,
              DateRegistered: event.data.DateRegistered,
            },
          },
        })
        .onClose.subscribe((result: boolean) => {
          if (result) this.getData();
        })
    );
  }

  public onActionBtnClick(e: IGridCellButton) {
    switch (e.button.getId()) {
      case "blockUser":
        this.blockUnblockUser(e.row.Id, true);
        break;
      case "unblockUser":
        this.blockUnblockUser(e.row.Id, false);
        break;
      case "activateUser":
        this.activateDeactivateUser(e.row.Id, true);
        break;
      case "deactivateUser":
        this.activateDeactivateUser(e.row.Id, false);
        break;
      case "deleteUser":
        this.deleteUser(e.row.Id);
        break;
    }
  }

  public async blockUnblockUser(userId, blocked: boolean = false) {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString(blocked ? "wantToBlockUser" : "wantToUnblockUser")
    );

    if (rez) {
      this._subs.push(
        this._usersService.blockUnblockUser(userId, blocked).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        })
      );
    }
  }

  public async activateDeactivateUser(userId, active: boolean = false) {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString(active ? "wantToActivateUser" : "wantToDeactivateUser")
    );

    if (rez) {
      this._subs.push(
        this._usersService
          .activateDeactivateUser(userId, active)
          .subscribe(() => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getData();
          })
      );
    }
  }

  public async deleteUser(userId: string) {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDeleteUser")
    );

    if (rez) {
      this._subs.push(
        this._usersService.deleteUser(userId).subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        })
      );
    }
  }
}
