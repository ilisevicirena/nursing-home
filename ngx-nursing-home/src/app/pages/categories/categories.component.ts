import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../resources/strings";
import { PersonCategoriesService } from "../../services/rest/person-categories.service";
import { GridColumn, fileDownload } from "shared-components";
import { ToastrService } from "../../services/toastr.service";

@Component({
  selector: "sample-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public getString = getString;

  private _subs: Subscription[] = [];

  constructor(
    private _categoriesService: PersonCategoriesService,
    private _toastrService: ToastrService
  ) {}

  public data: any[] = [];
  public columns: GridColumn[] = [
    new GridColumn()
      .Title(getString("id"))
      .DataField("Id")
      .Editable(false)
      .Addable(false),
    new GridColumn()
      .Title(getString("name"))
      .DataField("Name")
      .Editable(false)
      .Addable(false),
    new GridColumn()
      .Title(getString("description"))
      .DataField("Description")
      .Editable(false)
      .Addable(false),
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
      this._categoriesService.getData().subscribe(
        (data) => {
          this.data = data;
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  public generateTemplate(): void {
    this._toastrService.showToastWithCustumIcon(
      "info",
      getString("downloadStartSoon"),
      "",
      "download-outline"
    );

    this._subs.push(
      this._categoriesService.getTemplate().subscribe((data) => {
        if (data) fileDownload(data.base64, data.filename);
      })
    );
  }
}
