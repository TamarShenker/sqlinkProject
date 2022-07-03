import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormGroup} from "@angular/forms";
import {UserStoreRepository} from "../user/user.store";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient,
              private userStoreRepository: UserStoreRepository) {
  }

  login(loginForm: FormGroup) {
    return this.http.post<any>('https://private-052d6-testapi4528.apiary-mock.com/authenticate', loginForm.value).pipe(
      map(user => {
        if (user && user[0].token) {
          localStorage.setItem('token', user[0].token);
        }
        this.userStoreRepository.setUser(user[0].personalDetails);
      }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
