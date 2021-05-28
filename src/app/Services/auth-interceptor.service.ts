import { Injectable, Compiler } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationDetails } from 'src/app/Models/master';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  authenticationDetails: AuthenticationDetails;
  baseAddress: string;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _compiler: Compiler,
    public notify: NotificationService,
  ) {
    this.authenticationDetails = new AuthenticationDetails();
    this.baseAddress = this._authService.baseAddress;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      const authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      if (authenticationDetails) {
        const token: string = authenticationDetails.Token;
        if (token) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
      }
    }

    if (!request.headers.has('Content-Type') && !request.url.includes('Attachment') && !request.url.includes('SaveDashboardCards')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
