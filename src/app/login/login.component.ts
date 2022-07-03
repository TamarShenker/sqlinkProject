import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from '../services/authenticationService';
import {ProjectService} from "../project/project.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // @ts-ignore
  loginForm: FormGroup
  returnUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private projectService:ProjectService
  ) {
  }

  ngOnInit(): void {
    // reset login status
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required,
        Validators.email,
      ]),
      password: new FormControl("",
        [Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
        ]),
    });
  }

  login() {
    this.authenticationService.login(this.loginForm).pipe(
      tap(() => {
          this.router.navigateByUrl('info');
          this.projectService.getProjects();
        }
      )).subscribe();
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPWErrorMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    } else if (this.loginForm.get('password')?.hasError('minlength')) {
      return 'minlength 5 characters'
    }
    return this.loginForm.get('password')?.hasError('pattern') ? 'At least one digit and one character' : '';
  }

}
