import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  registerUser(userInfo: any) {
    return this._http.post<{ message: string; user: any }>(
      environment.BASE_URL_USER + '/register',
      userInfo
    );
  }

  loginUser(loginInfo: any) {
    return this._http.post<{ message: string; user: any; token: string }>(
      environment.BASE_URL_USER + '/login',
      loginInfo
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('token') === null) {
      return false;
    } else {
      return !!localStorage.getItem('token');
    }
  }
}
