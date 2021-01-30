import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StatusCodes } from 'http-status-codes';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

import { endpoints } from '../../shared/constants';
import { authActions, authSelectors } from '../store/auth';
import { AppState } from '../store/rootState';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error) => {
        return this.handleResponseError(error, request, next);
      }),
    );
  }

  private addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const authHeader = this.authService.getAuthHeader();
    return authHeader
      ? request.clone({
          setHeaders: {
            authorization: authHeader,
          },
        })
      : request;
  }

  private dumpRefresh(): Observable<any> {
    return new Observable((observer) => {
      this.authService.tokenRefreshed$.subscribe(() => {
        observer.next();
        observer.complete();
      });
    });
  }

  private refreshToken(): Observable<any> {
    return this.store.pipe(
      select(authSelectors.refreshing),
      take(1),
      tap((isRefreshing) => {
        if (!isRefreshing) {
          this.store.dispatch(authActions.refresh());
        }
      }),
      switchMap(() => {
        return this.dumpRefresh();
      }),
    );
  }

  private handleUnauthorizedError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    if (error.url?.includes(endpoints.REFRESH)) {
      return throwError(error);
    }

    return this.refreshToken().pipe(
      switchMap(() => {
        request = this.addAuthHeader(request);
        return next.handle(request);
      }),
      catchError((e: HttpErrorResponse) => {
        return e.status !== StatusCodes.UNAUTHORIZED
          ? this.handleResponseError(e, request, next)
          : throwError(e);
      }),
    );
  }

  private handleResponseError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<any> {
    switch (error.status) {
      case StatusCodes.UNAUTHORIZED: {
        return this.handleUnauthorizedError(error, request, next);
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
}
