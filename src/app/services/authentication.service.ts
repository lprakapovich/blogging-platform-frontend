import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegistrationData} from "../models/RegistrationData";
import {LoginData} from "../models/LoginData";

@Injectable({
  "providedIn": 'root'
})
export class AuthenticationService {

  authUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const localStorageUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(localStorageUser && JSON.parse(localStorageUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginData: LoginData) {
    return this.http.post<any>(`${this.authUrl}/login`, loginData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  register(registrationData: RegistrationData): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, registrationData);
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
