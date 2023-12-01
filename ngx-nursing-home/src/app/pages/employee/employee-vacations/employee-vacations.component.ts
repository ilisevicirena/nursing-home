import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import {
  GRID_BUTTON_TYPE,
  GridButtonType,
  GridButtonsColumn,
  GridColumn,
  GridComponent,
  GridDateColumn,
  GridDateboxFilter,
  GridSelectFilter,
  GridTagColumn,
  IGridCellButtonClick,
} from "shared-components";
import { VacationsService } from "../../../services/rest/vacations.service";
import { DialogService } from "../../../shared/dialog/dialog.service";
import { ToastrService } from "../../../services/toastr.service";
import { NewVacationComponent } from "../new-vacation/new-vacation.component";
import { ChangeVacationStatusComponent } from "../change-vacation-status/change-vacation-status.component";

@Component({
  selector: "sample-employee-vacations",
  templateUrl: "./employee-vacations.component.html",
  styleUrls: ["./employee-vacations.component.scss"],
})
export class EmployeeVacationsComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  public getString = getString;
  public data: any[] = [];
  public summary: any;

  @Input() employeeId: number;

  @ViewChild(GridComponent) table: GridComponent;
  @ViewChild("changeStatusModal") modalRef: TemplateRef<any>;

  public columns: GridColumn[] = [
    new GridColumn().Title(getString("year")).DataField("Year"),
    new GridColumn()
      .Title(getString("fromDate"))
      .DataField("FromDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy."))
      .Filter(new GridDateboxFilter()),
    new GridColumn()
      .Title(getString("toDate"))
      .DataField("ToDate")
      .Type(new GridDateColumn().Format("dd.MM.yyyy."))
      .Filter(new GridDateboxFilter()),
    new GridColumn().Title(getString("daysTaken")).DataField("DaysTaken"),
    new GridColumn()
      .Title(getString("status"))
      .DataField("StatusId")
      .Width("136px")
      .Type(
        new GridTagColumn()
          .LookupColumn("StatusName")
          .ColorColumn("StatusColor")
      )
      .Filter(
        new GridSelectFilter()
          .KeyExpression("Id")
          .DisplayExpression("Name")
          .ServerDataSource(true)
          .ServerEndpoint(this.vacationsService.apiRoute)
      ),
    new GridColumn()
      .Title(getString("actions"))
      .Type(new GridButtonsColumn().ButtonsFromDataField("Buttons"))
      .DataField("Buttons")
      .Sortable(false)
      .Filter(false)
      .Export(false),
  ];

  constructor(
    private vacationsService: VacationsService,
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.subs.push(
      this.vacationsService
        .getVacationsForPerson(this.employeeId)
        .subscribe((data) => {
          this.data = data;
          this.data.map((x) => {
            x.Buttons = [];
            if (x.StatusId == 1) {
              x.Buttons.push(
                new GridButtonType()
                  .Type(GRID_BUTTON_TYPE.OTHER)
                  .Id("cancel")
                  .Ghost(true)
                  .Shape("round")
                  .Icon("close-square-outline")
                  .Status("warning")
                  .Tooltip(getString("cancelVacation")),
                new GridButtonType()
                  .Id("changeStatus")
                  .Shape("round")
                  .Icon("flip-2-outline")
                  .Ghost(true)
                  .Status("basic")
                  .Tooltip(getString("changeStatus"))
              );
            }
            return x;
          });
        })
    );

    this.subs.push(
      this.vacationsService
        .getRemainingVacationDays(this.employeeId)
        .subscribe((data) => {
          this.summary = data;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public onButtonItemClicked(event: IGridCellButtonClick): void {
    switch (event.button.getId()) {
      case "changeStatus":
        this.subs.push(
          this.dialogService
            .open(ChangeVacationStatusComponent, {
              autoFocus: false,
              closeOnEsc: false,
              closeOnBackdropClick: false,
              context: {
                selectedId: event.row.Id,
              },
            })
            .onClose.subscribe((result) => {
              if (result) this.getData();
            })
        );
        break;
      case "cancel":
        this.cancelVacation(event.row.Id);
        break;
    }
  }

  public openStatusModal(ref: TemplateRef<any>): void {
    this.dialogService.open(ref);
  }

  private async cancelVacation(id: number): Promise<void> {
    const rez = await this.dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToCancelVacation")
    );
    if (rez) {
      this.changeStatus(id, 3);
    }
  }

  private changeStatus(id, statusId) {
    this.subs.push(
      this.vacationsService.changeVacationStatus(id, statusId).subscribe(() => {
        this.toastrService.showToast("success", getString("saveSuccess"));
        this.getData();
      })
    );
  }

  public newVacationClick(): void {
    this.subs.push(
      this.dialogService
        .open(NewVacationComponent, {
          autoFocus: false,
          closeOnEsc: false,
          closeOnBackdropClick: false,
          context: {
            employeeId: this.employeeId,
            summary: this.summary,
          },
        })
        .onClose.subscribe((result) => {
          if (result) this.getData();
        })
    );
  }
}
