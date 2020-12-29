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
  signUp,
  signUpError,
  signUpSuccess,
} from './actions';
import { catchError, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import {
  IUser,
  LoginCredentials,
  SignUpCredentials,
  UserRole,
} from '../../../interfaces';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { locations } from '../../../shared/constants';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login.type),
      mergeMap(({ credentials }: { credentials: LoginCredentials }) =>
        this.authService.loginRequest(credentials).pipe(
          takeUntil(this.actions$.pipe(ofType(logout.type))),
          map(({ token, data: { user } }) => {
            this.authService.accessToken = token;
            return loginSuccess({ user });
          }),
          catchError(() => of(loginError())),
        ),
      ),
    ),
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp.type),
      mergeMap(({ credentials }: { credentials: SignUpCredentials }) =>
        this.authService.signUpRequest(credentials).pipe(
          takeUntil(this.actions$.pipe(ofType(logout.type))),
          map(({ token, data: { user } }) => {
            this.authService.accessToken = token;
            return signUpSuccess({ user });
          }),
          catchError(() => of(signUpError())),
        ),
      ),
    ),
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUser.type),
      mergeMap(() =>
        this.authService.currentUserRequest().pipe(
          takeUntil(this.actions$.pipe(ofType(logout.type))),
          map((user) => getCurrentUserSuccess({ user })),
          catchError(() => of(getCurrentUserError())),
        ),
      ),
    ),
  );

  successRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess.type, signUpSuccess.type),
        tap(({ user }: { user: IUser }) => {
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
