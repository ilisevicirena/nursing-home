import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

export interface IRxNormDrug {
  rxcui: string;
  name: string;
  tty?: string;
}

@Injectable({
  providedIn: "root",
})
export class RxNormService {
  private readonly BASE = "https://rxnav.nlm.nih.gov/REST";

  constructor(private http: HttpClient) {}

  public search(term: string): Observable<IRxNormDrug[]> {
    const url = `${this.BASE}/drugs.json?name=${encodeURIComponent(term)}`;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        const groups: any[] = resp?.drugGroup?.conceptGroup ?? [];
        const results: IRxNormDrug[] = [];
        for (const group of groups) {
          for (const c of group.conceptProperties ?? []) {
            results.push({ rxcui: c.rxcui, name: c.name, tty: group.tty });
          }
        }
        // Prefer clinical drugs and branded products over ingredient-only entries
        const priority = ["SCD", "SBD", "GPCK", "BPCK", "IN", "BN"];
        results.sort((a, b) => {
          const ai = priority.indexOf(a.tty ?? "");
          const bi = priority.indexOf(b.tty ?? "");
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });
        return results.slice(0, 15);
      }),
      catchError(() => of([])),
    );
  }
}
