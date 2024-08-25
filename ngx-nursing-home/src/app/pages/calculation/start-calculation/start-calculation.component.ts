import {
  Component,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";
import { getString } from "../../../resources/strings";
import { NbDialogRef } from "@nebular/theme";
import { ScheduleMonth } from "shared-components/lib/models/schedule.model";
import { PersonsService } from "../../../services/rest/persons.service";
import { ServicesManagementService } from "../../../services/rest/services-management.service";
import {
  CalculationService,
  ICalculationResult,
} from "../../../services/calculation.service";
import { CalculationApiService } from "../../../services/rest/calculation-api.service";
import { GeneratedInvoiceComponent } from "../generated-invoice/generated-invoice.component";
import { ToastrService } from "../../../services/toastr.service";
import { getMonthNames, getYearsInRange } from "../../../resources/functions";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "sample-start-calculation",
  templateUrl: "./start-calculation.component.html",
  styleUrls: ["./start-calculation.component.scss"],
})
export class StartCalculationComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  private _persons: any[] = [];
  private _personIndex: number = 0;

  public getString = getString;
  public month: number = new Date().getMonth();
  public year: number = new Date().getFullYear();
  public months: ScheduleMonth[] = [];
  public years: number[] = [];
  public paymentDeadline: number = 3;
  public recalculate: number = 1;
  public calculationInProgress: boolean = false;
  public calculationPercent: number = 0;
  public personsIds: number[] = [];
  public disableInputs: boolean = false;
  public profileMode: boolean = false;

  @ViewChild(GeneratedInvoiceComponent) invoice: GeneratedInvoiceComponent;

  constructor(
    @Inject(LOCALE_ID) private _locale: string,
    private _ref: NbDialogRef<StartCalculationComponent>,
    private _personsService: PersonsService,
    private _servicesManagementService: ServicesManagementService,
    private _calculationService: CalculationService,
    private _calcService: CalculationApiService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.months = getMonthNames(this._locale);
    this.years = getYearsInRange();
  }

  ngOnDestroy(): void {
    this._subs.forEach((element) => {
      element.unsubscribe();
    });
  }

  public close(result: boolean): void {
    this._ref.close(result);
  }

  public startCalculation(): void {
    this.calculationInProgress = true;
    // get active persons first
    this._subs.push(
      this._personsService
        .getActivePersonsByMonthYear(this.month, this.year)
        .subscribe((data) => {
          console.log(data);
          if (this.personsIds.length > 0)
            this._persons = data.filter((x) => this.personsIds.includes(x.Id));
          else this._persons = data;
          this._personIndex = 0;
          this.startPersonCalculation(this._personIndex);
        })
    );
  }

  private startPersonCalculation(personIndex: number): void {
    const person = this._persons[personIndex];

    this._subs.push(
      // get packages and services for person
      this._servicesManagementService
        .getPackagesAndServicesForPerson(person.Id)
        .subscribe((data) => {
          // if person doesn't have saved packages or services skip it
          if (data.Packages.length > 0 || data.Services.length > 0) {
            person.ServicesManagement = data;

            // calculate price foreach package
            person.ServicesManagement.Packages.forEach((pack: any) => {
              var services = person.ServicesManagement.PackagesServices.filter(
                (x: any) => x.PackageId == pack.Id
              );
              var result: ICalculationResult =
                this._calculationService.calculatePackagePrice(
                  pack,
                  services,
                  pack.MeasureUnitCode
                );
              pack.Services = result.services;
              pack.Price = result.price;
              pack.TotalPrice = result.priceRounded;
              pack.PriceRounded = result.priceRounded;
            });

            // calculate price foreach additional service
            person.ServicesManagement.Services.forEach((service) => {
              var result: ICalculationResult =
                this._calculationService.calculateServicePriceByMeasureUnit(
                  service,
                  person.ServicesManagement.OfferMeasureUnit[0]?.MeasureUnitCode
                );
              service.Price = result.price;
              service.PriceRounded = result.priceRounded;
              service.TotalPrice = result.priceRounded;
              service.PackageId = null;
            });

            // calculate offer price
            var result: ICalculationResult =
              this._calculationService.calculateOfferPrice(
                person.ServicesManagement.Packages,
                person.ServicesManagement.Services,
                person.ServicesManagement.Discounts
              );
            person.CalculationTotalPrice = result.price;
            person.CalculationTotalPriceRounded = result.priceRounded;

            this.saveCalculation(person, personIndex);
          } else this.countinueToNextPerson(personIndex);
        })
    );
  }

  private saveCalculation(person: any, index: number): void {
    var firstDay = new Date(this.year, this.month, 1);
    var lastDay = new Date(this.year, this.month + 1, 0);

    var objectToSave: any = {
      CalculationDate: new Date(),
      PersonFirstName: person.FirstName,
      PersonLastName: person.LastName,
      PersonJMBG: person.JMBG,
      Month: this.month + 1,
      Year: this.year,
      PersonId: person.Id,
      SystemPrice: person.CalculationTotalPriceRounded,
      DateFrom: firstDay.toISOString(),
      DateTo: lastDay.toISOString(),
      PaymentDaysDeadline: this.paymentDeadline,
      PriceUnitId: environment.kmPriceUnitId,
      MeasureUnitId:
        person.ServicesManagement.OfferMeasureUnit[0]?.MeasureUnitId,
      Packages: person.ServicesManagement.Packages,
      Services: person.ServicesManagement.Services,
      Discounts: person.ServicesManagement.Discounts,
    };

    // check calculation exists
    this._subs.push(
      this._calcService
        .checkCalculationExists({
          PersonId: person.Id,
          Month: this.month + 1,
          Year: this.year,
          Delete: this.recalculate == 1,
        })
        .subscribe((data) => {
          if (this.recalculate == 1)
            this.saveCalculationToDb(objectToSave, person, index);
          else {
            if (data.result > 0) this.countinueToNextPerson(index);
            else this.saveCalculationToDb(objectToSave, person, index);
          }
        })
    );
  }

  private saveCalculationToDb(
    objectToSave: any,
    person: any,
    index: number
  ): void {
    this._subs.push(
      // save calculation
      this._calcService.add(objectToSave).subscribe((data) => {
        person.CalculationId = data.CalculationId;
        var monthName = this.months.find((x) => x.key == this.month).name;

        // create invoice pdf and save it
        this.invoice
          .createPdf(objectToSave, monthName, this.year)
          .then((data) => {
            var documentModel = {
              Id: 0,
              PersonId: person.Id,
              Name: person.JMBG + "-" + monthName,
              Extension: "pdf",
              FileType: "data:application/pdf;base64",
              CalculationId: person.CalculationId,
              Base64: data,
              UserId: null,
            };

            this._subs.push(
              this._calcService.saveDocument(documentModel).subscribe(() => {
                this.countinueToNextPerson(index);
              })
            );
          });
      })
    );
  }

  private countinueToNextPerson(index: number): void {
    // continue to next person
    this.calculationPercent = Math.trunc(
      ((index + 1) / this._persons.length) * 100
    );
    this._personIndex++;

    if (this._personIndex > this._persons.length - 1) {
      this._toastrService.showToast("success", getString("calculationSuccess"));
      this.calculationInProgress = false;
      this.close(true);
    } else this.startPersonCalculation(this._personIndex);
  }
}
