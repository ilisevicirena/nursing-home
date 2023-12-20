import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { CitiesService } from "../../services/rest/cities.service";
import { ToastrService } from "../../services/toastr.service";
import { Subscription } from "rxjs";
import {
  GridColumn,
  GridLookupColumn,
  GridTextboxEditor,
  GridAutocompleteEditor,
} from "shared-components";
import { CountriesService } from "../../services/rest/countries.service";
import { MunicipalitiesService } from "../../services/rest/municipalities.service";

@Component({
  selector: "sample-cities",
  templateUrl: "./cities.component.html",
  styleUrls: ["./cities.component.scss"],
})
export class CitiesComponent implements OnInit, OnDestroy {
  public getString = getString;
  public data: any[] = [];

  private _subs: Subscription[] = [];

  constructor(
    private _citiesService: CitiesService,
    private _countriesService: CountriesService,
    private _municipalitiesService: MunicipalitiesService,
    private _toastrService: ToastrService
  ) {}

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
      .Title(getString("postalCode"))
      .DataField("PostalCode")
      .Editor(
        new GridTextboxEditor()
          .WidthClass("col-md-2")
          .Label(getString("postalCode"))
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
          .WidthClass("col-md-5")
          .Required(true)
          .Label(getString("country"))
      ),
    new GridColumn()
      .Title(getString("municipality"))
      .DataField("MunicipalityId")
      .Type(new GridLookupColumn().LookupColumn("MunicipalityName"))
      .Editor(
        new GridAutocompleteEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._municipalitiesService.apiRoute)
          .DisplayArrow(true)
          .AttributesToShow(["Name"])
          .AttributesToShowInTag(["Name"])
          .AttributesToFilter(["Name"])
          .WidthClass("col-md-5")
          .Label(getString("municipality"))
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
      this._citiesService.getData().subscribe(
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

    event.newData.MunicipalityId =
      event.newData.MunicipalityId.length > 0
        ? event.newData.MunicipalityId[0]
        : null;

    this._subs.push(
      this._citiesService.add(event.newData).subscribe(
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

    event.newData.MunicipalityId =
      event.newData.MunicipalityId.length > 0
        ? event.newData.MunicipalityId[0]
        : null;

    this._subs.push(
      this._citiesService.update(event.newData).subscribe(
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
      this._citiesService.delete(event.data).subscribe(
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
