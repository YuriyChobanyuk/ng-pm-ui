import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { endpoints } from '../../shared/constants';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private refreshTokenInProgress = false;
  private tokenRefreshedSource = new Subject();
  private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authHeader = this.authService.getAuthHeader();
    return authHeader
      ? request.clone({
          setHeaders: {
            Authorization: authHeader,
          },
        })
      : request;
  }

  dumpRefresh(): Observable<any> {
    return new Observable((observer) => {
      this.tokenRefreshed$.subscribe(
        () => {
          observer.next();
          observer.complete();
        },
        (error) => {
          return throwError(error);
        },
      );
    });
  }

  actualRefresh(): Observable<any> {
    this.refreshTokenInProgress = true;

    // TODO move refresh to store
    return this.authService.refreshRequest().pipe(
      tap(({ token }) => {
        this.authService.accessToken = token;
        this.refreshTokenInProgress = false;
        this.tokenRefreshedSource.next();
      }),
      catchError((e) => {
        this.refreshTokenInProgress = false;
        this.authService.logout();
        return throwError(e);
      }),
    );
  }

  refreshToken(): Observable<any> {
    return this.refreshTokenInProgress
      ? this.dumpRefresh()
      : this.actualRefresh();
  }

  handleResponseError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    switch (error.status) {
      case StatusCodes.UNAUTHORIZED: {
        if (error.url?.includes(endpoints.REFRESH)) {
          return throwError(error);
        }

        return this.refreshToken().pipe(
          switchMap(() => {
            request = this.addAuthHeader(request);
            return next.handle(request);
          }),
          catchError((e: HttpErrorResponse) => {
            if (e.status !== StatusCodes.UNAUTHORIZED) {
              return this.handleResponseError(e, request, next);
            } else {
              this.authService.logout();
              return throwError(e);
            }
          }),
        );
      }

      // TODO handle all other errors
      case StatusCodes.INTERNAL_SERVER_ERROR:
      case StatusCodes.SERVICE_UNAVAILABLE:
      case StatusCodes.FORBIDDEN:
      case StatusCodes.BAD_REQUEST:
      default:
        return throwError(error);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error) => {
        return this.handleResponseError(error, request, next);
      }),
    );
  }
}
