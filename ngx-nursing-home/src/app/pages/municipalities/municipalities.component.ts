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
  GridSelectEditor,
  GridTextboxEditor,
} from "shared-components";

@Component({
  selector: "sample-municipalities",
  templateUrl: "./municipalities.component.html",
  styleUrls: ["./municipalities.component.scss"],
})
export class MunicipalitiesComponent implements OnInit, OnDestroy {
  public getString = getString;

  private _subs: Subscription[] = [];

  constructor(
    private _countriesService: CountriesService,
    private _municipalitiesService: MunicipalitiesService,
    private toastrService: ToastrService
  ) {}

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

  public getData() {
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

  public createConfirm(event: any) {
    event.newData.CountryId =
      event.newData.CountryId.length > 0 ? event.newData.CountryId[0] : null;

    this._subs.push(
      this._municipalitiesService.add(event.newData).subscribe(
        () => {
          this.toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        },
        (err) => {
          console.error(err);
          this.toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public editConfirm(event: any) {
    event.newData.CountryId =
      event.newData.CountryId.length > 0 ? event.newData.CountryId[0] : null;

    this._subs.push(
      this._municipalitiesService.update(event.newData).subscribe(
        () => {
          this.toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        },
        (err) => {
          console.error(err);
          this.toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }

  public deleteConfirm(event: any) {
    this._subs.push(
      this._municipalitiesService.delete(event.data).subscribe(
        () => {
          this.toastrService.showToast("success", getString("saveSuccess"));
          this.getData();
        },
        (err) => {
          console.error(err);
          this.toastrService.showToast("danger", getString("saveError"));
        }
      )
    );
  }
}
