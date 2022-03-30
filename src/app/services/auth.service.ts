import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegisterData} from "../models/data/RegisterData";
import {LoginData} from "../models/data/LoginData";
import {AuthResponse} from "../models/AuthResponse";

@Injectable({
  "providedIn": 'root'
})
export class AuthService {

  authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(loginData: LoginData): Observable<AuthResponse> {
    const url = `${this.authUrl}/login`;
    return this.http.post<any>(url, loginData);
    }

  register(registrationData: RegisterData): Observable<AuthResponse> {
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
