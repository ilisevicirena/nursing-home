import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { DoctorVisitsService } from "../../services/rest/doctor-visits.service";
import {
  GridColumn,
  GridDateColumn,
  GridDateboxFilter,
} from "shared-components";
import { DialogService } from "../../shared/dialog/dialog.service";
import { DoctorVisitDetailsComponent } from "./doctor-visit-details/doctor-visit-details.component";

@Component({
    selector: "sample-doctor-visits",
    templateUrl: "./doctor-visits.component.html",
    styleUrls: ["./doctor-visits.component.scss"],
    standalone: false
})
export class DoctorVisitsComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public getString = getString;
  public visits: any[] = [];
  public columns: GridColumn[] = [
    new GridColumn().Title(getString("id")).DataField("DoctorVisitId"),
    new GridColumn()
      .Title(getString("visitDate"))
      .DataField("Date")
      .Type(new GridDateColumn())
      .Filter(new GridDateboxFilter()),
    new GridColumn().Title(getString("doctors")).DataField("Doctors"),
    new GridColumn().Title(getString("nurses")).DataField("Nurses"),
    new GridColumn()
      .Title(getString("numberOfVisitedPersons"))
      .DataField("Persons"),
  ];

  constructor(
    private _doctorVisitsService: DoctorVisitsService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  private getData(): void {
    this._subs.push(
      this._doctorVisitsService.getData().subscribe((data) => {
        this.visits = data;
      })
    );
  }

  public onSelectionChange(ev: any): void {
    if (ev.selectedRows.length > 0) {
      this._subs.push(
        this._dialogService
          .open(DoctorVisitDetailsComponent, {
            closeOnBackdropClick: true,
            closeOnEsc: true,
            autoFocus: false,
            dialogClass: "doctor-visit-details",
            backdropClass: "doctor-visit-details-backdrop",
            hasBackdrop: true,
            context: {
              id: ev.selectedRows[0].DoctorVisitId,
              tour: ev.selectedRows[0],
            },
          })
          .onClose.subscribe(() => {})
      );
    }
  }
}
