import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface IKeyValue {
  key: string;
  value: string;
}

let keyValueData: IKeyValue[] = [];
let initialized = false;

export function getString(key: string): string {
  if (!initialized) {
    throw new Error(
      "KeyValue data is not initialized. Call initializeData() first."
    );
  }
  const entry = keyValueData.find((item) => item.key === key);
  return entry ? entry.value : key;
}

export function initializeStrings(
  http: HttpClient,
  url: string
): Observable<boolean> {
  return http.get<IKeyValue[]>(url).pipe(
    map((data) => {
      keyValueData = data;
      initialized = true;
      return true;
    }),
    catchError((error) => {
      console.error("Error loading KeyValue data:", error);
      return of(false);
    })
  );
}
