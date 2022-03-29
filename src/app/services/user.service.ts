import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable({
  "providedIn": 'root'
})
export class UserService {

  validateUsername(username: string): Observable<Response> {
    return of();
  }
}
