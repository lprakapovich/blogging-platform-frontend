import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
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

  login(username: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/login`, {username, password});
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
