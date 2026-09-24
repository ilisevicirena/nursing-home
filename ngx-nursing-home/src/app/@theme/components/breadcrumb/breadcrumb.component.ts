import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { getString } from "../../../resources/strings";
import { AuthService } from "../../../services/auth.service";

interface CrumbLink {
  label: string;
  url: string;
  active: boolean;
}

interface Crumb {
  label: string;
  url?: string;
  isLast: boolean;
  // module crumb: not navigable, reveals its pages on hover
  isModule: boolean;
  children?: CrumbLink[];
}

@Component({
  selector: "ngx-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  public crumbs: Crumb[] = [];
  public homeUrl = "/pages/dashboard";
  public isHome = true;

  private _sub: Subscription;

  constructor(private _router: Router, private _auth: AuthService) {}

  ngOnInit(): void {
    this.build();
    this._sub = this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.build());
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  private build(): void {
    const leaf = this.deepestSnapshot();
    const data: any = leaf?.data || {};

    const url = (this._router.url || "").split("?")[0].split("#")[0];
    const base = url.split("/").filter((p) => p && p !== "pages")[0] || "";

    // dashboard is the home icon; nothing else to show
    if (!base || base === "dashboard") {
      this.crumbs = [];
      this.isHome = true;
      return;
    }
    this.isHome = false;

    const pageRoutes = this.pageRoutes(leaf);
    const crumbs: Crumb[] = [];

    // ancestor: logical parent page (drill-down) wins over module grouping
    if (data.parent) {
      const parentRoute = pageRoutes.find(
        (x) => (x.path || "").split("/")[0] === data.parent
      );
      crumbs.push({
        label: this.labelForBase(data.parent, pageRoutes),
        url: this.canAccess(parentRoute?.data) ? "/pages/" + data.parent : undefined,
        isLast: false,
        isModule: false,
      });
    } else if (data.module) {
      crumbs.push({
        label: this.resolveLabel(data.module),
        isLast: false,
        isModule: true,
        children: this.moduleSiblings(data.module, base, pageRoutes),
      });
    }

    // leaf (current page)
    crumbs.push({
      label: data.breadcrumb ? this.resolveLabel(data.breadcrumb) : this.prettify(base),
      url,
      isLast: false,
      isModule: false,
    });

    crumbs.forEach((c, i) => (c.isLast = i === crumbs.length - 1));
    this.crumbs = crumbs;
  }

  /** Deepest activated route = the currently rendered leaf page. */
  private deepestSnapshot(): ActivatedRouteSnapshot {
    let r = this._router.routerState.snapshot.root;
    while (r.firstChild) r = r.firstChild;
    return r;
  }

  /** All sibling page routes = children of the nearest ancestor route that declares them. */
  private pageRoutes(leaf: ActivatedRouteSnapshot): any[] {
    let node: ActivatedRouteSnapshot | null = leaf;
    while (
      node &&
      !(node.routeConfig && (node.routeConfig as any).children?.length)
    ) {
      node = node.parent;
    }
    return ((node?.routeConfig as any)?.children as any[]) || [];
  }

  /** Label of a page by its base path segment (from that route's breadcrumb data). */
  private labelForBase(base: string, routes: any[]): string {
    const r = routes.find((x) => (x.path || "").split("/")[0] === base);
    if (r?.data?.breadcrumb) return this.resolveLabel(r.data.breadcrumb);
    return this.prettify(base);
  }

  /** Navigable pages that belong to the same module (for the hover dropdown). */
  private moduleSiblings(
    moduleKey: string,
    currentBase: string,
    routes: any[]
  ): CrumbLink[] {
    const seen = new Set<string>();
    const out: CrumbLink[] = [];
    routes.forEach((r) => {
      if (!r.data || r.data.module !== moduleKey || !r.data.breadcrumb) return;
      if (!this.canAccess(r.data)) return; // hide pages the current role can't open
      const b = (r.path || "").split("/")[0];
      if (!b || seen.has(b)) return; // dedupe the paramless/param route pair
      seen.add(b);
      out.push({
        label: this.resolveLabel(r.data.breadcrumb),
        url: "/pages/" + b,
        active: b === currentBase,
      });
    });
    return out;
  }

  /** A route is accessible if it has no Roles restriction or the user holds one of them. */
  private canAccess(routeData: any): boolean {
    if (!routeData || !routeData.Roles || routeData.Roles.length === 0) return true;
    return routeData.Roles.some((role: any) => this._auth.checkUserHasRole(role));
  }

  /**
   * Resolve a label: a translation key -> translated value; a literal phrase
   * (contains a space) -> used verbatim; otherwise prettify the raw token.
   */
  private resolveLabel(key: string): string {
    const t = getString(key);
    if (t && t !== key) return t;
    if (/\s/.test(key)) return key;
    return this.prettify(key);
  }

  private prettify(seg: string): string {
    return seg.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
