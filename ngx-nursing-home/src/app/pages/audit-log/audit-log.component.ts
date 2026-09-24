import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  AuditLogService,
  IAuditFilters,
} from "../../services/rest/audit-log.service";

@Component({
  selector: "sample-audit-log",
  templateUrl: "./audit-log.component.html",
  styleUrls: ["./audit-log.component.scss"],
})
export class AuditLogComponent implements OnInit, OnDestroy {
  public entries: any[] = [];
  public activityEntries: any[] = [];
  public tab: "changes" | "activity" = "changes";
  public loading = false;

  // filters
  public entityFilter: string | null = null;
  public actionFilter: string | null = null;
  public dateFrom: Date | null = null;
  public dateTo: Date | null = null;
  public searchTerm: string = "";

  // paging
  public page = 0;
  public pageSize = 15;

  public readonly entities = [
    { value: null, label: "All entities" },
    { value: "Person", label: "Residents" },
    { value: "Contact", label: "Contacts" },
    { value: "Room", label: "Rooms" },
    { value: "Floor", label: "Floors" },
  ];
  public readonly actions = [
    { value: null, label: "All actions" },
    { value: "INSERT", label: "Created" },
    { value: "UPDATE", label: "Updated" },
    { value: "DELETE", label: "Deleted" },
  ];

  private _subs: Subscription[] = [];

  constructor(private _auditService: AuditLogService) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }

  public load(): void {
    this.loading = true;
    this.page = 0;
    const filters: IAuditFilters = {
      DateFrom: this.iso(this.dateFrom),
      DateTo: this.iso(this.dateTo),
      Search: this.searchTerm.trim() || undefined,
    };
    if (this.tab === "changes") {
      filters.Entity = this.entityFilter || undefined;
      filters.Action = this.actionFilter || undefined;
      this._subs.push(
        this._auditService.getAuditLog(filters).subscribe(
          (data) => {
            this.entries = data || [];
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        )
      );
    } else {
      this._subs.push(
        this._auditService.getUserActivity(filters).subscribe(
          (data) => {
            this.activityEntries = data || [];
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        )
      );
    }
  }

  public setTab(tab: "changes" | "activity"): void {
    if (this.tab === tab) return;
    this.tab = tab;
    this.load();
  }

  public onFilterChange(): void {
    this.load();
  }

  public clearFilters(): void {
    this.entityFilter = null;
    this.actionFilter = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.searchTerm = "";
    this.load();
  }

  private iso(d: Date | null): string | undefined {
    if (!d) return undefined;
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  // ---- display helpers ----
  public actionLabel(code: string): string {
    return code === "INSERT"
      ? "Created"
      : code === "UPDATE"
      ? "Updated"
      : code === "DELETE"
      ? "Deleted"
      : code;
  }
  public actionStatus(code: string): string {
    return code === "INSERT"
      ? "success"
      : code === "UPDATE"
      ? "info"
      : code === "DELETE"
      ? "danger"
      : "basic";
  }
  public actionIcon(code: string): string {
    return code === "INSERT"
      ? "plus-circle-outline"
      : code === "UPDATE"
      ? "edit-2-outline"
      : code === "DELETE"
      ? "trash-2-outline"
      : "activity-outline";
  }
  public entityLabel(name: string): string {
    switch (name) {
      case "Person":
        return "Resident";
      case "Contact":
        return "Contact";
      case "Room":
        return "Room";
      case "Floor":
        return "Floor";
      default:
        return name;
    }
  }
  public entityIcon(name: string): string {
    switch (name) {
      case "Person":
        return "person-outline";
      case "Contact":
        return "people-outline";
      case "Room":
        return "home-outline";
      case "Floor":
        return "layers-outline";
      default:
        return "cube-outline";
    }
  }

  // ---- counts by action (for the summary strip) ----
  public countBy(code: string): number {
    return this.entries.filter((e) => e.ActionCode === code).length;
  }

  // ---- paging (tab-aware) ----
  public get list(): any[] {
    return this.tab === "changes" ? this.entries : this.activityEntries;
  }
  public get pagedEntries(): any[] {
    const start = this.page * this.pageSize;
    return this.list.slice(start, start + this.pageSize);
  }
  public get totalPages(): number {
    return Math.max(1, Math.ceil(this.list.length / this.pageSize));
  }
  public get rangeStart(): number {
    return this.list.length === 0 ? 0 : this.page * this.pageSize + 1;
  }
  public get rangeEnd(): number {
    return Math.min((this.page + 1) * this.pageSize, this.list.length);
  }
  public prevPage(): void {
    if (this.page > 0) this.page--;
  }
  public nextPage(): void {
    if (this.page < this.totalPages - 1) this.page++;
  }
}
