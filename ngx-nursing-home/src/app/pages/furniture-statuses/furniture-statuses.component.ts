import { Component, OnDestroy, OnInit } from "@angular/core";
import { FurnitureStatusesService } from "../../services/rest/furniture-statuses.service";
import { ToastrService } from "../../services/toastr.service";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import {
  GridColumn,
  GridSelectEditor,
  GridTextboxEditor,
} from "shared-components";

@Component({
    selector: "sample-furniture-statuses",
    templateUrl: "./furniture-statuses.component.html",
    styleUrls: ["./furniture-statuses.component.scss"],
    standalone: false
})
export class FurnitureStatusesComponent implements OnInit, OnDestroy {
  constructor(
    private _furnitureStatusesService: FurnitureStatusesService,
    private _toastrService: ToastrService
  ) {}

  private _subs: Subscription[] = [];

  public getString = getString;
  public data: any[] = [];
  public columns: GridColumn[] = [
    new GridColumn()
      .Title(getString("id"))
      .DataField("Id")
      .Editable(false)
      .Addable(false)
      .Editor(
        new GridTextboxEditor().WidthClass("col-md-2").Label(getString("id"))
      ),
    new GridColumn()
      .Title(getString("name"))
      .DataField("Name")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-10")
          .Required(true)
          .Label(getString("name"))
      ),
    new GridColumn()
      .Title(getString("color"))
      .DataField("Color")
      .Editor(
        new GridSelectEditor()
          .DataSource([
            { name: "success" },
            { name: "danger" },
            { name: "warning" },
            { name: "info" },
            { name: "primary" },
            { name: "basic" },
          ])
          .DisplayExpression("name")
          .KeyExpression("name")
          .WidthClass("col-md-4")
          .Label(getString("color"))
      ),
    new GridColumn()
      .Title(getString("icon"))
      .DataField("Icon")
      .Editor(
        new GridTextboxEditor().WidthClass("col-md-8").Label(getString("icon"))
      ),
  ];

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public getData(): void {
    this._subs.push(
      this._furnitureStatusesService.getData().subscribe(
        (data) => {
          this.data = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public createConfirm(event: any): void {
    this._subs.push(
      this._furnitureStatusesService.add(event.newData).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public editConfirm(event: any): void {
    this._subs.push(
      this._furnitureStatusesService.update(event.newData).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public deleteConfirm(event: any): void {
    this._subs.push(
      this._furnitureStatusesService.delete(event.data).subscribe(
        () => {
          this._toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        },
        (err) => {
          console.error(err);
          this._toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }
}
