import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { Subscription } from "rxjs";
import { CountriesService } from "../../services/rest/countries.service";
import { MunicipalitiesService } from "../../services/rest/municipalities.service";
import { ToastrService } from "../../services/toastr.service";
import {
  GridAutocompleteEditor,
  GridColumn,
  GridLookupColumn,
  GridTextboxEditor,
} from "shared-components";

@Component({
    selector: "sample-municipalities",
    templateUrl: "./municipalities.component.html",
    styleUrls: ["./municipalities.component.scss"],
    standalone: false
})
export class MunicipalitiesComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  constructor(
    private _countriesService: CountriesService,
    private _municipalitiesService: MunicipalitiesService,
    private _toastrService: ToastrService
  ) {}

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
      .Title(getString("country"))
      .DataField("CountryId")
      .Type(new GridLookupColumn().LookupColumn("CountryName"))
      .Editor(
        new GridAutocompleteEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._countriesService.apiRoute)
          .DisplayArrow(true)
          .AttributesToShow(["Name"])
          .AttributesToShowInTag(["Name"])
          .AttributesToFilter(["Name"])
          .WidthClass("col-md-12")
          .Required(true)
          .Label(getString("country"))
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
      this._municipalitiesService.getData().subscribe(
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
    event.newData.CountryId =
      event.newData.CountryId.length > 0 ? event.newData.CountryId[0] : null;

    this._subs.push(
      this._municipalitiesService.add(event.newData).subscribe(
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
    event.newData.CountryId =
      event.newData.CountryId.length > 0 ? event.newData.CountryId[0] : null;

    this._subs.push(
      this._municipalitiesService.update(event.newData).subscribe(
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
      this._municipalitiesService.delete(event.data).subscribe(
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
