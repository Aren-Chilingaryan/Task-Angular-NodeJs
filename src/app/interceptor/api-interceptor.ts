import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpClient,
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TableService } from '../table-service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private tableService: TableService, private http: HttpClient) {}
  refreshTokenObservable: Observable<any> = new Observable();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authUser = localStorage.getItem('authorizedUser');
    if (!authUser) {
      const unAuthReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
      });

      return next.handle(unAuthReq);
    }
    const currentUser = JSON.parse(authUser);

    const authReq = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('authorization', 'Bearer ' + currentUser.access_token),
    });
    return (next.handle(authReq) as any).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          const newGeneratedToken = from(
            this.tableService.refreshJwt(currentUser.refresh_token)
          );
          return newGeneratedToken.pipe(
            switchMap((token) => {

              localStorage.removeItem('authorizedUser');

              if (token) {
                localStorage.setItem(
                  'authorizedUser',
                  JSON.stringify(token)
                );
              }
              const newuser = localStorage.getItem('authorizedUser');
              const newUser = JSON.parse(newuser as string);
              const authReq = req.clone({
                headers: req.headers
                  .set('Content-Type', 'application/json')
                  .set('authorization', 'Bearer ' + newUser.access_token),
              });
              return next.handle(authReq);
            })
          );
        }

        let message = '';
        if (error.error instanceof ErrorEvent) {
          console.log('tis is client-side error');
          message = `Error: ${error.error.message}`;
        } else {
          console.log("it's server-side error ");
          message = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(message);
      })
    );
  }
}
