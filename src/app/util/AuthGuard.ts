import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable, of, switchMap} from "rxjs";
import {selectToken} from "../store/selectors/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>   {
    return this.checkAuth();
  }

  private checkAuth() : Observable<boolean> {
    return this.store.select(selectToken).pipe(
      switchMap(token => {
        if (!!token) {
          return of(true);
        }

        this.router.navigate(['/login']);
        return of(false);
      })
    )
  }
}

