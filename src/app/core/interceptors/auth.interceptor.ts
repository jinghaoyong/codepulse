import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieServ: CookieService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptRequest(request)) {
      // return next.handle(request);
      const authRequest = request.clone({
        setHeaders: {
          'Authorization': this.cookieServ.get('Authorization')
        }
      });

      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1 ? true : false;
  }
}
