import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbDialogRef, NbMenuItem, NbMenuService } from "@nebular/theme";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { filter, map } from "rxjs/operators";
import { IUser } from "../../services/auth.service";
import {
  IUserSaveModel,
  IVerifyUserEmail,
  UsersService,
} from "../../services/rest/users.service";
import { ToastrService } from "../../services/toastr.service";
import { environment } from "../../../environments/environment";
import { DialogService } from "../../shared/dialog/dialog.service";

@Component({
    selector: "sample-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    standalone: false
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(
    private _ref: NbDialogRef<UserComponent>,
    private _menuService: NbMenuService,
    private _usersService: UsersService,
    private _toastrService: ToastrService,
    private _dialogService: DialogService
  ) {}

  ngOnDestroy(): void {
    this._subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this._subs.push(
      this._menuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => {
            return tag?.startsWith("user-profile-menu");
          }),
          map(({ item }) => item)
        )
        .subscribe((item: NbMenuItem) => {
          this.items.map((item: NbMenuItem) => {
            item.selected = false;
          });

          item.selected = true;
          this.selectedTab = item.data;
        })
    );

    if (!this.onlyBasicData) {
      this.items.push(
        {
          title: getString("userRights"),
          link: "",
          icon: "shield-outline",
          skipLocationChange: true,
          selected: false,
          data: "userRights",
        },
        {
          title: getString("userStatuses"),
          link: "",
          icon: "unlock-outline",
          skipLocationChange: true,
          selected: false,
          data: "statuses",
        }
      );
    }

    if (this.isNew) {
      this.userBadgeText = getString("badgeNew");
      this.userBadgeStatus = "info";
      this.userShowName = getString("newUserTitle");
      if (this.user.Email && !this.user.Username)
        this.user.Username = this.user.Email.split("@")[0];
    } else {
      this.userShowName =
        (this.user?.FirstName || "") + " " + (this.user?.LastName || "");
      this.getUserData();
    }

    this.getRoles();
  }

  private _subs: Subscription[] = [];
  private _userSaved: boolean = false;

  public getString = getString;
  public isNew: boolean = true;
  public selectedTab: string = "basicInformation";
  public userBadgeText: string;
  public userBadgeStatus: string;
  public userShowName: string;
  public user: IUser = {
    Id: null,
    FirstName: null,
    LastName: null,
    Username: null,
    Email: null,
    DateRegistered: new Date().toLocaleDateString(),
  };
  public contactId: number = null;
  public employeeId: number = null;
  public roles: any[] = [];
  public roleId: number = null;
  public roleDescription: string = null;
  public isUserVerified: boolean = false;
  public isUserBlocked: boolean = false;
  public isUserActive: boolean = false;
  public userVerificationToken: any = null;
  public onlyBasicData: boolean = false;

  private _data;

  items: NbMenuItem[] = [
    {
      title: getString("basicData"),
      link: "",
      icon: "credit-card-outline",
      skipLocationChange: true,
      selected: true,
      data: "basicInformation",
    },
  ];

  public close(result: boolean) {
    this._ref.close(this._userSaved);
  }

  public saveBasicUser() {
    var saveObj: IUserSaveModel = {
      Id: this.user.Id,
      FirstName: this.user.FirstName,
      LastName: this.user.LastName,
      Email: this.user.Email,
      Username: this.user.Username,
      DateRegistered: this.user.DateRegistered,
      ContactId: this.contactId,
      EmployeeId: this.employeeId,
    };

    if (this.user.FirstName && this.user.LastName && this.user.Username) {
      if (this.isNew) {
        this._subs.push(
          this._usersService.add(saveObj as any).subscribe((data: any) => {
            this._userSaved = true;
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.user.Id = data.UserId;
            this.getUserData();
          })
        );
      } else {
        this._subs.push(
          this._usersService.update(saveObj as any).subscribe((data: any) => {
            this._userSaved = true;
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getUserData();
          })
        );
      }
    }
  }

  private getUserData() {
    this._subs.push(
      this._usersService.getUserData(this.user.Id).subscribe((data: any) => {
        console.log(data);
        this._data = data;
        this.user = data.User;
        this.userShowName = data.User.FirstName + " " + data.User.LastName;
        this.isUserActive = data.User.Active;
        this.isUserVerified = data.User.Verified;
        this.isUserBlocked = data.User.Blocked;

        if (!data.User.Active) {
          this.userBadgeStatus = "danger";
          this.userBadgeText = getString("userInactive");
        } else if (!data.User.Verified) {
          this.userBadgeStatus = "basic";
          this.userBadgeText = getString("userNotVerified");
          this.checkVerificationTokenForUser();
        } else if (data.User.Blocked) {
          this.userBadgeStatus = "warning";
          this.userBadgeText = getString("userBlocked");
        } else {
          this.userBadgeStatus = "success";
          this.userBadgeText = getString("userActive");
        }

        if (data.Roles.length > 0) {
          this.roleId = data.Roles[0].RoleId;
          this.roleDescription = data.Roles[0].RoleDescription;
        }
      })
    );
  }

  private getRoles() {
    this._subs.push(
      this._usersService.getRoles().subscribe((data: any) => {
        this.roles = data;
      })
    );
  }

  private checkVerificationTokenForUser() {
    this._subs.push(
      this._usersService
        .checkVerificationTokenForUser(this.user.Id)
        .subscribe((data: any) => {
          console.log(data);
          this.userVerificationToken = data[0];
        })
    );
  }

  public cancel() {
    if (this.isNew) {
      this.user = {
        Id: null,
        FirstName: null,
        LastName: null,
        Username: null,
        Email: null,
        DateRegistered: new Date().toLocaleDateString(),
      };
    } else this.getUserData();
  }

  public roleSelectedChange(e) {
    var x = this.roles.find((x) => x.RoleId == e);
    if (x) this.roleDescription = x.Description;
  }

  public saveUserRole() {
    this._subs.push(
      this._usersService
        .changeUserRole(this.user.Id, this.roleId)
        .subscribe(() => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getUserData();
        })
    );
  }

  public cancelRoleSave() {
    this.getUserData();
  }

  public sendVerificationEmail() {
    var dataToSend: IVerifyUserEmail = {
      Email: this.user.Email,
      UserId: this.user.Id,
      Subject: getString("verifyUserEmailSubject"),
      Message: getString("verifyUserEmailTemplate"),
      AppUrl: window.location.origin + "/auth/set-password",
      Brand: environment.brand.Name,
    };

    this._subs.push(
      this._usersService.sendVerificationEmail(dataToSend).subscribe(() => {
        this._toastrService.showToast("success", getString("emailSent"));
        this.checkVerificationTokenForUser();
      })
    );
  }

  public async blockUnblockUser(blocked: boolean = false) {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString(blocked ? "wantToBlockUser" : "wantToUnblockUser")
    );

    if (rez) {
      this._subs.push(
        this._usersService
          .blockUnblockUser(this.user.Id, blocked)
          .subscribe(() => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getUserData();
          })
      );
    }
  }

  public async activateDeactivateUser(active: boolean = false) {
    const rez = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString(active ? "wantToActivateUser" : "wantToDeactivateUser")
    );

    if (rez) {
      this._subs.push(
        this._usersService
          .activateDeactivateUser(this.user.Id, active)
          .subscribe(() => {
            this._toastrService.showToast("success", getString("saveSuccess"));
            this.getUserData();
          })
      );
    }
  }
}
