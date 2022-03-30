import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {first, mergeMap, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {selectToken} from "../../store/selectors/auth.selectors";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken).pipe(
      first(),
      mergeMap(token => {
        console.log('JwtInterceptor: attach token')
        const authenticatedRequest = !!token ? request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          },
        }) : request;
        return next.handle(authenticatedRequest);
      }
    ))
  }
}
