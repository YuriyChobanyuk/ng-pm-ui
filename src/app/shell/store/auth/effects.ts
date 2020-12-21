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
} from './actions';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { LoginCredentials } from '../../../interfaces';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
}
