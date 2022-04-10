import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  "providedIn": 'root'
})
export class UserService {

  private userServiceUrl = `${environment.apiUrl}/user-service`;

  constructor(private httpClient: HttpClient) {
  }

  validateUsername(username: string): Observable<any> {
    const url = `${this.userServiceUrl}/check`;
    return this.httpClient.get(url, {
      params: new HttpParams().set('username', username)
    });
  }
}
