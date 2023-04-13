import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { environment, SidebarStates } from '../../../../environments/environment';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive (mouseleave)="toggleSidebar(true)" (mouseenter)="toggleSidebar(false)">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>   
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  constructor(private sidebarService: NbSidebarService) { }

  public toggleSidebar(leave: boolean) {
    if (environment.sidebarConfig != SidebarStates.EXPANDED) {
      if (leave) {
        if (environment.sidebarConfig == SidebarStates.COMPACT) {
          this.sidebarService.compact("menu-sidebar");
        } else if (environment.sidebarConfig == SidebarStates.COLLAPSED) {
          this.sidebarService.collapse("menu-sidebar");
        }
      } else {
        this.sidebarService.expand("menu-sidebar");
      }
    }
  }
}
