import { Injectable, Input } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('authorizedUser') as string);
    const authReq = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('authorization', 'Bearer ' + user.access_token)
        .set('refresh_token', user.refresh_token),
    });

    console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq);
  }
}
