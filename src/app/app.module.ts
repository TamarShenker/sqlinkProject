import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProjectsTableComponent} from './project/projects-table/projects-table.component';
import {LoginComponent} from './login/login.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthGuard} from "./auth-guard";
import {AuthenticationService} from "./services/authenticationService";
import {MatSortModule} from '@angular/material/sort';
import {ProjectService} from "./project/project.service";
import {InfoComponent} from "./info/info.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectsTableComponent,
    LoginComponent,
    UserDetailsComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [AuthGuard, AuthenticationService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
