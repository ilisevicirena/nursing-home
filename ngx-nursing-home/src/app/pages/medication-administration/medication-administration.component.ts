import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { PersonsService } from "../../services/rest/persons.service";
import {
  MedicationAdministrationService,
  IMarRow,
  IMarSlot,
} from "../../services/rest/medication-administration.service";
import { AuthService, UserRole } from "../../services/auth.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "sample-medication-administration",
  templateUrl: "./medication-administration.component.html",
  styleUrls: ["./medication-administration.component.scss"],
})
export class MedicationAdministrationComponent implements OnInit, OnDestroy {
  public residents: any[] = [];
  public selectedPersonId: number = 0;
  public selectedDate: Date = new Date();
  public rows: IMarRow[] = [];
  public loading = false;
  public brand = environment.brand;

  public readonly slots = [
    { key: "morning", label: "Morning", icon: "sun-outline" },
    { key: "noon", label: "Noon", icon: "clock-outline" },
    { key: "evening", label: "Evening", icon: "moon-outline" },
    { key: "night", label: "Night", icon: "bulb-outline" },
  ];

  private _subs: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _personsService: PersonsService,
    private _marService: MedicationAdministrationService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._subs.push(
      this._personsService.getData(true).subscribe((data) => {
        this.residents = data || [];
        const routeId = Number(this._route.snapshot.paramMap.get("id"));
        this.selectedPersonId = routeId || this.residents[0]?.Id || 0;
        this.loadSchedule();
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public get resident(): any {
    return this.residents.find((r) => r.Id === this.selectedPersonId);
  }

  public onResidentChange(id: number): void {
    this.selectedPersonId = id;
    this.loadSchedule();
  }

  public prevDay(): void {
    this.shiftDay(-1);
  }
  public nextDay(): void {
    this.shiftDay(1);
  }
  public today(): void {
    this.selectedDate = new Date();
    this.loadSchedule();
  }
  private shiftDay(delta: number): void {
    const d = new Date(this.selectedDate);
    d.setDate(d.getDate() + delta);
    this.selectedDate = d;
    this.loadSchedule();
  }

  public loadSchedule(): void {
    if (!this.selectedPersonId) return;
    this.loading = true;
    this._subs.push(
      this._marService.getSchedule(this.selectedPersonId, this.dateIso()).subscribe(
        (data) => {
          this.rows = data || [];
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
    );
  }

  private dateIso(): string {
    const d = this.selectedDate;
    return d.getFullYear() + "-" + this.pad(d.getMonth() + 1) + "-" + this.pad(d.getDate());
  }
  private pad(n: number): string {
    return n < 10 ? "0" + n : "" + n;
  }

  public setStatus(row: IMarRow, slot: IMarSlot, status: "given" | "missed" | "pending"): void {
    if (!slot.scheduled || !this.canEdit()) return;
    slot.status = slot.status === status ? "pending" : status;
    this._marService
      .recordAdministration({
        PersonId: this.selectedPersonId,
        MedicationId: row.Id,
        Slot: slot.slot,
        Date: this.dateIso(),
        Status: slot.status,
      })
      .subscribe(
        () => {},
        () => {}
      );
  }

  public slotFor(row: IMarRow, key: string): IMarSlot | undefined {
    return row.slots.find((s) => s.slot === key);
  }

  public statusColor(status: string): string {
    return status === "given" ? "success" : status === "missed" ? "danger" : "basic";
  }
  public statusIcon(status: string): string {
    return status === "given"
      ? "checkmark-circle-2-outline"
      : status === "missed"
      ? "close-circle-outline"
      : "clock-outline";
  }

  public counts(): { given: number; missed: number; pending: number; total: number } {
    let given = 0,
      missed = 0,
      pending = 0;
    this.rows.forEach((r) =>
      r.slots.forEach((s) => {
        if (!s.scheduled) return;
        if (s.status === "given") given++;
        else if (s.status === "missed") missed++;
        else pending++;
      })
    );
    return { given, missed, pending, total: given + missed + pending };
  }

  public adherence(): number {
    const c = this.counts();
    const decided = c.given + c.missed;
    return decided === 0 ? 0 : Math.round((c.given / decided) * 100);
  }

  public canEdit(): boolean {
    return (
      this._auth.checkUserHasRole(UserRole.ADMIN) ||
      this._auth.checkUserHasRole(UserRole.NURSE) ||
      this._auth.checkUserHasRole(UserRole.DOCTOR)
    );
  }

  public dateLabel(): string {
    return this.selectedDate.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // ---- Printable sheet (opens a clean, print-ready window) ----
  public print(): void {
    const r = this.resident;
    const name = r ? `${r.FirstName} ${r.LastName}` : "";
    const slotCells = (row: IMarRow) =>
      this.slots
        .map((s) => {
          const slot = this.slotFor(row, s.key);
          if (!slot || !slot.scheduled)
            return `<td class="c empty">&ndash;</td>`;
          const mark =
            slot.status === "given" ? "&#10003;" : slot.status === "missed" ? "&#10007;" : "";
          return `<td class="c"><span class="box">${mark}</span><div class="t">${slot.time}</div></td>`;
        })
        .join("");

    const body = this.rows
      .map(
        (row) =>
          `<tr><td class="med"><b>${row.MedicationName}</b><div class="d">${row.Dosage} &middot; ${row.Route}</div></td>${slotCells(
            row
          )}</tr>`
      )
      .join("");

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>MAR – ${name}</title>
      <style>
        *{font-family:Arial,Helvetica,sans-serif;box-sizing:border-box}
        body{margin:24px;color:#1a1a1a}
        .hd{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #197189;padding-bottom:8px;margin-bottom:14px}
        .hd h1{font-size:18px;margin:0;color:#197189}
        .hd .sub{font-size:12px;color:#555}
        .meta{font-size:13px;margin-bottom:12px}
        .meta b{display:inline-block;min-width:70px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th,td{border:1px solid #cfd6e4;padding:6px 8px;text-align:left}
        th{background:#eef4f5;color:#10526e;font-size:11px;text-transform:uppercase;letter-spacing:.02em}
        td.c{text-align:center;width:70px}
        td.empty{color:#bbb}
        .box{display:inline-block;width:18px;height:18px;border:1.5px solid #197189;border-radius:3px;line-height:16px;font-size:14px}
        td.c .t{font-size:9px;color:#888;margin-top:2px}
        .med .d{font-size:10px;color:#777}
        .sign{margin-top:26px;display:flex;gap:40px;font-size:12px}
        .sign div{flex:1;border-top:1px solid #333;padding-top:4px;color:#555}
        .foot{margin-top:18px;font-size:10px;color:#999}
      </style></head><body>
      <div class="hd"><div><h1>Medication Administration Record</h1><div class="sub">${this.brand?.Name || ""}</div></div>
      <div class="sub">Printed: ${new Date().toLocaleString()}</div></div>
      <div class="meta"><b>Resident:</b> ${name} &nbsp;&nbsp; <b>Room:</b> ${
      r?.RoomName || "-"
    }<br/><b>Date:</b> ${this.dateLabel()}</div>
      <table><thead><tr><th>Medication</th><th>Morning<br/>08:00</th><th>Noon<br/>12:00</th><th>Evening<br/>18:00</th><th>Night<br/>22:00</th></tr></thead>
      <tbody>${body || '<tr><td colspan="5">No scheduled medications.</td></tr>'}</tbody></table>
      <div class="sign"><div>Nurse signature</div><div>Supervisor signature</div></div>
      <div class="foot">&#10003; = administered / given &nbsp;&nbsp; &#10007; = missed / refused &nbsp;&nbsp; blank = pending. Demo document — fictional data.</div>
      </body></html>`;

    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }
}
