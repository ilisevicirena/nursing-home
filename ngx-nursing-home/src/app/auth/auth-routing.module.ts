import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SetPasswordComponent } from "./set-password/set-password.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "login", component: LoginComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "set-password", component: SetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
