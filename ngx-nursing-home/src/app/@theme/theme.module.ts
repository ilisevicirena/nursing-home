import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbTooltipModule,
  NbPopoverModule,
  NbBadgeModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbInputModule,
  NbFormFieldModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbSecurityModule } from "@nebular/security";

import { RouterModule } from "@angular/router";
import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  BreadcrumbComponent,
} from "./components";
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from "./layouts";
import { DEFAULT_THEME } from "./styles/theme.default";
import { COSMIC_THEME } from "./styles/theme.cosmic";
import { CORPORATE_THEME } from "./styles/theme.corporate";
import { DARK_THEME } from "./styles/theme.dark";
import { NotificationsPaneComponent } from "./components/header/notifications-pane/notifications-pane.component";
import { FormsModule } from "@angular/forms";
import { UserInfoPaneComponent } from "./components/header/user-info-pane/user-info-pane.component";
import { SharedComponentsModule } from "shared-components";
import { DisableAutocompleteDirective } from "./directives/disable-autocomplete.directive";

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbTooltipModule,
  NbPopoverModule,
  NbBadgeModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbInputModule,
  NbFormFieldModule,
  FormsModule,
  NbUserModule,
  SharedComponentsModule,
  RouterModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  BreadcrumbComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...COMPONENTS, DisableAutocompleteDirective],
  declarations: [
    ...COMPONENTS,
    NotificationsPaneComponent,
    UserInfoPaneComponent,
    DisableAutocompleteDirective,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: "default",
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
        ).providers,
      ],
    };
  }
}
