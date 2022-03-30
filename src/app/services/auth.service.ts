import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegisterData} from "../models/data/auth/RegisterData";
import {LoginData} from "../models/data/auth/LoginData";
import {AuthData} from "../models/data/auth/AuthData";

@Injectable({
  "providedIn": 'root'
})
export class AuthService {

  authUrl = `${environment.apiUrl}/auth-service`;

  constructor(private http: HttpClient) {}

  login(loginData: LoginData): Observable<AuthData> {
    const url = `${this.authUrl}/login`;
    return this.http.post<any>(url, loginData);
    }

  register(registrationData: RegisterData): Observable<AuthData> {
    const url = `${this.authUrl}/register`;
    const body = {
      username: registrationData.username,
      password: registrationData.password
    }
    return this.http.post<any>(url, body);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
