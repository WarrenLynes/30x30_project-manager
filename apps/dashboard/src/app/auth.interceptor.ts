import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {iif} from 'rxjs/internal/observable/iif';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  API_URL = 'api';

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of([req.url, localStorage.getItem('TOKEN')]).pipe(
      switchMap(([url, token]) => {
        if(url.indexOf(this.API_URL) > -1 && url.indexOf('/auth/') < 0) {
          if(token) {
            return next.handle(req.clone({
              headers: req.headers.append('Authorization', token)
            }));
          }
        } else {
          return next.handle(req.clone());
        }
      })
    );
  }
}
