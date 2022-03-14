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

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User> | null;

  constructor(private http: HttpClient) {
    const localStorageUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(localStorageUser && JSON.parse(localStorageUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginData: LoginData): Observable<AuthResponse> {
    const url = `${this.authUrl}/login`;
    // return this.http.post<any>(url, loginData);
    return of({ token: 'my-token-13/03/2022'})
  }

  register(registrationData: RegisterData): Observable<AuthResponse> {
    const url = `${this.authUrl}/register`;
    // return this.http.post<any>(url, registrationData);
    return of({ token: 'my-token-13/03/2022'})
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
