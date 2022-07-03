import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth-guard";
import {InfoComponent} from "./info/info.component";

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: '', component: InfoComponent, canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
