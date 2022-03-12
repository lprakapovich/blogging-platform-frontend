import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RegisterData} from "../models/RegisterData";
import {LoginData} from "../models/LoginData";
import {AuthResponse} from "../models/AuthResponse";

@Injectable({
  "providedIn": 'root'
})
export class AuthService {

  authUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User> | null;

  constructor(private http: HttpClient) {
    const localStorageUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(localStorageUser && JSON.parse(localStorageUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginData: LoginData): Observable<AuthResponse> {
    const url = `${this.authUrl}/login`;
    return this.http.post<any>(url, loginData);
  }

  register(registrationData: RegisterData): Observable<AuthResponse> {
    const url = `${this.authUrl}/register`;
    return this.http.post<any>(url, registrationData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
