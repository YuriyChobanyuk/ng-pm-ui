import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import {filter, finalize, mergeMap, retryWhen} from 'rxjs/operators';
import { StatusCodes } from 'http-status-codes';
import { AuthActions } from '../store/auth/actions';
import { Store } from '@ngxs/store';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store,
  ) {}

  private refresh$: Observable<any> | null = null;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: req.headers.set(
        'authorization',
        this.localStorageService.getAccessToken() || '',
      ),
    });

    return next.handle(request).pipe(
      retryWhen((errors: Observable<HttpErrorResponse>) => {
        return errors.pipe(
          filter((error) => {
            console.log({ filterError: error });
            const isErrorEvent = error instanceof ErrorEvent;
            const isAuthError = error.status === StatusCodes.UNAUTHORIZED;
            const isRefreshError = error.url?.endsWith('/auth/refresh');
            return !isErrorEvent && isAuthError && !isRefreshError;
          }),
          mergeMap(() => {
            if (!this.refresh$) {
              this.refresh$ = this.store.dispatch(new AuthActions.Refresh());
            }

            return this.refresh$;
          }),
          finalize(() => {
            this.refresh$ = null;
          })
        );
      }),
    );
  }
}
