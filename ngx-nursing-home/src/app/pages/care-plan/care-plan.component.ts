import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { PersonsService } from "../../services/rest/persons.service";
import { CarePlanService, IAssessment } from "../../services/rest/care-plan.service";
import { DialogService } from "../../shared/dialog/dialog.service";
import { ToastrService } from "../../services/toastr.service";
import { AuthService, UserRole } from "../../services/auth.service";
import { getString } from "../../resources/strings";
import { AddEditAssessmentComponent } from "./add-edit-assessment/add-edit-assessment.component";
import { NbThemeService } from "@nebular/theme";

@Component({
  selector: "sample-care-plan",
  templateUrl: "./care-plan.component.html",
  styleUrls: ["./care-plan.component.scss"],
})
export class CarePlanComponent implements OnInit, OnDestroy {
  public getString = getString;
  public residents: any[] = [];
  public selectedPersonId: number = 0;
  public assessments: IAssessment[] = [];
  public loading = false;
  public chartOptions: any = {};

  private _subs: Subscription[] = [];
  private _isDark = false;

  constructor(
    private _route: ActivatedRoute,
    private _personsService: PersonsService,
    private _carePlanService: CarePlanService,
    private _dialogService: DialogService,
    private _toastr: ToastrService,
    private _auth: AuthService,
    private _theme: NbThemeService
  ) {}

  ngOnInit(): void {
    this._isDark = localStorage.getItem("app-theme") === "dark";
    this._subs.push(
      this._theme.onThemeChange().subscribe((t) => {
        this._isDark = t.name === "dark";
        if (this.assessments.length) this.buildChart();
      })
    );
    this._subs.push(
      this._personsService.getData(true).subscribe((data) => {
        this.residents = data || [];
        const routeId = Number(this._route.snapshot.paramMap.get("id"));
        this.selectedPersonId = routeId || this.residents[0]?.Id || 0;
        this.load();
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
    this.load();
  }

  public load(): void {
    if (!this.selectedPersonId) return;
    this.loading = true;
    this._subs.push(
      this._carePlanService.getAssessments(this.selectedPersonId).subscribe(
        (data) => {
          this.assessments = (data || []).sort(
            (a: IAssessment, b: IAssessment) =>
              new Date(a.AssessmentDate).getTime() - new Date(b.AssessmentDate).getTime()
          );
          this.buildChart();
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
    );
  }

  public get latest(): IAssessment | undefined {
    return this.assessments.length ? this.assessments[this.assessments.length - 1] : undefined;
  }

  // ---- risk bands ----
  public bradenBand(score?: number): { label: string; status: string } {
    if (score == null) return { label: "-", status: "basic" };
    if (score <= 12) return { label: "High risk", status: "danger" };
    if (score <= 14) return { label: "Moderate risk", status: "warning" };
    if (score <= 18) return { label: "Mild risk", status: "info" };
    return { label: "Low risk", status: "success" };
  }
  public fallBand(score?: number): { label: string; status: string } {
    if (score == null) return { label: "-", status: "basic" };
    if (score >= 45) return { label: "High risk", status: "danger" };
    if (score >= 25) return { label: "Moderate risk", status: "warning" };
    return { label: "Low risk", status: "success" };
  }
  public scoreBand(score?: number): { label: string; status: string } {
    if (score == null) return { label: "-", status: "basic" };
    if (score >= 67) return { label: "Good", status: "success" };
    if (score >= 40) return { label: "Fair", status: "warning" };
    return { label: "Poor", status: "danger" };
  }

  public canEdit(): boolean {
    return (
      this._auth.checkUserHasRole(UserRole.ADMIN) ||
      this._auth.checkUserHasRole(UserRole.NURSE) ||
      this._auth.checkUserHasRole(UserRole.DOCTOR)
    );
  }

  // ---- CRUD ----
  public openDialog(item?: IAssessment): void {
    const ref = this._dialogService.open(AddEditAssessmentComponent, {
      autoFocus: false,
      context: { item: item ? { ...item } : undefined, personId: this.selectedPersonId },
    });
    ref.onClose.subscribe((result: boolean) => {
      if (result) this.load();
    });
  }

  public async delete(item: IAssessment): Promise<void> {
    const res = await this._dialogService.openYesNoDialog(
      getString("areYouSure"),
      getString("wantToDelete")
    );
    if (res) {
      this._subs.push(
        this._carePlanService.delete({ Id: item.Id }).subscribe(() => {
          this._toastr.showToast("success", getString("saveSuccess"), "");
          this.load();
        })
      );
    }
  }

  // ---- trend chart ----
  private buildChart(): void {
    const dates = this.assessments.map((a) =>
      new Date(a.AssessmentDate).toLocaleDateString(undefined, { month: "short", year: "2-digit" })
    );
    const series = [
      { name: "Braden (6–23)", key: "BradenScore", color: "#33b9bf" },
      { name: "Fall risk (0–100)", key: "FallRiskScore", color: "#ff444e" },
      { name: "Mobility (0–100)", key: "MobilityScore", color: "#72c627" },
      { name: "Nutrition (0–100)", key: "NutritionScore", color: "#ffa32b" },
    ];

    const textColor = this._isDark ? "#e8eef0" : "#222b45";
    const axisColor = this._isDark ? "#8a9aa1" : "#8f9bb3";
    const splitColor = this._isDark ? "#2a3b43" : "#edf1f7";

    this.chartOptions = {
      tooltip: {
        trigger: "axis",
        confine: true,
        backgroundColor: this._isDark ? "#1b272d" : "#ffffff",
        borderColor: this._isDark ? "#32444d" : "#e4e9f2",
        textStyle: { color: textColor },
      },
      legend: { bottom: 0, textStyle: { fontSize: 11, color: textColor } },
      grid: { left: "3%", right: "4%", top: "8%", bottom: "18%", containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dates,
        axisLabel: { color: axisColor },
        axisLine: { lineStyle: { color: axisColor } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: axisColor },
        splitLine: { lineStyle: { color: splitColor } },
      },
      series: series.map((s) => ({
        name: s.name,
        type: "line",
        smooth: true,
        symbolSize: 7,
        lineStyle: { width: 3 },
        itemStyle: { color: s.color },
        data: this.assessments.map((a) => (a as any)[s.key]),
      })),
    };
  }
}
