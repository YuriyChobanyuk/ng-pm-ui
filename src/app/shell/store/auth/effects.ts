import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatusCodes } from 'http-status-codes';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { UserRole } from '../../../interfaces';
import { locations } from '../../../shared/constants';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import {
  getCurrentUser,
  getCurrentUserError,
  getCurrentUserSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
  refresh,
  refreshError,
  refreshSuccess,
  signUp,
  signUpError,
  signUpSuccess,
} from './actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }) => {
        return this.api.loginRequest(credentials).pipe(
          map(({ token, data: { user } }) => {
            this.authService.accessToken = token;
            return loginSuccess({ user });
          }),
          takeUntil(this.actions$.pipe(ofType(logout))),
          catchError(() => {
            return of(loginError());
          }),
        );
      }),
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ credentials }) => {
        return this.api.signUpRequest(credentials).pipe(
          map(({ token, data: { user } }) => {
            this.authService.accessToken = token;
            return signUpSuccess({ user });
          }),
          takeUntil(this.actions$.pipe(ofType(logout))),
          catchError(() => {
            return of(signUpError());
          }),
        );
      }),
    );
  });

  getCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentUser),
      mergeMap(() => {
        return this.api.currentUserRequest().pipe(
          map((user) => {
            return getCurrentUserSuccess({ user });
          }),
          takeUntil(this.actions$.pipe(ofType(logout))),
          catchError(() => {
            return of(getCurrentUserError());
          }),
        );
      }),
    );
  });

  refresh$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(refresh),
      exhaustMap(() => {
        return this.api.refreshRequest().pipe(
          map(({ token }) => {
            this.authService.accessToken = token;
            return refreshSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            if (error?.status === StatusCodes.UNAUTHORIZED) {
              this.authService.logout();
            }
            return of(refreshError());
          }),
          takeUntil(this.actions$.pipe(ofType(logout))),
          finalize(() => {
            this.authService.tokenRefreshed$.next();
          }),
        );
      }),
    );
  });

  successRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess, signUpSuccess),
        tap(({ user }) => {
          switch (user.role) {
            case UserRole.ADMIN: {
              this.router.navigate([locations.ADMIN]).catch((e) => {
                console.error(e);
              });
              break;
            }
            case UserRole.USER: {
              this.router.navigate([locations.USER]).catch((e) => {
                console.error(e);
              });
              break;
            }
          }
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
  ) {}
}
