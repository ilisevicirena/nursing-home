import { Component, OnDestroy, OnInit } from "@angular/core";
import { TagsService } from "../../services/rest/tags.service";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import {
  GridColorpickerEditor,
  GridColumn,
  GridTextboxEditor,
  GridColorpickerColumn,
} from "shared-components";
import { ToastrService } from "../../services/toastr.service";

@Component({
    selector: "sample-tags",
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.scss"],
    standalone: false
})
export class TagsComponent implements OnInit, OnDestroy {
  constructor(
    private _tagsService: TagsService,
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
      .Type(new GridColorpickerColumn())
      .Editor(
        new GridColorpickerEditor()
          .WidthClass("col-md-4")
          .Required(true)
          .Label(getString("color"))
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
      this._tagsService.getData().subscribe(
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
      this._tagsService.add(event.newData).subscribe(
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
      this._tagsService.update(event.newData).subscribe(
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
      this._tagsService.delete(event.data).subscribe(
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
