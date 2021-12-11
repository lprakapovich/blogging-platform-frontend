import { Injectable } from '@angular/core';
import {User} from "../models/User";
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const localStorageUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(localStorageUser && JSON.parse(localStorageUser));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    console.log(username)
    console.log(password)
    return this.http.post<any>(`${environment.apiUrl}`, {username, password})
      .pipe(map(response => {
        console.log(response)
        localStorage.setItem('token', JSON.stringify(response))
      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }

  register(user: User) {
    console.log(user)
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  public currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
