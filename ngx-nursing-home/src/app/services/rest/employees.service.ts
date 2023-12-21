import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeesService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/employees");
  }

  public getData(active: boolean = true): Observable<any> {
    return this.http.get(this.apiRoute + "?active=" + active);
  }

  public getEmployeeDetails(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/employeeDetails?id=" + id);
  }

  public getEmployeeDetailed(id: number): Observable<any> {
    return this.http.get(this.apiRoute + "/EmployeeDetailed?id=" + id);
  }

  public deactivateEmployee(id: number, date: Date = null): Observable<any> {
    return this.http.post(this.apiRoute + "/changeStatusEmployee", {
      Id: id,
      Active: false,
      EndDate: date ? date.toISOString() : null,
    });
  }

  public update(model: IEmployee): Observable<any> {
    var obj = JSON.parse(JSON.stringify(model));
    return this.http.post(this.apiRoute + "/update", obj);
  }

  public add(model: IEmployee): Observable<any> {
    var obj = JSON.parse(JSON.stringify(model));
    return this.http.post(this.apiRoute + "/add", obj);
  }

  public getEmployeesBasic(): Observable<any> {
    return this.http.get(this.apiRoute + "/employeesBasic");
  }
}

export interface IEmployee extends IBaseSaveModel {
  FirstName: string;
  LastName: string;
  JMBG?: string;
  QualificationId?: number;
  QualificationName?: string;
  GenderId?: number;
  GenderName?: string;
  GenderTag?: string;
  Telephone?: string;
  Mobile?: string;
  Email?: string;
  ResidanceCityId?: number;
  ResidanceStreetName?: string;
  ResidanceHouseNumber?: string;
  BirthDate?: Date;
  EmploymentDate?: Date;
  EmploymentEndDate?: Date;
  Active: boolean;
  BankName?: string;
  BankAccountNumber?: string;
  JobPositionId?: number;
  JobPositionName?: string;
  EmploymentTypeId?: number;
  EmploymentTypeName?: string;
  FatherName?: string;
  YearsOfExperiance?: number;
  DaysOfVacation?: number;
  SchoolName?: string;
  SchoolQualificationName?: string;
  BirthCityId?: number;
  BirthMunicipalityId?: number;
  BirthCountryId?: number;
  JobPositionIcon?: string;
}

export function getIEmployeeFromJSON(json: any): IEmployee {
  return {
    Id: json.Id,
    FirstName: json.FirstName,
    LastName: json.LastName,
    JMBG: json.JMBG,
    Active: json.Active,
    EmploymentEndDate: json.EmploymentEndDate
      ? new Date(json.EmploymentEndDate)
      : undefined,
    BirthDate: json.BirthDate ? new Date(json.BirthDate) : undefined,
    GenderId: json.GenderId,
    GenderName: json.GenderName,
    GenderTag: json.GenderTag,
    FatherName: json.FatherName,
    BirthCityId: json.BirthCityId,
    BirthCountryId: json.BirthCountryId,
    BirthMunicipalityId: json.BirthMunicipalityId,
    ResidanceCityId: json.ResidanceCityId,
    ResidanceStreetName: json.ResidanceStreetName,
    ResidanceHouseNumber: json.ResidanceHouseNumber,
    Telephone: json.Telephone,
    Mobile: json.Mobile,
    Email: json.Email,
    QualificationId: json.QualificationId,
    QualificationName: json.QualificationName,
    EmploymentDate: json.EmploymentDate
      ? new Date(json.EmploymentDate)
      : undefined,
    BankName: json.BankName,
    BankAccountNumber: json.BankAccountNumber,
    JobPositionId: json.JobPositionId,
    JobPositionName: json.JobPositionName,
    EmploymentTypeId: json.EmploymentTypeId,
    EmploymentTypeName: json.EmploymentTypeName,
    YearsOfExperiance: json.YearsOfExperiance,
    DaysOfVacation: json.DaysOfVacation,
    SchoolName: json.SchoolName,
    SchoolQualificationName: json.SchoolQualificationName,
    JobPositionIcon: json.JobPositionIcon,
  };
}
