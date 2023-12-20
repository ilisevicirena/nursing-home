import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { getString } from "../../resources/strings";
import { PersonsService } from "../../services/rest/persons.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "sample-advanced-search",
  templateUrl: "./advanced-search.component.html",
  styleUrls: ["./advanced-search.component.scss"],
})
export class AdvancedSearchComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public getString = getString;
  public searchTerm: string = "";
  public searchPerformed: boolean = false;
  public personsData: any[] = [];
  public cardData: any[] = [
    { label: getString("jmbg"), field: "JMBG", type: "" },
    { label: getString("birthDate"), field: "BirthDate", type: "date" },
    { label: getString("startDate"), field: "StartDate", type: "date" },
    { label: getString("active"), field: "Active", type: "checkbox" },
  ];

  @ViewChild("searchFormField") searchFormField: ElementRef<any>;

  constructor(
    private _personsService: PersonsService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public onSerachKeyPress(event: KeyboardEvent): void {
    if (event.charCode == 13) {
      // enter key
      if (this.searchTerm.length > 0) {
        this.searchFormField.nativeElement.classList.add("end-position");
        this.searchFormField.nativeElement.classList.remove("start-position");

        this._subs.push(
          this._personsService
            .searchPersons(this.searchTerm)
            .subscribe((data) => {
              this.searchPerformed = true;
              this.personsData = data;
            })
        );
      } else {
        this.personsData = [];
        this.searchPerformed = false;
      }
    }
  }

  public resetSearch(): void {
    this.searchTerm = "";
    this.personsData = [];
    this.searchPerformed = false;
  }

  public openPersonDetails(person: any): void {
    this._router.navigate(["pages/profile", person.Id]);
  }
}
