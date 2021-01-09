import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
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
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  LoginCredentials,
  SignUpCredentials,
  UserRole,
} from '../../../interfaces';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { locations } from '../../../shared/constants';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ credentials }: { credentials: LoginCredentials }) =>
        this.api.loginRequest(credentials).pipe(
          map(({ token, data: { user } }) => {
            this.authService.accessToken = token;
            return loginSuccess({ user });
          }),
          takeUntil(this.actions$.pipe(ofType(logout))),
          catchError(() => of(loginError())),
        ),
      ),
    ),
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ credentials }: { credentials: SignUpCredentials }) =>
        this.api.signUpRequest(credentials).pipe(
          map(({ token, data: { user } }) => {
            this.authService.accessToken = token;
            return signUpSuccess({ user });
          }),
          takeUntil(this.actions$.pipe(ofType(logout))),
          catchError(() => of(signUpError())),
        ),
      ),
    ),
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUser),
      mergeMap(() =>
        this.api.currentUserRequest().pipe(
          map((user) => getCurrentUserSuccess({ user })),
          takeUntil(this.actions$.pipe(ofType(logout))),
          catchError(() => of(getCurrentUserError())),
        ),
      ),
    ),
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refresh),
      exhaustMap(() =>
        this.api.refreshRequest().pipe(
          map(({ data: { user }, token }) => {
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
        ),
      ),
    ),
  );

  successRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess, signUpSuccess),
        tap(({ user }) => {
          switch (user.role) {
            case UserRole.ADMIN: {
              this.router.navigate([locations.ADMIN]);
              break;
            }
            case UserRole.USER: {
              this.router.navigate([locations.USER]);
              break;
            }
          }
        }),
      ),
    { dispatch: false },
  );
}
