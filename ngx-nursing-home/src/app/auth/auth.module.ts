import { NgModule } from "@angular/core";
import {
  NbButtonModule,
  NbCheckboxModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbSelectModule,
  NbToastrModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbAlertModule,
  NbRadioModule,
  NbToggleModule,
  NbLayoutModule,
} from "@nebular/theme";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth/auth.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    NbMenuModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbToastrModule,
    NbCardModule,
    NbFormFieldModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbAlertModule,
    NbRadioModule,
    NbToggleModule,
    NbLayoutModule,
  ],
  declarations: [LoginComponent, AuthComponent, ResetPasswordComponent, ForgotPasswordComponent, SetPasswordComponent],
})
export class AuthModule {}
