import { Component, OnDestroy, OnInit } from "@angular/core";
import { getString } from "../../resources/strings";
import { CitiesService } from "../../services/rest/cities.service";
import { ToastrService } from "../../services/toastr.service";
import { Subscription } from "rxjs";
import {
  GridColumn,
  GridLookupColumn,
  GridSelectEditor,
  GridTextboxEditor,
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

  private _subs: Subscription[] = [];

  constructor(
    private _citiesService: CitiesService,
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
        new GridSelectEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._countriesService.apiRoute)
          .WidthClass("col-md-5")
          .Required(true)
          .Label(getString("country"))
      ),
    new GridColumn()
      .Title(getString("municipality"))
      .DataField("MunicipalityId")
      .Type(new GridLookupColumn().LookupColumn("MunicipalityName"))
      .Editor(
        new GridSelectEditor()
          .DisplayExpression("Name")
          .KeyExpression("Id")
          .ServerDataSource(true)
          .ServerEndpoint(this._municipalitiesService.apiRoute)
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

  public getData() {
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

  public createConfirm(event: any) {
    this._subs.push(
      this._citiesService.add(event.newData).subscribe(
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
    this._subs.push(
      this._citiesService.update(event.newData).subscribe(
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
      this._citiesService.delete(event.data).subscribe(
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
