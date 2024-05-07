import { Injectable } from "@angular/core";
import { BaseRestApiService, IBaseSaveModel } from "../base-rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FurnitureService extends BaseRestApiService {
  constructor(http: HttpClient) {
    super(http, "api/furniture");
  }

  public getFurnitureCountByStatus(): Observable<any> {
    return this.http.get(this.apiRoute + "/getFurnitureCountByStatus");
  }

  public changeFurnitureStatus(
    id: number,
    statusId: number,
    date: Date
  ): Observable<any> {
    return this.http.post(this.apiRoute + "/changeFurnitureStatus", {
      Id: id,
      StatusId: statusId,
      Date: date,
    });
  }

  public getFurnitureStatuses(id: number): Observable<any> {
    return this.http.get(
      this.apiRoute + "/getFurnitureStatuses?FurnitureId=" + id
    );
  }

  public deleteFurnitureStatus(model: IBaseSaveModel): Observable<any> {
    return this.http.delete(this.apiRoute + "/deleteFurnitureStatus", {
      body: model,
    });
  }
}

export interface IFurniture extends IBaseSaveModel {
  Name: string;
  InventoryCode: string;
  Description: string;
  RoomId: number;
}
